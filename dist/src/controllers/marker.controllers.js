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
exports.deleteMarker = exports.updateMarker = exports.getMarkersByUser = exports.getAllMarkers = exports.createMarker = void 0;
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
        let { title, type, description, latitude, longitude } = req.body;
        const responseToken = req.headers.authorization;
        if (!responseToken) {
            return res.status(401).json({ error: 'Missing Authorization header' });
        }
        const token = responseToken.replace('Bearer ', '');
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET);
        const user_id = decodedToken.id;
        yield marker_model_1.Marker.create({ title, type, description, latitude, longitude, user_id });
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
        const responseToken = req.headers.authorization;
        if (!responseToken) {
            return res.status(401).json({ error: 'Missing Authorization header' });
        }
        const token = responseToken.replace('Bearer ', '');
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET);
        const userIdToExclude = decodedToken.id;
        const allMarkers = yield marker_model_1.Marker.findAll({
            where: {
                user_id: {
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
const getMarkersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseToken = req.headers.authorization;
        if (!responseToken) {
            return res.status(401).json({ error: 'Missing Authorization header' });
        }
        const token = responseToken.replace('Bearer ', '');
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET);
        const user_id = decodedToken.id;
        const markersOfUser = yield marker_model_1.Marker.findAll({ where: { user_id } });
        res.status(200).json({ markers: markersOfUser, isEditable: true });
    }
    catch (error) {
        console.error('Error fetching markers:', error);
        res.status(500).json({ error: 'Unable to fetch markers' });
    }
});
exports.getMarkersByUser = getMarkersByUser;
const updateMarker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, title, type, description, latitude, longitude, token } = req.body;
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET);
        const user_id = decodedToken.id;
        const existingMarker = yield marker_model_1.Marker.findOne({ where: { id, user_id } });
        if (!existingMarker) {
            return res.status(403).json({ message: 'You do not have permission to update this marker' });
        }
        const updateOptions = { where: { id, user_id } };
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
        const { selectedMarkerId } = req.params;
        const responseToken = req.headers.authorization;
        if (!responseToken) {
            return res.status(401).json({ error: 'Missing Authorization header' });
        }
        const token = responseToken.replace('Bearer ', '');
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET);
        const user_id = decodedToken.id;
        if (!selectedMarkerId) {
            return res.status(400).json({ error: 'Missing selectedMarkerId parameter' });
        }
        const existingMarker = yield marker_model_1.Marker.findOne({ where: { id: selectedMarkerId, user_id } });
        if (!existingMarker) {
            return res.status(403).json({ message: 'You do not have permission to delete this marker' });
        }
        yield marker_model_1.Marker.destroy({ where: { id: selectedMarkerId, user_id } });
        return res.status(200).json({ message: 'Marker deleted' });
    }
    catch (error) {
        console.error('Error deleting marker:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteMarker = deleteMarker;
