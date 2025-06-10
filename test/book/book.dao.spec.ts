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


jest.mock('./../../src/db', () => ({
  [tableName]: {
    findMany: jest.fn().mockResolvedValueOnce([row]),
    findUnique: jest.fn().mockResolvedValueOnce(row),
    create: jest.fn().mockResolvedValueOnce(row),
    update: jest.fn().mockResolvedValueOnce(updatedRow),
    delete: jest.fn().mockResolvedValueOnce(row),
    count: jest.fn().mockResolvedValue(1),
  },
  $transaction: jest.fn().mockResolvedValue([[row], 1, 1])

}));



import dao from "../../src/dataaccess/book.dao";


test(`test ${objectName}.list() `, async () => {
  expect(await dao.list({ offset: 0, limit: 10, orderBy: 'created_at', orderDirection: 'desc' })).toStrictEqual({
    data: [row], total_filtered_records: 1,
    total_records: 1,
  });
});

test(`test ${objectName}.findById() `, async () => {
  expect(await dao.findById(id)).toStrictEqual(row);
});

test(`test ${objectName}.create() `, async () => {
  expect(await dao.create({authorId, title})).toStrictEqual(row);
});

test(`test ${objectName}.updateById() `, async () => {
  expect(await dao.updateById(id,{authorId, title})).toStrictEqual(updatedRow);
});

test(`test ${objectName}.deleteById() `, async () => {
  expect(await dao.deleteById(id)).toStrictEqual(row);
});


