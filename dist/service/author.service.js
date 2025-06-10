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
const author_dao_1 = __importDefault(require("../dataaccess/author.dao"));
function list(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return author_dao_1.default.list(params);
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return author_dao_1.default.findById(id);
    });
}
function create(body) {
    return __awaiter(this, void 0, void 0, function* () {
        return author_dao_1.default.create(body);
    });
}
function updateById(id, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return author_dao_1.default.updateById(id, body);
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return author_dao_1.default.deleteById(id);
    });
}
exports.default = { list, findById, create, updateById, deleteById };
