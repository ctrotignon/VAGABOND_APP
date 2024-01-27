"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowingCount = exports.getFollowersCount = exports.unfollowUser = exports.followUser = void 0;
const follower_model_1 = require("../models/follower.model");
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { follower_user_id, following_user_id } = req.body;
        yield follower_model_1.Follower.create({ follower_user_id, following_user_id });
        res.status(201).json({ message: 'Successfully followed the user' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.followUser = followUser;
const unfollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { follower_user_id, following_user_id } = req.body;
        yield follower_model_1.Follower.destroy({
            where: { follower_user_id, following_user_id },
        });
        res.json({ message: 'Successfully unfollowed the user' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.unfollowUser = unfollowUser;
const getFollowersCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const followersCount = yield follower_model_1.Follower.count({
            where: {
                following_user_id: userId,
            },
        });
        res.json(followersCount);
    }
    catch (error) {
        console.error('Error fetching followers count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getFollowersCount = getFollowersCount;
const getFollowingCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const followingCount = yield follower_model_1.Follower.count({
            where: {
                follower_user_id: userId,
            },
        });
        res.json(followingCount);
    }
    catch (error) {
        console.error('Error fetching followers count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getFollowingCount = getFollowingCount;
