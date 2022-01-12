import supertest from 'supertest'
import app from '../app'

let token: string

describe("Auth", () => {
 const data = {
  "firstName": "Sam",
  "lastName": "Aju",
  "DOB": "21/01/1993",
  "email": "samajul@gmail.com",
  "phoneNo": "08130553102",
  "password": "123456"
 };
 test("signup", async () => {
  const response = await supertest(app).post("/signup").send(data);
  expect(response.status).toBe(201);
  expect(response.body.message).toBe("success! You have received a balance of 5000NGN");
  expect(response.body.userDetails.email).toBe(data.email);
 });
 test("login", async () => {
  const response = await supertest(app)
   .post("/login")
   .send({ email: data.email, password: data.password });
  token = response.body.user.token
  expect(response.status).toBe(201);
  expect(response.body.message).toBe("login successful");
 });
});
//let res:string;


describe("balance", () => {
 const data = {
  _id: "61de182136c5b39fe4524151",
  accountNo: "0000000001",
  balance: "5000",
  createdAt: "2022-01-11T23:52:01.442Z",
  userId: "61de182136c5b39fe452414e"
 }
 test("get all account balance", async () => {
  const response = await supertest(app)
   .post(`/balance`)
   .set("Authorization", `Bearer ${token}`)
   .send(data);
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("successful!");
 })
 // test("get all authors", async () => {
 //  const response = await supertest(app)
 //   .get("/author")
 //   .set("Authorization", `Bearer ${token}`);
 //  //console.log(response.body);
 //  expect(response.status).toBe(200);
 //  expect(response.body.author[0]).toHaveProperty("ID");
 // });
 // test("get an author", async () => {
 //  const response = await supertest(app)
 //   .get(`/author/${authorId}`)
 //   .set("Authorization", `Bearer ${token}`);
 //  //console.log(response.body);
 //  expect(response.status).toBe(200);
 //  expect(response.body.author).toHaveProperty("address");
 // });
 // test("update an author", async () => {
 //  const response = await supertest(app)
 //   .put(`/author/${authorId}`)
 //   .set("Authorization", `Bearer ${token}`)
 //   .send({
 //    author: "Charis Claire",
 //    age: 32,
 //    address: "7, Straight Street, Walls",
 //   });
 //  //console.log(response.body.author.author)
 //  expect(response.status).toBe(200);
 //  expect(response.body.message).toBe("successful!");
 //  expect(response.body.author.author).toMatch("Charis Claire");
 // });
 // test("delete an author", async () => {
 //  const response = await supertest(app)
 //   .delete(`/author/${authorId}`)
 //   .set("Authorization", `Bearer ${token}`);
 //  //   console.log(response.body)
 //  expect(response.status).toBe(200);
 //  expect(response.body.message).toBe("successful!");
 // });
});