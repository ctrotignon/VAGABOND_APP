'use strict';
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteMarker = exports.updateMarker = exports.getMarker = exports.createMarker = void 0;
const createMarker = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			// on recupere ça du formulaire
			const { title, type, description, coordinates, userId } = req.body;
			console.log('TITLE', title);
			console.log('TYPE', type);
			console.log('DESCRIPTION', description);
			console.log('COORDINATES', coordinates === null || coordinates === void 0 ? void 0 : coordinates.latitude, coordinates === null || coordinates === void 0 ? void 0 : coordinates.longitude);
			console.log('USER ID', userId);
			// il faut que je recupere coordinates et userId
			// const marker = await Marker.create({ title, type, description,});
			return res.status(201).json({ message: 'Marker created' });
		} catch (error) {
			console.error('Error creating user:', error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	});
exports.createMarker = createMarker;
const getMarker = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		// A FAIRE
		//   try {
		//     const { username } = req.body
		//     if (!username) {
		//       return res.status(401).json({ message: "Invalid username" });
		//     } else {
		//       return res.status(200).json( {message : 'You are logged', user : username})
		//     }
		//   } catch (error) {
		//     throw new Error(`Unable to login, ${error}`);
		//   }
	});
exports.getMarker = getMarker;
const updateMarker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {});
exports.updateMarker = updateMarker;
const deleteMarker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {});
exports.deleteMarker = deleteMarker;
