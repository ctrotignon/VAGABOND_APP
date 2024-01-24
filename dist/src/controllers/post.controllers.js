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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getAllMedias = exports.getPostsSpecificUser = exports.getAllPosts = exports.createPost = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const { SECRET } = process.env;
if (!SECRET) {
    throw new Error('JWT secret is not defined in the environment variables.');
}
const post_model_1 = require("../models/post.model");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, mediaURL } = req.body;
        const responseToken = req.headers.authorization;
        console.log('MEDIA URL SEQ', mediaURL);
        if (!responseToken) {
            throw new Error('token not found');
        }
        const token = responseToken.replace('Bearer ', '');
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET);
        const user_id = decodedToken.id;
        const post = yield post_model_1.Post.create({ user_id, type, mediaURL });
        return res.status(201).json({ message: 'Post created', post: post });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createPost = createPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield post_model_1.Post.findAll();
        const postList = allPosts.map((post) => ({
            user_id: post.getDataValue('user_id'),
            id: post.getDataValue('id'),
            type: post.getDataValue('type'),
            mediaURL: post.getDataValue('mediaURL'),
        }));
        res.status(200).json({ posts: postList });
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Unable to fetch posts' });
    }
});
exports.getAllPosts = getAllPosts;
const getAllMedias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield post_model_1.Post.findAll();
        const mediasList = allPosts.map((post) => post.getDataValue('mediaURL'));
        res.status(200).json(mediasList);
    }
    catch (error) {
        console.error('Error fetching medias:', error);
        res.status(500).json({ error: 'Unable to fetch medias' });
    }
});
exports.getAllMedias = getAllMedias;
const getPostsSpecificUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postUserId } = req.params;
        const allPosts = yield post_model_1.Post.findAll({
            where: {
                user_id: postUserId,
            },
        });
        if (!allPosts) {
            return res.status(404).json({ error: 'No posts found for the user' });
        }
        const mediasList = allPosts.map((post) => post.getDataValue('mediaURL'));
        res.status(200).json(mediasList);
    }
    catch (error) {
        console.error('Error fetching medias:', error);
        res.status(500).json({ error: 'Unable to fetch medias' });
    }
});
exports.getPostsSpecificUser = getPostsSpecificUser;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deletePost = deletePost;
