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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_model_1 = __importDefault(require("./user/User.model"));
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const router = express_1.default.Router();
dotenv.config();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new google_auth_library_1.OAuth2Client(process.env.GAUTH_CLIENT_ID);
    function verify() {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GAUTH_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (payload) {
                const googlePayload = payload;
                const user = yield User_model_1.default.findOne({
                    googleId: payload.sub,
                }).exec();
                if (user) {
                    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_KEY);
                    res.json({ email: user.email, token });
                }
                else {
                    const newUser = yield User_model_1.default.create({
                        email: googlePayload.email,
                        googleId: googlePayload.sub,
                        firstName: googlePayload.given_name,
                        familyName: googlePayload.family_name,
                        picture: googlePayload.picture,
                    });
                    newUser.save();
                    const token = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_KEY);
                    res.json({ email: newUser.email, token });
                }
            }
        });
    }
    yield verify().catch(console.error);
}));
exports.default = router;
