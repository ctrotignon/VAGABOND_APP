"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = void 0;
const handleErrorResponse = (res, error) => {
    if (error instanceof Error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        throw error;
    }
    else {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        throw new Error('Unexpected error occurred');
    }
};
exports.handleErrorResponse = handleErrorResponse;
