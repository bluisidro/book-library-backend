import authorDao, { CreateBodyType, ListParamsType, UpdateBodyType } from "../dataaccess/author.dao";

async function list(params: ListParamsType) {
    return authorDao.list(params);
}


async function findById(id: string) {
    return authorDao.findById(id);
}


async function create(body: CreateBodyType) {
    return authorDao.create(body);
}

async function updateById(id: string, body: UpdateBodyType) {
    return authorDao.updateById(id,body);
}

async function deleteById(id: string) {
    return authorDao.deleteById(id);
}


export default { list, findById, create, updateById, deleteById };