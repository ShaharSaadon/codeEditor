import { httpService } from './http.service.js';

const STORAGE_KEY = 'codeBlock';

export const codeBlockService = {
  query,
  getById,
};

async function query() {
  return httpService.get(STORAGE_KEY);
}

async function getById(codeBlockId) {
  return httpService.get(`${STORAGE_KEY}/${codeBlockId}`);
}
