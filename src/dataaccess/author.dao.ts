import { Prisma } from "../../generated/prisma/client";
import prisma from "./../db";

export type ListParamsType = { q?: string, offset?: number, limit?: number, orderDirection?: 'desc' | 'asc', orderBy?: string }

export type UpdateBodyType = { firstName: string, lastName: string, email: string, mobile: string }
export type CreateBodyType = UpdateBodyType & {};

const tableName = 'author';
const prismaTable = prisma[tableName];

/**
 * list authors in a database 
 * @param {ListParamsType} params - contains filters and sorting options for the list 
 * @returns {data:[Author]} - retrieved authors
 */
export async function list({ q = '', offset = 0, limit = 10, orderDirection = 'desc', orderBy = 'created_at' }: ListParamsType) {

    let where = {};

    if (q) {
        where = {
            OR:[
                 {first_name: { contains: q }},
                 {last_name: { contains: q }},
                 {email: { contains: q }},
                 {mobile: { contains: q }},
            ]
        };
    }


    const query: Prisma.AuthorFindManyArgs = {
        include: {
            books: true
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
 * Finds an Author by using id
 * @param {string} id - Author id
 * @returns {Book} - the Author that matches the id provided
 */
export async function findById(id: string) {
    return prismaTable.findUnique({
        include: { books: true },
        where: {
            id: parseInt(id)
        }
    });
}


/**
 * creates a new author in database
 * @param {CreateBodyType} author - to be created author
 * @returns {Author} - the author created with auto generated fields (example "id", "created_at")
 */
export async function create({ email, firstName, lastName, mobile }: CreateBodyType) {

    return prismaTable.create({
        data: {
            email,
            first_name: firstName,
            last_name: lastName,
            mobile
        }
    });
}

/**
 * updates an author using id in database
 * @param {string} id  - id of to be updated author
 * @param {UpdateBodyType} author - to be updated author
 * @returns {Author} - updated author
 */
export async function updateById(id: string, { email, firstName, lastName, mobile }: UpdateBodyType) {
    return prismaTable.update({
        where: { id: parseInt(id) },
        data: {
            email,
            first_name: firstName,
            last_name: lastName,
            mobile
        }
    });
}

/**
 * deletes an author using id in database
 * @param {string} id - id of to be deleted author
 * @returns {Author} - deleted author
 */
export async function deleteById(id: string) {
    return prismaTable.delete({
        where: { id: parseInt(id) }
    });
}


export default { list, findById, create, updateById, deleteById };