import { httpService } from './http.service.js';

const STORAGE_KEY = 'codeblock';

export const codeBlockService = {
  query,
  getById,
  update,
};

async function query() {
  return httpService.get(STORAGE_KEY);
}

async function getById(codeBlockId) {
  return httpService.get(`${STORAGE_KEY}/${codeBlockId}`);
}

async function update(codeBlock) {
  return httpService.put(`${STORAGE_KEY}/${codeBlock._id}`, codeBlock);
}
