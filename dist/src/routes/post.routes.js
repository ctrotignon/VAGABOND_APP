"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_controllers_1 = require("../controllers/post.controllers");
const postRoutes = (0, express_1.Router)();
exports.postRoutes = postRoutes;
postRoutes.post('/createPost', post_controllers_1.createPost);
postRoutes.get('/allPosts', post_controllers_1.getAllPosts);
postRoutes.get('/allMedias', post_controllers_1.getAllMedias);
postRoutes.get('/:postUserId', post_controllers_1.getPostsSpecificUser);
