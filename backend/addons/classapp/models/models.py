# -*- coding: utf-8 -*-

from odoo import api, fields, models

class Class(models.Model):
    _inherit = 'apirest.base'
    _name = 'classapp.class'
    _description = 'Class model'
