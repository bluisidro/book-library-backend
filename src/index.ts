import fastify from 'fastify'
import cors from '@fastify/cors'
import authorRoutes from './routes/api/authors'
import bookRoutes from './routes/api/books'

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8081;

const server = fastify()
server.register(cors, { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] });
// server.setErrorHandler(async (err, req, res) => {
//   res.code(500);
// });

server.register(authorRoutes);
server.register(bookRoutes);

server.get('/', (_request, reply) => {
  reply.status(200).send('server is up');
});

server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1);
  }
  console.log(`Server listening at ${address}`)
})