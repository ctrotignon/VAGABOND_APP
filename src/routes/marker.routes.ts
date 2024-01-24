import { Router } from 'express';

import { createMarker, getAllMarkers, getMarkersByUser, updateMarker, deleteMarker } from '../controllers/marker.controllers';

const markerRoutes = Router();
markerRoutes.post('/createMarker', createMarker);
markerRoutes.get('/getAllMarkers', getAllMarkers);
markerRoutes.get('/getMarkersByUser', getMarkersByUser);
markerRoutes.put('/updateMarker', updateMarker);
markerRoutes.delete('/deleteMarker/:selectedMarkerId', deleteMarker);

export { markerRoutes };
