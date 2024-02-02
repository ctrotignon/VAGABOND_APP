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
exports.getCommentsOfSpecificPost = exports.addComment = void 0;
require("dotenv/config");
const post_model_1 = require("../models/post.model");
const comment_model_1 = require("../models/comment.model");
const { SECRET } = process.env;
if (!SECRET) {
    throw new Error('JWT secret is not defined in the environment variables.');
}
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, content, postId } = req.body;
        yield comment_model_1.Comment.create({ content, userId, postId: postId });
        return res.status(201).json({ message: 'Comment created' });
    }
    catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.addComment = addComment;
const getCommentsOfSpecificPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = parseInt(req.params.postId, 10);
        if (isNaN(postId)) {
            return res.status(400).json({ message: 'Invalid postId' });
        }
        // Vérifier si le post existe
        const post = yield post_model_1.Post.findOne({ where: { id: postId } });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // Récupérer tous les commentaires du post
        const comments = yield comment_model_1.Comment.findAll({ where: { postId: postId } });
        res.status(200).json(comments);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getCommentsOfSpecificPost = getCommentsOfSpecificPost;
