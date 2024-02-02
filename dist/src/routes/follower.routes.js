"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followerRoutes = void 0;
const express_1 = require("express");
const follower_controllers_1 = require("../controllers/follower.controllers");
const followerRoutes = (0, express_1.Router)();
exports.followerRoutes = followerRoutes;
followerRoutes.post('/:followerId/:followingId', follower_controllers_1.followUser);
followerRoutes.delete('/:followerId/:followingId', follower_controllers_1.unfollowUser);
followerRoutes.get('/followersCount/:userId', follower_controllers_1.getFollowersCount);
followerRoutes.get('/followingsCount/:userId', follower_controllers_1.getFollowingCount);
followerRoutes.get('/alreadyFollow/:followerId/:followingId', follower_controllers_1.userAlreadyFollowedUser);
