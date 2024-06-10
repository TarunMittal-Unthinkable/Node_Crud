const {
  getRecordsByUserId,
  addRecord,
  updateRecord,
  deleteRecord,
} = require("../services/userRecordService");

async function getUserRecords(req, res) {
  const { page = 1, limit = 10, search = "" } = req.query;
  try {
    const records = await getRecordsByUserId(
      req.user.userId,
      page,
      limit,
      search
    );
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createUserRecord(req, res) {
  try {
    const record = await addRecord(req.user.userId, req.body);
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUserRecord(req, res) {
  try {
    const record = await updateRecord(req.user.userId, req.params.id, req.body);
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteUserRecord(req, res) {
  try {
    await deleteRecord(req.user.userId, req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUserRecords,
  createUserRecord,
  updateUserRecord,
  deleteUserRecord,
};
