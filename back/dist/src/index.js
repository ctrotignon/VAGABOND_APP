"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const databaseConfig_1 = require("./config/databaseConfig");
const dotenv_1 = __importDefault(require("dotenv"));
// IMPORT ROUTES
const user_routes_1 = require("./routes/user.routes");
const marker_routes_1 = require("./routes/marker.routes");
const post_routes_1 = require("./routes/post.routes");
const follower_routes_1 = require("./routes/follower.routes");
const comment_routes_1 = require("./routes/comment.routes");
const like_routes_1 = require("./routes/like.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    return res.status(200).send('Vagabond Server');
});
// const options = {
// 	key: fs.readFileSync('server.key'),
// 	cert: fs.readFileSync('server.cert'),
// };
app.use('/user', user_routes_1.userRoutes);
app.use('/post', post_routes_1.postRoutes);
app.use('/marker', marker_routes_1.markerRoutes);
app.use('/follow', follower_routes_1.followerRoutes);
app.use('/comment', comment_routes_1.commentRoutes);
app.use('/like', like_routes_1.likeRoutes);
// const server = https.createServer(options, app);
// START SERVER
try {
    app.listen(PORT, () => {
        console.log(`Server is started on ${PORT}`);
    });
}
catch (error) {
    if (error instanceof TypeError)
        console.log(`Error occurred: ${error.message}`);
}
(0, databaseConfig_1.checkDbConnection)();
(0, databaseConfig_1.synchronizeDb)();
// ROUTES
