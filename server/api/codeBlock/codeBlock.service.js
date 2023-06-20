const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

async function query() {
  try {
    const collection = await dbService.getCollection('codes');
    var codeBlocks = await collection.find().toArray();
    return codeBlocks;
  } catch (err) {
    // logger.error('cannot find codeBlocks', err);
    console.log('cannot find codeBlocks', err);
    throw err;
  }
}

async function getById(codeBlockId) {
  try {
    const collection = await dbService.getCollection('codes');
    const codeBlock = await collection.findOne({
      _id: new ObjectId(codeBlockId),
    });
    return codeBlock;
  } catch (err) {
    //   logger.error(`while finding codeBlock ${codeBlockId}`, err);
    console.log(`while finding codeBlock ${codeBlockId}`, err);
    throw err;
  }
}

module.exports = {
  query,
  getById,
};
