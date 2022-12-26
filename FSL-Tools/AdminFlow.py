#!/usr/bin/python
#
# Copyright 2022 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""TODO: High-level file comment."""

import sys


def main(argv):
    pass


if __name__ == '__main__':
    main(sys.argv)
from locust import task, HttpUser
import json
import time

class AdminFlow(HttpUser):
    host = "http://fsl-gaming.niveussolutions.com"
    @task
    
    def index(self):
        self.client.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        
        # createTeam1----------------------------------------------------------------
        team1Resp = self.client.post("/resource-management/api/createTeam")
        print(team1Resp.text)

        team1resp = json.loads(team1Resp.text)
        team1Uuid = team1resp['data']['teamUuid']
                
        print('Team 1 Uuid -',team1Uuid)
        # createPlayerTeam1----------------------------------------------------------------
        playerTeam1Response = self.client.post("/resource-management/api/createPlayersBulk",data=json.dumps({"teamUuid": team1Uuid}))
        # createTeam2----------------------------------------------------------------
        team2Resp = self.client.post("/resource-management/api/createTeam")
        team2resp = json.loads(team2Resp.text)
        team2Uuid = team2resp['data']['teamUuid']
        print('Team 2 Uuid -',team2Uuid)
        # createPlayerTeam2----------------------------------------------------------------
        playerTeam2Response = self.client.post("/resource-management/api/createPlayersBulk",data=json.dumps({"teamUuid": team2Uuid}))
        # createMatch----------------------------------------------------------------
        matchResp = self.client.post("/resource-management/api/createMatchAuto")
        matchresp = json.loads(matchResp.text)
        matchUuid = matchresp['data']['matchUuid']
        print(matchResp.text)
        # print('Match Uuid -',matchUuid)
        # createContest----------------------------------------------------------------
        contestResponse = self.client.post("/resource-management/api/createContest",data=json.dumps({"matchUuid": matchUuid}))
        contestResponse = json.loads(contestResponse.text)
        contestUuid = contestResponse['data']['contestUuid']
        print('Contest Uuid -',contestUuid)
        print('***********************************************************************************')
        print('###################################################################################')
        print('***********************************************************************************')
        time.sleep(2)