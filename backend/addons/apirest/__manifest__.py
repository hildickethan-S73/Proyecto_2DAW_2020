# -*- coding: utf-8 -*-
{
    'name': "Simple REST Api base",

    'summary': """
        REST API base
    """,

    'description': """
        Long description of module's purpose
    """,

    'author': "Ethan Hildick",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '1.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
    ],
    # only loaded in demonstration mode
    'demo': [],
    'application': True
}