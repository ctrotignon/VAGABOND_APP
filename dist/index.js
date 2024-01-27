"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const databaseConfig_1 = require("./config/databaseConfig");
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = require("./routes/user.routes");
const marker_routes_1 = require("./routes/marker.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
// Body parsing Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    return res.status(200).send("Express + TypeScript Server");
});
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
app.use("/user", user_routes_1.userRoutes);
app.use("/content", marker_routes_1.markerRoutes);
