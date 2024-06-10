import knex from "../knex.js";

async function findUser(email) {
  // try {
    const user = await knex("users").where({ email }).first();
    return user;
  // } catch (error) {
  //   throw error;
  // }
}
async function findUseById(id) {
  // try {
    const user = await knex("users").where({ id }).first();
    return user;
  // } catch (error) {
  //   throw error;
  // }
}

async function findExistingNumber(phone_no) {
  // try {
    const user = await knex("users").where({ phone_no }).first();
    return user;
  // } catch (error) {
  //   throw error;
  // }
}

async function createUser(user) {
  // try {
    const newUser = await knex("users").insert(user, ["id", "email"]);
    return newUser;
  // } catch (error) {
  //   throw error;
  // }
}

export default { createUser, findUser,findExistingNumber,findUseById };
