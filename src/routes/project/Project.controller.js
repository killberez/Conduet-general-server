"use strict";
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
exports.deleteProject = exports.updateProject = exports.createProject = exports.findAllByUserId = exports.findById = exports.findAll = void 0;
const Project_service_1 = __importDefault(require("./Project.service"));
const Project_model_1 = __importDefault(require("./Project.model"));
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project_service_1.default.findAllByUserId(req.body.userId);
        res.json(projects);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.findAll = findAll;
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_service_1.default.findById(req.params.projectId);
        if (req.body.userId === project.userId) {
            res.json(project);
        }
        else {
            res.status(401).json("No access!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.findById = findById;
const findAllByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield Project_service_1.default.findAll());
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.findAllByUserId = findAllByUserId;
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, settings } = req.body;
        const project = new Project_model_1.default({
            name: name,
            userId: req.body.userId,
            settings: settings,
            lastModifiedOn: new Date(),
        });
        const newProject = yield Project_service_1.default.create(project);
        res.json(newProject);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createProject = createProject;
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const projectId = req.params.projectId;
        const project = yield Project_service_1.default.findById(projectId);
        if (req.body.userId === project.userId) {
            const updateProject = yield Project_service_1.default.update(projectId, update);
            res.json(updateProject);
        }
        else {
            res.status(401).json("No access!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.projectId;
        const project = yield Project_service_1.default.findById(projectId);
        if (req.body.userId === project.userId) {
            yield Project_service_1.default.deleteProject(projectId);
            res.status(204).end();
        }
        else {
            res.json("No access!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteProject = deleteProject;
