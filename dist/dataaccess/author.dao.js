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
const tableName = 'author';
/**
 * list authors in a database
 * @param {ListParamsType} params - contains filters and sorting options for the list
 * @returns {data:[Author]} - retrieved authors
 */
function list(_a) {
    return __awaiter(this, arguments, void 0, function* ({ offset = 0, limit = 10, orderDirection = 'desc', orderBy = 'created_at' }) {
        const data = yield db_1.default[tableName].findMany({
            include: {
                books: true
            },
            skip: offset, take: limit, orderBy: [{ [orderBy]: orderDirection }]
        });
        return { data };
    });
}
/**
 * Finds an Author by using id
 * @param {string} id - Author id
 * @returns {Book} - the Author that matches the id provided
 */
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.default[tableName].findUnique({
            include: { books: true },
            where: {
                id: parseInt(id)
            }
        });
    });
}
/**
 * creates a new author in database
 * @param {CreateBodyType} author - to be created author
 * @returns {Author} - the author created with auto generated fields (example "id", "created_at")
 */
function create(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, firstName, lastName, mobile }) {
        return db_1.default[tableName].create({
            data: {
                email,
                first_name: firstName,
                last_name: lastName,
                mobile
            }
        });
    });
}
/**
 * updates an author using id in database
 * @param {string} id  - id of to be updated author
 * @param {UpdateBodyType} author - to be updated author
 * @returns {Author} - updated author
 */
function updateById(id_1, _a) {
    return __awaiter(this, arguments, void 0, function* (id, { email, firstName, lastName, mobile }) {
        return db_1.default[tableName].update({
            where: { id: parseInt(id) },
            data: {
                email,
                first_name: firstName,
                last_name: lastName,
                mobile
            }
        });
    });
}
/**
 * deletes an author using id in database
 * @param {string} id - id of to be deleted author
 * @returns {Author} - deleted author
 */
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.default[tableName].delete({
            where: { id: parseInt(id) }
        });
    });
}
exports.default = { list, findById, create, updateById, deleteById };
