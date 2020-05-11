# -*- coding: utf-8 -*-
from odoo import http
from odoo.addons.apirest.controllers.api import ApiRestBaseController
import jwt

class ClassAppAPI(ApiRestBaseController):
    ApiRestBaseController._allowedModels.update({
        # 'admin':'classapp',
        # 'teacher':'classapp',
        # 'student':'classapp',
        'skill':'classapp',
        'cosmetic':'classapp',
        'class':'classapp',
        'group':'classapp',
        'rewardpunishment':'classapp',
    })

    ### CREATE CLASS
    @http.route('/api/class/', 
        auth='public', type="json", methods=['POST'])
    def classPostResponse(self, **kw):
        params = http.request.params
        modelToAccess = "class"

        model = "classapp.{}".format(modelToAccess)
        modelObj = http.request.env[model]
        
        if 'token' in params.keys():
            secret = ApiRestBaseController.getSecret()
            token = str(params['token'])
            try:
                decoded = jwt.decode(token, secret, algorithms=['HS256'])
                params['teacher_id'] = decoded['id']

                del params['token']
                create = modelObj.create(params)
                parsedResult = create.parseOne()
                del params['teacher_id']
                
                return parsedResult
            except:
                return {'Error': "Invalid token"}
        else:
            return {'Error': 'No token'}

    ### CREATE 
    @http.route('/api/classes/', 
        auth='public', type="json", methods=['POST'])
    def classesPostResponse(self, **kw):
        params = http.request.params
        class_ids = params["class_ids"] # "classapp.class(4,6,)"
        class_ids = class_ids.replace("classapp.class(", "") # "4,6,)"
        class_ids = class_ids.replace(",)", "") # "4,6"
        class_ids = class_ids.split(",") # ["4","6"]
        class_ids = [int(i) for i in class_ids] # [4,6]

        # 1 line version
        # class_ids = [ int(i) for i in params["class_ids"]
        #                                 .replace("classapp.class(", "")
        #                                 .replace(",)", "")
        #                                 .split(",")
        # ]

        modelObj = http.request.env["classapp.class"]
        
        if 'token' in params.keys():
            secret = ApiRestBaseController.getSecret()
            token = str(params['token'])
            try:
                decoded = jwt.decode(token, secret, algorithms=['HS256'])
                id = decoded['id']

                result = modelObj.browse(class_ids)
                parsedResult = result.parseAll()

                encoded_jwt = jwt.encode({'id': id}, secret, algorithm='HS256')
                resultObj = {"classes":parsedResult, "token": encoded_jwt}

                return resultObj
            except Exception as error:
                return {'Error': "Invalid token or classes", "errmsg": error}
        else:
            return {'Error': 'No token'}