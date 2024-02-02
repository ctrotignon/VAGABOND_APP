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
const temporaryVerificationCodes = {};
const register = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			const { email, username, password } = req.body;
			const user = yield User.create({ email, username, password, isVerified: false });
			const { id } = user;
			const token = generateToken(id !== null && id !== void 0 ? id : 0);
			const code = crypto.randomUUID();
			temporaryVerificationCodes[email] = code;
			const mailOptions = {
				from: 'noreply@vagabond.com',
				to: email,
				subject: "Vérification de l'e-mail",
				text: `Copie le code pour vérifier ton e-mail : ${code}`,
			};
			const transporter = nodemailer.createTransport({
				host: SMTP_HOST,
				port: Number(SMTP_PORT),
				secure: false,
				auth: {
					user: SMTP_USER,
					pass: SMTP_PASS,
				},
			});
			yield transporter.sendMail(mailOptions);
			const response = { message: 'User created. Check your email for verification.', token };
			res.status(201).json(response);
		} catch (error) {
			handleErrorResponse(res, error);
		}
	});
const verifyEmail = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			console.log('TEMPO', temporaryVerificationCodes);
			const { userId, code } = req.body;
			const user = yield User.findOne({ where: { id: userId } });
			if (!user) {
				return res.status(404).json({ success: false, message: 'User not found' });
			}
			const email = user.email;
			if (temporaryVerificationCodes[email] === code) {
				yield User.update({ isVerified: true }, { where: { id: userId } });
				delete temporaryVerificationCodes[email];
				const response = { success: true, message: 'E-mail verified successfully.', isVerified: true };
				return res.status(200).json(response);
			} else {
				return res.status(400).json({ success: false, message: 'Invalid verification code' });
			}
		} catch (error) {
			handleErrorResponse(res, error);
		}
	});
