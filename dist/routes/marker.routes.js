"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markerRoutes = void 0;
const express_1 = require("express");
const marker_controllers_1 = require("../controllers/marker.controllers");
const markerRoutes = (0, express_1.Router)();
exports.markerRoutes = markerRoutes;
markerRoutes.post('/createMarker', marker_controllers_1.createMarker);
