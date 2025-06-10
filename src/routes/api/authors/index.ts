import { FastifyRequest } from "fastify/types/request";
import { FastifyInstance } from "fastify/types/instance";
import { FastifyReply } from "fastify/types/reply";
import authorService from "../../../service/author.service";

type IdParamsType = { id: string }
type ListQueryStringType = { q:string, offset: number, limit: number, order_by: string, order_direction: 'asc' | 'desc' }

type UpdateBodyType = { first_name: string, last_name: string, email: string, mobile: string }
type CreateBodyType = UpdateBodyType & {};

const requiredProperties = ['email', 'first_name', 'last_name', 'mobile'];
const sortableProperties = [...requiredProperties, 'created_at'];

const listOpts = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        q:{ type: 'string' , maxLength: 50 },
        order_by: { type: 'string', enum: sortableProperties },
        order_direction: { type: 'string', enum: ['asc', 'desc'] },
        offset: { type: 'integer', minimum: 0 },
        limit: { type: 'integer', maximum: 10 },
      }
    }
  }
}

const authorProperties = {
  email: { type: 'string', maxLength: 50 , pattern:"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"},
  first_name: { type: 'string', maxLength: 50 },
  last_name: { type: 'string', maxLength: 50 },
  mobile: { type: 'string', pattern: '[0-9]{10}' }
}

const idParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', minLength: 1 , maxLength:50}
  }
}



export default async function authorRoutes(fastify: FastifyInstance, options: Object) {
  const apiPath = 'api/author';

  fastify.get(`/${apiPath}`, listOpts, async (request: FastifyRequest<{ Querystring: ListQueryStringType }>, reply: FastifyReply) => {
    const { q ='', offset = 0, limit = 10, order_by: orderBy = 'created_at', order_direction: orderDirection = 'desc' } = request.query;

    const result = await authorService.list({
      q,
      limit,
      offset,
      orderBy,
      orderDirection
    })

    return result;
  });

  fastify.get(`/${apiPath}/:id`,{
    schema: {
      params: idParamsSchema
    }
  }, async (request: FastifyRequest<{ Params: IdParamsType }>, reply) => {
    const { id } = request.params;
    const row = await authorService.findById(id);
    if(!row) {reply.code(404);return;}
    return row;
  });



  fastify.post(`/${apiPath}`, {
    schema: {
      body: {
        type: 'object',
        required: requiredProperties,
        properties: authorProperties
      }
    }
  }, async (request: FastifyRequest<{ Body: CreateBodyType }>, reply) => {

    const { email, first_name: firstName, last_name: lastName, mobile } = request.body;

    reply.code(201)
    return authorService.create({
      email,
      firstName,
      lastName,
      mobile
    })
  });

  fastify.patch(`/${apiPath}/:id`, {
    schema: {
      params: idParamsSchema,
      body: {
        type: 'object',
        properties: authorProperties
      }
    }
  }, async (request: FastifyRequest<{ Params: IdParamsType, Body: UpdateBodyType }>, reply) => {
    const { id } = request.params;
    const { email, first_name: firstName, last_name: lastName, mobile } = request.body;
     await authorService.updateById(id, {
      email,
      firstName,
      lastName,
      mobile
    });
    reply.code(204);
  });

  fastify.delete(`/${apiPath}/:id`, {
    schema: {
      params: idParamsSchema
    }
  }, async (request: FastifyRequest<{ Params: IdParamsType }>, reply) => {
    const { id } = request.params;
    await authorService.deleteById(id);
    reply.code(204);
  });
}