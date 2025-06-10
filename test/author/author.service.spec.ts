const tableName = 'author';
const objectName = `${tableName}Dao`;


const id = "1";
const books:string[]=[];
const created_at="2025-06-03T06:05:16.060Z";
const email= "john@gmail.com";
const firstName= "john";
const lastName = "isidro"
const mobile= "+639502700222";
const updated_at= "2025-06-03T06:05:16.060Z";

const firstNameUpdated = 'joe';

const row = {
  id,
  books,
  created_at,
  email,
  first_name:firstName,
  last_name:lastName,
  mobile,
  updated_at
}

const updatedRow={...row, first_name:firstNameUpdated};


jest.mock('./../../src/dataaccess/author.dao', () => ({
    list: jest.fn().mockResolvedValueOnce({data:[row]}),
    findById:jest.fn().mockResolvedValueOnce(row),
    create:jest.fn().mockResolvedValueOnce(row),
    updateById:jest.fn().mockResolvedValueOnce(updatedRow),
    deleteById:jest.fn().mockResolvedValueOnce(row),
}));


import authorService from "../../src/service/author.service";


test(`test ${objectName}.list() `, async () => {
  expect(await authorService.list({ offset: 0, limit: 10, orderBy: 'created_at', orderDirection: 'desc' })).toStrictEqual({ data: [row] });
});

test(`test ${objectName}.findById() `, async () => {
  expect(await authorService.findById(id)).toStrictEqual(row);
});

test(`test ${objectName}.create() `, async () => {
  expect(await authorService.create({email, firstName,lastName, mobile})).toStrictEqual(row);
});

test(`test ${objectName}.updateById() `, async () => {
  expect(await authorService.updateById(id,{email, firstName:firstNameUpdated,lastName, mobile})).toStrictEqual(updatedRow);
});

test(`test ${objectName}.deleteById() `, async () => {
  expect(await authorService.deleteById(id)).toStrictEqual(row);
});


