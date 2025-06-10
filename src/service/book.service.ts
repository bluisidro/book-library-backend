import bookDao, { CreateBodyType, ListParamsType, UpdateBodyType } from "../dataaccess/book.dao";

async function list(params: ListParamsType) {
    return bookDao.list(params);
}


async function findById(id: string) {
    return bookDao.findById(id);
}


async function create(body: CreateBodyType) {
    return bookDao.create(body);
}

async function updateById(id: string, body: UpdateBodyType) {
    return bookDao.updateById(id,body);
}

async function deleteById(id: string) {
    return bookDao.deleteById(id);
}


export default { list, findById, create, updateById, deleteById };