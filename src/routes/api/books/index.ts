import { FastifyRequest } from "fastify/types/request";
import prisma from "./../../../db";

import { FastifyInstance } from "fastify/types/instance";
import { FastifyReply } from "fastify/types/reply";
import bookService from "../../../service/book.service";
type IdParamsType = { id: string }
type ListQueryStringType = { q:string, offset: number, limit: number, order_by: string, order_direction: 'asc' | 'desc' }


type UpdateBodyType = { author_id: string, title: string }
type CreateBodyType = UpdateBodyType & {};


const requiredProperties = ['author_id', 'title'];
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

const bookProperties = {
  author_id: { type: 'string', maxLength: 50 },
  title: { type: 'string', maxLength: 50 }
}

const idParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', minLength: 1 , maxLength:50}
  }
}


export default async function bookRoutes(fastify: FastifyInstance, options: Object) {
  const apiPath = 'api/book';

  fastify.get(`/${apiPath}`, listOpts, async (request: FastifyRequest<{ Querystring: ListQueryStringType }>, reply: FastifyReply) => {
    const { q = '', offset = 0, limit = 10, order_by: orderBy = 'created_at', order_direction: orderDirection = 'desc' } = request.query;

    const result = await bookService.list({
      q,
      limit,
      offset,
      orderBy,
      orderDirection
    })

    return result;
  });

  fastify.get(`/${apiPath}/:id`, {
    schema: {
      params: idParamsSchema
    }
  },async (request: FastifyRequest<{ Params: IdParamsType }>, reply) => {
    const { id } = request.params;
    const row= await bookService.findById(id);
    if(!row){reply.code(404);return;}
    return row;
  });



  fastify.post(`/${apiPath}`,{
    schema: {
      body: {
        type: 'object',
        required: requiredProperties,
        properties: bookProperties
      }
    }
  }, async (request: FastifyRequest<{ Body: CreateBodyType }>, reply) => {

    const { author_id, title } = request.body;
reply.code(201)
    return bookService.create({
      authorId: author_id,
      title
    }
    );
  });

  fastify.patch(`/${apiPath}/:id`,{
    schema: {
      params: idParamsSchema,
      body: {
        type: 'object',
        properties: bookProperties
      }
    }
  }, async (request: FastifyRequest<{ Params: IdParamsType , Body:UpdateBodyType}>, reply) => {
      const { id } = request.params;
      const {author_id:authorId, title} = request.body;
      await bookService.updateById(id,{
          authorId,
          title
        });
      reply.code(204);
    });

  fastify.delete(`/${apiPath}/:id`,{ schema: {
      params: idParamsSchema
    }}, async (request: FastifyRequest<{ Params: IdParamsType }>, reply) => {
    const { id } = request.params;
    await bookService.deleteById(id);
    reply.code(204);
  });
}