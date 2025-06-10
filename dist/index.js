"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const authors_1 = __importDefault(require("./routes/api/authors"));
const books_1 = __importDefault(require("./routes/api/books"));
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const server = (0, fastify_1.default)();
server.register(authors_1.default);
server.register(books_1.default);
server.get('/', (_request, reply) => {
    reply.status(200).send('server is up');
});
server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
