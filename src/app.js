"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Project_route_1 = __importDefault(require("./routes/project/Project.route"));
const User_route_1 = __importDefault(require("./routes/user/User.route"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const dotenv = __importStar(require("dotenv"));
const app = express_1.default();
dotenv.config();
mongoose_1.default
    .connect(process.env.MONGODB_CONNECT_LINK, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(() => { })
    .catch((err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});
app.set("port", 8000 || process.env.PORT);
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use("/auth", Auth_1.default);
app.use("/api", auth_1.default);
app.use("/api/v1/project", Project_route_1.default);
app.use("/api/v1/user", User_route_1.default);
exports.default = app;
