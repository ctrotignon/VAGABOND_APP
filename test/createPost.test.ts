import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createPost } from '../src/controllers/post.controllers';
import { Post } from '../src/models/post.model';

jest.mock('jsonwebtoken');

describe('createPost', () => {
	const mockRequest = {
		body: { type: 'text', mediaURL: 'example.jpg' },
		headers: { authorization: 'Bearer mockToken' },
	} as Request;

	const mockResponse = {
		status: jest.fn(() => mockResponse),
		json: jest.fn(),
	} as unknown as Response;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should create a post and return a success response', async () => {
		const mockDecodedToken: JwtPayload = { id: 'mockUserId' };
		jest.mocked(jwt.verify).mockReturnValueOnce(mockDecodedToken as any);
		const mockPost = { id: 'mockPostId', user_id: 'mockUserId', type: 'text', mediaURL: 'example.jpg' };
		Post.create = jest.fn().mockResolvedValueOnce(mockPost);

		await createPost(mockRequest, mockResponse);

		expect(jwt.verify).toHaveBeenCalledWith('mockToken', expect.any(String));
		expect(Post.create).toHaveBeenCalledWith({ user_id: 'mockUserId', type: 'text', mediaURL: 'example.jpg' });
		expect(mockResponse.status).toHaveBeenCalledWith(201);
		expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Post created', post: mockPost });
	});

	it('should handle error and return a 500 response if an exception occurs', async () => {
		jest.mocked(jwt.verify).mockImplementationOnce(() => {
			throw new Error('Token verification failed');
		});

		await createPost(mockRequest, mockResponse);

		expect(mockResponse.status).toHaveBeenCalledWith(500);
		expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
	});

	it('should handle error and return a 500 response if Post.create fails', async () => {
		const mockDecodedToken: JwtPayload = { id: 'mockUserId' };
		jest.mocked(jwt.verify).mockReturnValueOnce(mockDecodedToken as any);
		Post.create = jest.fn().mockRejectedValueOnce(new Error('Post creation failed'));

		await createPost(mockRequest, mockResponse);

		expect(mockResponse.status).toHaveBeenCalledWith(500);
		expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
	});

	it('should handle error and return a 500 response if authorization token is not provided', async () => {
		const mockRequestWithoutToken = {
			body: { type: 'text', mediaURL: 'example.jpg' },
			headers: {},
		} as Request;

		await createPost(mockRequestWithoutToken, mockResponse);

		expect(mockResponse.status).toHaveBeenCalledWith(500);
		expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
	});
});
