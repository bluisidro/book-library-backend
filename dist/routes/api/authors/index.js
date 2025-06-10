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
exports.default = authorRoutes;
const author_service_1 = __importDefault(require("../../../service/author.service"));
function authorRoutes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiPath = 'api/author';
        fastify.get(`/${apiPath}`, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { offset = 0, limit = 10, order_by: orderBy = 'created_at', order_direction: orderDirection = 'desc' } = request.query;
            const result = yield author_service_1.default.list({
                limit,
                offset,
                orderBy,
                orderDirection
            });
            return result;
        }));
        fastify.get(`/${apiPath}/:id`, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return author_service_1.default.findById(id);
        }));
        fastify.post(`/${apiPath}`, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { email, first_name: firstName, last_name: lastName, mobile } = request.body;
            return author_service_1.default.create({
                email,
                firstName,
                lastName,
                mobile
            });
        }));
        fastify.patch(`/${apiPath}/:id`, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { email, first_name: firstName, last_name: lastName, mobile } = request.body;
            return author_service_1.default.updateById(id, {
                email,
                firstName,
                lastName,
                mobile
            });
        }));
        fastify.delete(`/${apiPath}/:id`, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return author_service_1.default.deleteById(id);
        }));
    });
}
