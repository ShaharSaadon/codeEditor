const express = require('express');
const {
  getCodeBlockById,
  getCodeBlocks,
} = require('./codeBlock.controller.js');
const router = express.Router();

router.get('/:id', getCodeBlockById);
router.get('/', getCodeBlocks);

module.exports = router;
