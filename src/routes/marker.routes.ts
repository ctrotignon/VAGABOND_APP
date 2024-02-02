import { Router } from 'express';

import { createMarker, getAllMarkers, getMarkersUserConnected, getMarkersByUser, updateMarker, deleteMarker, getMarkerCountByUser } from '../controllers/marker.controllers';
import { authenticate } from '../middlewares/authenticate.middleware';
const markerRoutes = Router();

markerRoutes.post('/marker', authenticate, createMarker);
markerRoutes.get('/markers', authenticate, getAllMarkers);
markerRoutes.get('/markersUserConnected', authenticate, getMarkersUserConnected);
markerRoutes.get('/markersCount/:postUserId', getMarkerCountByUser);
markerRoutes.get('/markersByUser/:userId', getMarkersByUser);
markerRoutes.put('/markers/:markerId', authenticate, updateMarker);
markerRoutes.delete('/markers/:markerId', authenticate, deleteMarker);

export { markerRoutes };
