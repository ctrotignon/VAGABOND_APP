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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const post_controllers_1 = require("../src/controllers/post.controllers");
const post_model_1 = require("../src/models/post.model");
jest.mock('jsonwebtoken');
describe('createPost', () => {
    const mockRequest = {
        body: { type: 'text', mediaURL: 'example.jpg' },
        headers: { authorization: 'Bearer mockToken' },
    };
    const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create a post and return a success response', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockDecodedToken = { id: 'mockUserId' };
        jest.mocked(jsonwebtoken_1.default.verify).mockReturnValueOnce(mockDecodedToken);
        const mockPost = { id: 'mockPostId', user_id: 'mockUserId', type: 'text', mediaURL: 'example.jpg' };
        post_model_1.Post.create = jest.fn().mockResolvedValueOnce(mockPost);
        yield (0, post_controllers_1.createPost)(mockRequest, mockResponse);
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith('mockToken', expect.any(String));
        expect(post_model_1.Post.create).toHaveBeenCalledWith({ user_id: 'mockUserId', type: 'text', mediaURL: 'example.jpg' });
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Post created', post: mockPost });
    }));
    it('should handle error and return a 500 response if an exception occurs', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.mocked(jsonwebtoken_1.default.verify).mockImplementationOnce(() => {
            throw new Error('Token verification failed');
        });
        yield (0, post_controllers_1.createPost)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    }));
    it('should handle error and return a 500 response if Post.create fails', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockDecodedToken = { id: 'mockUserId' };
        jest.mocked(jsonwebtoken_1.default.verify).mockReturnValueOnce(mockDecodedToken);
        post_model_1.Post.create = jest.fn().mockRejectedValueOnce(new Error('Post creation failed'));
        yield (0, post_controllers_1.createPost)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    }));
    it('should handle error and return a 500 response if authorization token is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRequestWithoutToken = {
            body: { type: 'text', mediaURL: 'example.jpg' },
            headers: {},
        };
        yield (0, post_controllers_1.createPost)(mockRequestWithoutToken, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    }));
});
