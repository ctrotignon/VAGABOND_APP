import { Router } from 'express';

import { createMarker, getAllMarkers, getMarkersByUser, updateMarker, deleteMarker } from '../controllers/marker.controllers';
import { authenticate } from '../middlewares/authenticate.middleware';
const markerRoutes = Router();
markerRoutes.post('/createMarker', authenticate, createMarker);
markerRoutes.get('/getAllMarkers', authenticate, getAllMarkers);
markerRoutes.get('/getMarkersByUser', authenticate, getMarkersByUser);
markerRoutes.put('/updateMarker', authenticate, updateMarker);
markerRoutes.delete('/deleteMarker/:selectedMarkerId', authenticate, deleteMarker);

export { markerRoutes };
