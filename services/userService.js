import knex from "../knex.js";

async function findUser(email) {
    const user = await knex("users").where({ email }).first();
    return user;
}

async function findUseById(id) {
    const user = await knex("users").where({ id }).first();
    return user;
}

async function findExistingNumber(phone_no) {
    const user = await knex("users").where({ phone_no }).first();
    return user;
}

async function createUser(user) {
    const newUser = await knex("users").insert(user, ["id", "email"]);
    return newUser;
}

export default { createUser, findUser,findExistingNumber,findUseById };
