import https from 'https';
import fs from 'fs';
import express, { Express, Request, Response } from 'express';
import { checkDbConnection, synchronizeDb } from './config/databaseConfig';
import dotenv from 'dotenv';

// IMPORT ROUTES
import { userRoutes } from './routes/user.routes';
import { markerRoutes } from './routes/marker.routes';
import { postRoutes } from './routes/post.routes';
import { followerRoutes } from './routes/follower.routes';
import { commentRoutes } from './routes/comment.routes';
import { likeRoutes } from './routes/like.routes';

dotenv.config();

const app: Express = express();
const PORT = 443;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	return res.status(200).send('Vagabond Server');
});

// const options = {
// 	key: fs.readFileSync('server.key'),
// 	cert: fs.readFileSync('server.cert'),
// };

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/marker', markerRoutes);
app.use('/follow', followerRoutes);
app.use('/comment', commentRoutes);
app.use('/like', likeRoutes);

// const server = https.createServer(options, app);
// START SERVER
try {
	app.listen(PORT, () => {
		console.log(`Server is started on ${PORT}`);
	});
} catch (error: unknown) {
	if (error instanceof TypeError) console.log(`Error occurred: ${error.message}`);
}

checkDbConnection();
synchronizeDb();

// ROUTES
