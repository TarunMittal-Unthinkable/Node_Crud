const knex = require('../knex');

// Retrieve records by user ID with pagination and optional search
async function getRecordsByUserId(userId, page, limit, search) {
    const offset = (page - 1) * limit;
    return knex('users') 
        .where('id', userId)
        .andWhere(function() {
            if (search) {
                this.where('first_name', 'like', `%${search}%`)
                    .orWhere('last_name', 'like', `%${search}%`)
                    .orWhere('email', 'like', `%${search}%`);
            }
        })
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset);
}

// Add a new user record
async function addRecord(userId, recordData) {
    const [record] = await knex('users') 
        .insert({
            ...recordData,
            created_by: userId,
            created_at: new Date(),
            updated_at: new Date()
        })
        .returning('*');
    return record;
}

// Update an existing user record
async function updateRecord(userId, recordId, recordData) {
    const [updatedRecord] = await knex('users') 
        .where('id', recordId)
        .andWhere('created_by', userId) // Ensure only records created by the user can be updated
        .update({
            ...recordData,
            updated_at: new Date()
        })
        .returning('*');
    return updatedRecord;
}

// Delete a user record
async function deleteRecord(userId, recordId) {
    await knex('users') 
        .where('id', recordId)
        .andWhere('created_by', userId) // Ensure only records created by the user can be deleted
        .del();
}

module.exports = {
    getRecordsByUserId,
    addRecord,
    updateRecord,
    deleteRecord,
};
