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
exports.deleteMarker = exports.updateMarker = exports.getMarkersByUser = exports.getMarkerCountByUser = exports.getMarkersUserConnected = exports.getAllMarkers = exports.createMarker = void 0;
const marker_model_1 = require("../models/marker.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
require("dotenv/config");
const { SECRET } = process.env;
if (!SECRET) {
    throw new Error('JWT secret is not defined in the environment variables.');
}
const createMarker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, type, description, latitude, longitude } = req.body;
        yield marker_model_1.Marker.create({ title, type, description, latitude, longitude, userId });
        return res.status(201).json({ message: 'Marker created' });
    }
    catch (error) {
        console.error('Error creating marker:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createMarker = createMarker;
const getAllMarkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIdToExclude = req.body.userId;
        const allMarkers = yield marker_model_1.Marker.findAll({
            where: {
                userId: {
                    [sequelize_1.Op.ne]: userIdToExclude,
                },
            },
        });
        res.status(200).json({ markers: allMarkers, isEditable: false });
    }
    catch (error) {
        console.error('Error fetching markers:', error);
        res.status(500).json({ error: 'Unable to fetch markers' });
    }
});
exports.getAllMarkers = getAllMarkers;
const getMarkersUserConnected = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const markersOfUser = yield marker_model_1.Marker.findAll({ where: { userId } });
        res.status(200).json({ markers: markersOfUser, isEditable: true });
    }
    catch (error) {
        console.error('Error fetching markers by user:', error);
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired' });
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getMarkersUserConnected = getMarkersUserConnected;
const getMarkersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const markersOfUser = yield marker_model_1.Marker.findAll({ where: { userId: userId } });
        res.status(200).json({ markers: markersOfUser, isEditable: true });
    }
    catch (error) {
        console.error('Error fetching markers by user:', error);
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired' });
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getMarkersByUser = getMarkersByUser;
const getMarkerCountByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postUserId } = req.params;
    if (postUserId === undefined || postUserId === null) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    try {
        const markerCount = yield marker_model_1.Marker.count({
            where: {
                userId: postUserId,
            },
        });
        res.status(201).json(markerCount);
    }
    catch (error) {
        console.error('Error fetching followers count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getMarkerCountByUser = getMarkerCountByUser;
const updateMarker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { markerId } = req.params;
        const { userId, title, type, description, latitude, longitude, token } = req.body;
        const existingMarker = yield marker_model_1.Marker.findOne({ where: { id: markerId, userId } });
        console.log('existing');
        if (!existingMarker) {
            return res.status(404).json({ message: 'This marker does not exist or you do not have permission to update this marker' });
        }
        const updateOptions = { where: { id: markerId, userId } };
        yield marker_model_1.Marker.update({ title, type, description, latitude, longitude }, updateOptions);
        return res.status(200).json({ message: 'Marker updated' });
    }
    catch (error) {
        console.error('Error updating marker:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.updateMarker = updateMarker;
const deleteMarker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { markerId } = req.params;
        const { userId } = req.body;
        if (!markerId) {
            return res.status(400).json({ error: 'Missing markerId parameter' });
        }
        const existingMarker = yield marker_model_1.Marker.findOne({ where: { id: markerId, userId } });
        if (!existingMarker) {
            return res.status(404).json({ message: 'This marker does not exist or you do not have permission to delete this marker' });
        }
        yield marker_model_1.Marker.destroy({ where: { id: markerId, userId } });
        return res.status(200).json({ message: 'Marker deleted' });
    }
    catch (error) {
        console.error('Error deleting marker:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteMarker = deleteMarker;
