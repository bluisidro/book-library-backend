import { Prisma } from "../../generated/prisma/client";
import prisma from "./../db";

export type ListParamsType = { q?: string, offset?: number, limit?: number, orderDirection?: 'desc' | 'asc', orderBy?: string }

export type UpdateBodyType = { authorId: string, title: string }
export type CreateBodyType = UpdateBodyType & {};

const tableName = 'book';
const prismaTable = prisma[tableName]
/**
 * list books in a database 
 * @param {ListParamsType} params - contains filters and sorting options for the list 
 * @returns {data:[Author]} - retrieved books
 */
export async function list({ q = '', offset = 0, limit = 10, orderDirection = 'desc', orderBy = 'created_at' }: ListParamsType) {
    let where = {};

    if (q) {
        where = {
            title: { contains: q }
        };
    }


    const query: Prisma.BookFindManyArgs = {
        include: {
            author: true,
        },
        where,
        orderBy: [{ [orderBy]: orderDirection }],
        skip: offset, take: limit,
    };


    const [data, total_filtered_records, total_records] = await prisma.$transaction([
        prismaTable.findMany(query),
        prismaTable.count({ where: query.where }),
        prismaTable.count()
    ]);

    return { total_filtered_records, total_records, data };
}

/**
 * Finds a Book by using id
 * @param {string} id - Book id
 * @returns {Book} - the book that matches the id provided
 */
export async function findById(id: string) {
    return prisma[tableName].findUnique({
        include: { author: true },
        where: {
            id: parseInt(id)
        }
    });
}

/**
 * creates a new book in database
 * @param {CreateBodyType} book - to be created book
 * @returns {Book} - the book created with auto generated fields (example "id", "created_at")
 */
export async function create({ authorId, title }: CreateBodyType) {

    return prisma[tableName].create({
        data: {
            title,
            author_id: parseInt(authorId),
        }
    });
}

/**
 * updates a book using id in database
 * @param {string} id  - id of to be updated book
 * @param {UpdateBodyType} book - to be updated book
 * @returns {Author} - updated book
 */
export async function updateById(id: string, { authorId, title }: UpdateBodyType) {
    return prisma[tableName].update({
        where: { id: parseInt(id) },
        data: {
            author_id: authorId ? parseInt(authorId) : undefined,
            title,
        }
    });
}

/**
 * deletes a book using id in database
 * @param {string} id - id of to be deleted book
 * @returns {Book} - deleted book
 */
export async function deleteById(id: string) {
    return prisma[tableName].delete({
        where: { id: parseInt(id) }
    });
}


export default { list, findById, create, updateById, deleteById };