"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, default: "" },
    email: String,
    googleId: String,
    firstName: String || undefined,
    familyName: String || undefined,
    picture: String || undefined,
});
exports.default = mongoose_1.default.model("User", userSchema);
