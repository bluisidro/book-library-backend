const tableName = 'author';
const objectName = `${tableName}Dao`;


const id = "1";
const books: string[] = [];
const created_at = "2025-06-03T06:05:16.060Z";
const email = "john@gmail.com";
const firstName = "john";
const lastName = "isidro"
const mobile = "+639502700222";
const updated_at = "2025-06-03T06:05:16.060Z";

const firstNameUpdated = 'joe';

const row = {
  id,
  books,
  created_at,
  email,
  first_name: firstName,
  last_name: lastName,
  mobile,
  updated_at
}

const updatedRow = { ...row, first_name: firstNameUpdated };


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


import dao from "../../src/dataaccess/author.dao";


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
  expect(await dao.create({ email, firstName, lastName, mobile })).toStrictEqual(row);
});

test(`test ${objectName}.updateById() `, async () => {
  expect(await dao.updateById(id, { email, firstName: firstNameUpdated, lastName, mobile })).toStrictEqual(updatedRow);
});

test(`test ${objectName}.deleteById() `, async () => {
  expect(await dao.deleteById(id)).toStrictEqual(row);
});


