const codeBlockService = require('./codeBlock.service.js');

async function getCodeBlocks(req, res) {
  try {
    // console.log('req:', req);
    // logger.debug('Getting Products');
    const codeBlocks = await codeBlockService.query();
    res.json(codeBlocks);
  } catch (err) {
    // logger.error('Failed to get codeBlocks', err);
    res.status(500).send({ err: 'Failed to get codeBlocks' });
  }
}

async function getCodeBlockById(req, res) {
  try {
    const codeBlockId = req.params.id;
    const codeBlock = await codeBlockService.getById(codeBlockId);
    res.json(codeBlock);
  } catch (err) {
    //   logger.error('Failed to get order', err);
    res.status(500).send({ err: 'Failed to get codeBlock' });
  }
}

async function updateCodeBlock(req, res) {
  try {
    const codeBlock = req.body;
    console.log('req.body:', req.body);
    const updatedCodeBlock = await codeBlockService.update(codeBlock);
    res.json(updatedCodeBlock);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: 'Failed to update codeBlock' });
  }
}

module.exports = {
  getCodeBlockById,
  getCodeBlocks,
  updateCodeBlock,
};
