"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = require("express");
const comment_controllers_1 = require("../controllers/comment.controllers");
const commentRoutes = (0, express_1.Router)();
exports.commentRoutes = commentRoutes;
commentRoutes.get('/getComments/:postId', comment_controllers_1.getCommentsOfSpecificPost);
commentRoutes.post('/addComment', comment_controllers_1.addComment);
