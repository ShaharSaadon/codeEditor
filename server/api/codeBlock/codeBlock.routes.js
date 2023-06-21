const express = require('express');
const {
  getCodeBlockById,
  getCodeBlocks,
  updateCodeBlock,
} = require('./codeBlock.controller.js');
const router = express.Router();

router.get('/:id', getCodeBlockById);
router.get('/', getCodeBlocks);
router.put('/:id', updateCodeBlock);

module.exports = router;
