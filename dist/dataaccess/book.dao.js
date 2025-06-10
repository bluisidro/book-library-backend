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
exports.list = list;
exports.findById = findById;
exports.create = create;
exports.updateById = updateById;
exports.deleteById = deleteById;
const db_1 = __importDefault(require("./../db"));
const tableName = 'book';
/**
 * list books in a database
 * @param {ListParamsType} params - contains filters and sorting options for the list
 * @returns {data:[Author]} - retrieved books
 */
function list(_a) {
    return __awaiter(this, arguments, void 0, function* ({ offset = 0, limit = 10, orderDirection = 'desc', orderBy = 'created_at' }) {
        const data = yield db_1.default[tableName].findMany({
            include: {
                author: true
            },
            skip: offset, take: limit, orderBy: [{ [orderBy]: orderDirection }]
        });
        return { data };
    });
}
/**
 * Finds a Book by using id
 * @param {string} id - Book id
 * @returns {Book} - the book that matches the id provided
 */
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.default[tableName].findUnique({
            include: { author: true },
            where: {
                id: parseInt(id)
            }
        });
    });
}
/**
 * creates a new book in database
 * @param {CreateBodyType} book - to be created book
 * @returns {Book} - the book created with auto generated fields (example "id", "created_at")
 */
function create(_a) {
    return __awaiter(this, arguments, void 0, function* ({ authorId, title }) {
        return db_1.default[tableName].create({
            data: {
                title,
                author_id: parseInt(authorId),
            }
        });
    });
}
/**
 * updates a book using id in database
 * @param {string} id  - id of to be updated book
 * @param {UpdateBodyType} book - to be updated book
 * @returns {Author} - updated book
 */
function updateById(id_1, _a) {
    return __awaiter(this, arguments, void 0, function* (id, { authorId, title }) {
        return db_1.default[tableName].update({
            where: { id: parseInt(id) },
            data: {
                author_id: parseInt(authorId),
                title,
            }
        });
    });
}
/**
 * deletes a book using id in database
 * @param {string} id - id of to be deleted book
 * @returns {Book} - deleted book
 */
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.default[tableName].delete({
            where: { id: parseInt(id) }
        });
    });
}
exports.default = { list, findById, create, updateById, deleteById };
