import { Request, Response } from 'express';
import { Marker } from '../models/marker.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UpdateOptions, Op } from 'sequelize';
import 'dotenv/config';
const { SECRET } = process.env;
if (!SECRET) {
	throw new Error('JWT secret is not defined in the environment variables.');
}

const createMarker = async (req: Request, res: Response) => {
	try {
		let { title, type, description, latitude, longitude } = req.body;
		const responseToken = req.headers.authorization;

		if (!responseToken) {
			return res.status(401).json({ error: 'Missing Authorization header' });
		}

		const token = responseToken.replace('Bearer ', '');

		const decodedToken = jwt.verify(token, SECRET) as JwtPayload;
		const user_id = decodedToken.id;

		await Marker.create({ title, type, description, latitude, longitude, user_id });

		return res.status(201).json({ message: 'Marker created' });
	} catch (error) {
		console.error('Error creating marker:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const getAllMarkers = async (req: Request, res: Response) => {
	try {
		const responseToken = req.headers.authorization;

		if (!responseToken) {
			return res.status(401).json({ error: 'Missing Authorization header' });
		}

		const token = responseToken.replace('Bearer ', '');
		const decodedToken = jwt.verify(token, SECRET) as JwtPayload;
		const userIdToExclude = decodedToken.id;

		const allMarkers = await Marker.findAll({
			where: {
				user_id: {
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

const getMarkersByUser = async (req: Request, res: Response) => {
	try {
		const responseToken = req.headers.authorization;

		if (!responseToken) {
			return res.status(401).json({ error: 'Missing Authorization header' });
		}
		const token = responseToken.replace('Bearer ', '');
		const decodedToken = jwt.verify(token, SECRET) as JwtPayload;
		const user_id = decodedToken.id;
		const markersOfUser = await Marker.findAll({ where: { user_id } });
		res.status(200).json({ markers: markersOfUser, isEditable: true });
	} catch (error) {
		console.error('Error fetching markers:', error);
		res.status(500).json({ error: 'Unable to fetch markers' });
	}
};

const updateMarker = async (req: Request, res: Response) => {
	try {
		const { id, title, type, description, latitude, longitude, token } = req.body;

		const decodedToken = jwt.verify(token, SECRET) as JwtPayload;
		const user_id = decodedToken.id;

		const existingMarker = await Marker.findOne({ where: { id, user_id } });

		if (!existingMarker) {
			return res.status(403).json({ message: 'You do not have permission to update this marker' });
		}

		const updateOptions: any = { where: { id, user_id } };
		await Marker.update({ title, type, description, latitude, longitude }, updateOptions);

		return res.status(200).json({ message: 'Marker updated' });
	} catch (error) {
		console.error('Error updating marker:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const deleteMarker = async (req: Request, res: Response) => {
	try {
		const { selectedMarkerId } = req.params;
		const responseToken = req.headers.authorization;

		if (!responseToken) {
			return res.status(401).json({ error: 'Missing Authorization header' });
		}
		const token = responseToken.replace('Bearer ', '');

		const decodedToken = jwt.verify(token, SECRET) as JwtPayload;
		const user_id = decodedToken.id;

		if (!selectedMarkerId) {
			return res.status(400).json({ error: 'Missing selectedMarkerId parameter' });
		}

		const existingMarker = await Marker.findOne({ where: { id: selectedMarkerId, user_id } });

		if (!existingMarker) {
			return res.status(403).json({ message: 'You do not have permission to delete this marker' });
		}

		await Marker.destroy({ where: { id: selectedMarkerId, user_id } });

		return res.status(200).json({ message: 'Marker deleted' });
	} catch (error) {
		console.error('Error deleting marker:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export { createMarker, getAllMarkers, getMarkersByUser, updateMarker, deleteMarker };
