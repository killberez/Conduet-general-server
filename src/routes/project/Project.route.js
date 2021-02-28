"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Project_controller_1 = require("./Project.controller");
const router = express_1.default.Router();
router.get("/", Project_controller_1.findAll);
router.post("/", Project_controller_1.createProject);
router.delete("/:projectId", Project_controller_1.deleteProject);
router.patch("/:projectId", Project_controller_1.updateProject);
router.get("/:projectId", Project_controller_1.findById);
exports.default = router;
