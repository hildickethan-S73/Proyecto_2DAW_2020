from odoo import exceptions, http
from odoo.tests import common
import urllib3
import json

class TestClassapp(common.HttpCase):
    def setUp(self):
        super(TestClassapp, self).setUp()
        self.http = urllib3.PoolManager()
        RewardPunishment = self.env["classapp.rewardpunishment"]
        self.reward_data = {
            "name":"Reward",
            "description":"Desc",
            "effect_energy": 10,
            "effect_growth": 30,
            "reward_type": "Reward",
        }
        self.reward = RewardPunishment.create(self.reward_data)

    def test_00_mail_response(self):
        body = json.dumps({"params":{"emails":[{"name":"hildickethan@gmail.com"}]}}).encode('utf-8')
        r = self.http.request(
            "POST", 
            "http://localhost:8069/auth/mail", 
            body=body,
            headers={'Content-Type': 'application/json'},
        )
        data = json.loads(r.data.decode('utf-8'))
        self.assertEqual(data["result"][0], "hildickethan@gmail.com", msg="Email was not sent")
    
    def test_01_get_response(self):
        r = self.http.request(
            "GET", 
            "http://localhost:8069/api/rewardpunishment",
        )
        data = json.loads(r.data.decode('utf-8'))
        self.assertEqual(data[-1]["name"], self.reward_data["name"], msg="Returned data is incorrect")