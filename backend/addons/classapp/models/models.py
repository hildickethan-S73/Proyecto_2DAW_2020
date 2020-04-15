# -*- coding: utf-8 -*-

from odoo import api, fields, models

class User(models.Model):
    _inherit = 'apirest.base'
    _name = 'classapp.user'
    _description = 'Base user'

    name = fields.Char(string="Name", required=True)
    email = fields.Char(string="Email", required=True)
    password = fields.Char(string="Password", required=True)

class Admin(models.Model):
    _inherit = 'classapp.user'
    _name = 'classapp.admin'
    _description = 'Admin user'

class Teacher(models.Model):
    _inherit = 'classapp.user'
    _name = 'classapp.teacher'
    _description = 'Teacher user'

    admin_id = fields.Many2one("classapp.admin", string="Created by", required=True)

class Student(models.Model):
    _inherit = 'classapp.user'
    _name = 'classapp.student'
    _description = 'Student user'

    currency = fields.Integer(string="Currency", required=True)
    energy = fields.Integer(string="Energy", required=True)
    growth = fields.Integer(string="Growth", required=True)

    teacher_id = fields.Many2one("classapp.teacher", string="Invited by", required=True)
    skill_ids = fields.Many2many("classapp.skill", string="Available skills")
    cosmetic_ids = fields.Many2many("classapp.cosmetic", string="Purchased cosmetics")

class Skill(models.Model):
    _inherit = 'apirest.base'
    _name = 'classapp.skill'
    _description = 'Skill model'

    name = fields.Char(string="Name", required=True)
    effect_energy = fields.Integer(string="Effect on energy", required=True)
    effect_growth = fields.Integer(string="Effect on growth", required=True)

class Cosmetic(models.Model):
    _inherit = 'apirest.base'
    _name = 'classapp.cosmetic'
    _description = 'Cosmetic model'

    name = fields.Char(string="Name", required=True)
    image = fields.Char(string="Image URL", required=True)

class Class(models.Model):
    _inherit = 'apirest.base'
    _name = 'classapp.class'
    _description = 'Class model'

    name = fields.Char(string="Name", required=True)
    teacher_id = fields.Many2one("classapp.teacher", string="Class teacher", required=True)
    student_ids = fields.Many2many("classapp.student", string="Class students", required=True)

class Group(models.Model):
    _inherit = 'apirest.base'
    _name = 'classapp.group'
    _description = 'Group model'

    name = fields.Char(string="Name", required=True)
    class_id = fields.Many2one("classapp.class", string="Class", required=True)
    teacher_id = fields.Many2one("classapp.teacher", string="Created by", required=True)
    student_ids = fields.One2many("classapp.student", string="Formed by", required=True)

class RewardPunishment(models.Model):
    _inherit = 'apirest.base'
    _name = 'classapp.rewardpunishment'
    _description = 'Reward and punishment model'

    name = fields.Char(string="Name", required=True)
    description = fields.Char(string="Description", required=True)
    effect_energy = fields.Integer(string="Effect on energy", required=True)
    effect_growth = fields.Integer(string="Effect on growth", required=True)
    reward_type = fields.Selection(
        string="Type", 
        required=True, 
        selection=[
            ("Reward"),
            ("Punishment"),
        ],
    )