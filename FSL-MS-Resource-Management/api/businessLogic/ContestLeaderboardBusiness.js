// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// TODO: High-level file comment.

/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable max-len */

const contestLeaderBoardService = require('../service/ContestLeaderboardService');

exports.createContestLeaderboard = params => contestLeaderBoardService.createContestLeaderboard(params);


exports.getAllContestLeaderboard = () => contestLeaderBoardService.getAllContestLeaderboard();

exports.getContestLeaderboardByID = params => contestLeaderBoardService.getContestLeaderboardByID(params);

exports.getContestLeaderboardByContestID = params => contestLeaderBoardService.getContestLeaderboardByContestID(params);

exports.winerListUpdation = params => contestLeaderBoardService.winerListUpdation(params);
