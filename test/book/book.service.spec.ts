const tableName = 'book';
const objectName = `${tableName}Dao`;


const id = "1";
const author:Object[]=[];
const authorId= "john@gmail.com";
const title= "my first book";
const updated_at= "2025-06-03T06:05:16.060Z";
const created_at="2025-06-03T06:05:16.060Z";

const firstNameUpdated = 'joe';

const row = {
  id,
  author,
  created_at,
  title,
  author_id:authorId,
  updated_at
}

const updatedRow={...row, first_name:firstNameUpdated};


jest.mock('./../../src/dataaccess/book.dao', () => ({
    list: jest.fn().mockResolvedValueOnce({data:[row]}),
    findById:jest.fn().mockResolvedValueOnce(row),
    create:jest.fn().mockResolvedValueOnce(row),
    updateById:jest.fn().mockResolvedValueOnce(updatedRow),
    deleteById:jest.fn().mockResolvedValueOnce(row),
}));


import service from "../../src/service/book.service";


test(`test ${objectName}.list() `, async () => {
  expect(await service.list({ offset: 0, limit: 10, orderBy: 'created_at', orderDirection: 'desc' })).toStrictEqual({ data: [row] });
});

test(`test ${objectName}.findById() `, async () => {
  expect(await service.findById(id)).toStrictEqual(row);
});

test(`test ${objectName}.create() `, async () => {
  expect(await service.create({authorId, title})).toStrictEqual(row);
});

test(`test ${objectName}.updateById() `, async () => {
  expect(await service.updateById(id,{authorId, title})).toStrictEqual(updatedRow);
});

test(`test ${objectName}.deleteById() `, async () => {
  expect(await service.deleteById(id)).toStrictEqual(row);
});


