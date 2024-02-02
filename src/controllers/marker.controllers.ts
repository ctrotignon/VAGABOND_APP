import { Request, Response } from 'express';
import { Marker } from '../models/marker.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Op } from 'sequelize';
import 'dotenv/config';
const { SECRET } = process.env;
if (!SECRET) {
	throw new Error('JWT secret is not defined in the environment variables.');
}

const createMarker = async (req: Request, res: Response) => {
	try {
		const { userId, title, type, description, latitude, longitude } = req.body;

		await Marker.create({ title, type, description, latitude, longitude, userId });
		return res.status(201).json({ message: 'Marker created' });
	} catch (error) {
		console.error('Error creating marker:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const getAllMarkers = async (req: Request, res: Response) => {
	try {
		const userIdToExclude = req.body.userId;

		const allMarkers = await Marker.findAll({
			where: {
				userId: {
					[Op.ne]: userIdToExclude,
				},
			},
		});
		res.status(200).json({ markers: allMarkers, isEditable: false });
	} catch (error) {
		console.error('Error fetching markers:', error);
		res.status(500).json({ error: 'Unable to fetch markers' });
	}
};

const getMarkersUserConnected = async (req: Request, res: Response) => {
	try {
		const { userId } = req.body;

		const markersOfUser = await Marker.findAll({ where: { userId } });

		res.status(200).json({ markers: markersOfUser, isEditable: true });
	} catch (error) {
		console.error('Error fetching markers by user:', error);

		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({ error: 'Token expired' });
		}

		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ error: 'Invalid token' });
		}
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const getMarkersByUser = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;

		const markersOfUser = await Marker.findAll({ where: { userId: userId } });

		res.status(200).json({ markers: markersOfUser, isEditable: true });
	} catch (error) {
		console.error('Error fetching markers by user:', error);

		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({ error: 'Token expired' });
		}

		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ error: 'Invalid token' });
		}
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const getMarkerCountByUser = async (req: Request, res: Response) => {
	const { postUserId } = req.params;

	if (postUserId === undefined || postUserId === null) {
		return res.status(400).json({ error: 'Invalid user ID' });
	}
	try {
		const markerCount = await Marker.count({
			where: {
				userId: postUserId,
			},
		});
		res.status(201).json(markerCount);
	} catch (error) {
		console.error('Error fetching followers count:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const updateMarker = async (req: Request, res: Response) => {
	try {
		const { markerId } = req.params;
		const { userId, title, type, description, latitude, longitude, token } = req.body;

		const existingMarker = await Marker.findOne({ where: { id: markerId, userId } });
		console.log('existing');

		if (!existingMarker) {
			return res.status(404).json({ message: 'This marker does not exist or you do not have permission to update this marker' });
		}

		const updateOptions: any = { where: { id: markerId, userId } };
		await Marker.update({ title, type, description, latitude, longitude }, updateOptions);

		return res.status(200).json({ message: 'Marker updated' });
	} catch (error) {
		console.error('Error updating marker:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const deleteMarker = async (req: Request, res: Response) => {
	try {
		const { markerId } = req.params;
		const { userId } = req.body;

		if (!markerId) {
			return res.status(400).json({ error: 'Missing markerId parameter' });
		}

		const existingMarker = await Marker.findOne({ where: { id: markerId, userId } });

		if (!existingMarker) {
			return res.status(404).json({ message: 'This marker does not exist or you do not have permission to delete this marker' });
		}

		await Marker.destroy({ where: { id: markerId, userId } });

		return res.status(200).json({ message: 'Marker deleted' });
	} catch (error) {
		console.error('Error deleting marker:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export { createMarker, getAllMarkers, getMarkersUserConnected, getMarkerCountByUser, getMarkersByUser, updateMarker, deleteMarker };
