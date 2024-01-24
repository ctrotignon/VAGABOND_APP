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
exports.deleteLikeByPost = exports.userAlreadyLikedPost = exports.getLikeByPost = exports.LikePost = void 0;
const like_model_1 = require("../models/like.model");
const LikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, userId } = req.params;
        console.log('Params:', postId, userId);
        yield like_model_1.Like.create({ post_id: postId, user_id: userId });
        res.status(201).json({ message: 'Successfully liked the post' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.LikePost = LikePost;
const getLikeByPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const likeCount = yield like_model_1.Like.count({ where: { post_id: postId } });
        res.status(200).json({ likeCount });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getLikeByPost = getLikeByPost;
const userAlreadyLikedPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, userId } = req.params;
        const existingLike = yield like_model_1.Like.findOne({
            where: {
                post_id: postId,
                user_id: userId,
            },
        });
        const likeExists = !!existingLike;
        res.status(200).json({ likeExists });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.userAlreadyLikedPost = userAlreadyLikedPost;
const deleteLikeByPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, userId } = req.params;
        const likeCount = yield like_model_1.Like.destroy({ where: { user_id: userId, post_id: postId } });
        res.status(200).json({ likeCount });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteLikeByPost = deleteLikeByPost;
