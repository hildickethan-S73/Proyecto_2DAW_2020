# -*- coding: utf-8 -*-
from odoo import http
from odoo.addons.apirest.controllers.api import ApiRestBaseController

class ClassAppAPI(ApiRestBaseController):
    ApiRestBaseController._allowedModels.update({
        'admin':'classapp',
        'teacher':'classapp',
        'student':'classapp',
        'skill':'classapp',
        'cosmetic':'classapp',
        'class':'classapp',
        'group':'classapp',
        'rewardpunishment':'classapp',
    })
