"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = exports.Account = exports.Map = exports.UploadMedia = exports.Discover = exports.Login = exports.Register = exports.HomeConnected = exports.Home = void 0;
// ce fichier sert a importer toutes mes views
// et les exporter en une seule ligne
const Home_1 = __importDefault(require("./Home"));
exports.Home = Home_1.default;
const Register_1 = __importDefault(require("./Register"));
exports.Register = Register_1.default;
const Login_1 = __importDefault(require("./Login"));
exports.Login = Login_1.default;
const HomeConnect_1 = __importDefault(require("./HomeConnect"));
exports.HomeConnected = HomeConnect_1.default;
const Discover_1 = __importDefault(require("./Discover"));
exports.Discover = Discover_1.default;
const UploadMedia_1 = __importDefault(require("./UploadMedia"));
exports.UploadMedia = UploadMedia_1.default;
const MapScreen_1 = __importDefault(require("./MapScreen"));
exports.Map = MapScreen_1.default;
const Account_1 = __importDefault(require("./Account"));
exports.Account = Account_1.default;
const UserProfile_1 = __importDefault(require("./UserProfile"));
exports.UserProfile = UserProfile_1.default;
