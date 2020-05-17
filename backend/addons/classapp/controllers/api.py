# -*- coding: utf-8 -*-
from odoo import http
from odoo.addons.apirest.controllers.api import ApiRestBaseController
import jwt
import json

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
            except Exception as error:
                return {'Error': "Invalid token or input", "errmsg": error}
        else:
            return {'Error': 'No token'}

    ### GET USERS CLASSES 
    @http.route('/api/classes/', 
        auth='public', type="json", methods=['POST'])
    def classesPostResponse(self, **kw):
        params = http.request.params
        # don't have the time to look for a better solution
        class_ids = params["class_ids"]                      # "classapp.class(4,)"
        class_ids = class_ids.replace("classapp.class(", "") # "4,)"
        # these 2 steps are because with 1 number it ends with a "," yet multiple don't.
        # only 1 of them will do anything
        class_ids = class_ids.replace(",)", "")              # "4"
        class_ids = class_ids.replace(")", "")               # "4,6"
        class_ids = class_ids.split(",")                     # ["4"]

        if class_ids[0] != "":
            class_ids = [int(i) for i in class_ids]              # [4]

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
        else:
            return {"classes":[], "token": params['token']}

    ### GET CLASS BY ID
    @http.route('/api/class/<int:id>', 
        auth='public', type='http', methods=['GET'])
    def getOneClassResponse(self, **kw):
        id = kw['id']
        modelObj = http.request.env["classapp.class"]

        query = [("id","=",id)]
        return json.dumps(modelObj.search(args=query, limit=1).parseAll())

    ### GET STUDENTS
    @http.route('/api/student/', 
        auth='public', type="json", methods=['POST'])
    def studentsPostResponse(self, **kw):
        params = http.request.params
        student_ids = params["student_ids"]
        student_ids = student_ids.replace("classapp.student(", "")
        student_ids = student_ids.replace(",)", "")
        student_ids = student_ids.replace(")", "")
        student_ids = student_ids.split(",")

        if student_ids[0] != "":
            student_ids = [int(i) for i in student_ids]

            modelObj = http.request.env["classapp.student"]

            try:
                result = modelObj.browse(student_ids)
                parsedResult = result.parseAll()
                for result in parsedResult:
                    del result["password"]

                resultObj = {"students":parsedResult}

                return resultObj
            except Exception as error:
                return {'Error': "Invalid students", "errmsg": error}
        else:
            return {"students":[]}
    
    ### UPDATE STUDENTS
    @http.route('/api/student/growth', 
        auth='public', type="json", methods=['PUT'])
    def studentsGrowthResponse(self, **kw):
        params = http.request.params
        modelObj = http.request.env["classapp.student"]

        id = params["id"]
        growth = params["growth"]

        if type(growth) is int:
            student = modelObj.search([("id","=",id)], limit=1)
            if student.exists():
                parsedStudent = student.parseOne()
                newGrowth = int(parsedStudent["growth"])+growth
                
                student.write({"growth":newGrowth})
                
                parsedResult = modelObj.search([("id","=",id)], limit=1).parseOne()
                del parsedResult["password"]

                return parsedResult
            else:
                return {"Error": "bad id"}
        else:
            return {"Error": "bad growth"}