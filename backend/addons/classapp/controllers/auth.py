# -*- coding: utf-8 -*-
from odoo import http
import hashlib
import os
import jwt
import configparser

# admin users would be created manually in DB or through Odoo
# teachers created by admin
# students invited by teacher go through register

class ClassAppAuth(http.Controller):
    @http.route("/auth/mail",
        type="json", auth="public", methods=["POST","OPTIONS"])
    def mailResponse(self, **kw):
        params = http.request.params
        emails = params['emails']
        modelObj = http.request.env['classapp.email']

        # sends emails 1 by 1
        # would be better to iterate to see which users need to be created
        # then send all emails in 1 batch
        sent_emails = []
        for email in emails:
            query = [("name","=",email['name'])]
            email_result = modelObj.search(args=query, limit=1)

            if not email_result.exists():
                email_result = modelObj.create(email)

            secret = getSecret()
            invite_token = jwt.encode({'class': params['class']}, secret, algorithm='HS256')
            invite_link = "http://localhost:3000/register/{}".format(invite_token.decode("utf-8"))

            email_result.mail_register(invite_link)

            mail = http.request.env['mail.mail']
            search_ids = mail.sudo().search([])
            last_id = search_ids and max(search_ids)

            if last_id['email_to'] == email['name']:
                sent_emails.append(email['name'])
        return sent_emails


    @http.route('/auth/register',
        type='json', auth='public', methods=['POST','OPTIONS'])
    def registerResponse(self, **kw):
        params = http.request.params
        modelObj = http.request.env['classapp.student']

        if 'code' in params.keys():
            secret = getSecret()
            code = str(params['code'])
            del params['code']

            try:
                decoded = jwt.decode(code, secret, algorithms=['HS256'])
                classcode = decoded['classcode']
                result = http.request.env['classapp.class'].search(args=[("name","=",classcode)], limit=1).parseAll()
                
                if result.exists():
                    salt = generateSalt()
                    hash = hashPassword(params['password'],salt)
                    params['password'] = '{}${}'.format(salt.hex(), hash)
                    params['class_ids'] = result

                    create = modelObj.create(params)
                    parsedResult = create.parseOne()

                    del parsedResult['password']

                    encoded_jwt = jwt.encode({'id': parsedResult['id']}, secret, algorithm='HS256')
                    parsedResult['token'] = encoded_jwt
                    
                    return parsedResult
                else:
                    return {'Error': "Class code is incorrect"}
            except:
                return {'Error': "Invalid token"}
        else:
            return {'Error': 'No token'}

    @http.route('/auth/login',
        type='json', auth='public', methods=['POST','OPTIONS'])
    def loginResponse(self, **kw):
        params = http.request.params
        modelObj = http.request.env['classapp.student']

        query = [("name","=",params['name'])]
        result = modelObj.search(args=query, limit=1)

        if result.exists():
            parsedResult = result.parseOne()
            if parsedResult['password'] != 'False' and verifyPassword(parsedResult['password'],params['password']):
                del parsedResult['password']
    
                secret = getSecret()
                encoded_jwt = jwt.encode({'id': parsedResult['id']}, secret, algorithm='HS256')
                parsedResult['token'] = encoded_jwt

                return parsedResult
            else:
                return {"error":"Wrong password"}
        else:
                return {"error":"User doesn't exist"}

    @http.route('/auth/logout',
        type='json', auth='public', methods=['POST','OPTIONS'])
    def logoutResponse(self, **kw):
        return {"logout":"yes"}

def hashPassword(password,salt):
    '''
        hash the password with a salt \n
        
        :param: password
            string to hash
        :param: salt
            bytes to salt with, generate with generateSalt()
    '''
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000).hex()
    return key

# generate salt
def generateSalt():
    '''
        generate a salt
    '''
    return os.urandom(32) 


def verifyPassword(password,loginpassword):
    '''
        match 2 passwords \n
        
        :param: password
            password in DB
        :param: loginpassword
            password to check
    '''
    salt, hash = password.split('$')
    salt = bytes.fromhex(salt)

    newhash = hashPassword(loginpassword,salt)

    if hash == newhash:
        return True
    
    return False

def getSecret():
    config = configparser.ConfigParser()
    config.read('/etc/odoo/config.ini')
    secret = config.get('password', 'JWT_PASSWORD')

    return secret