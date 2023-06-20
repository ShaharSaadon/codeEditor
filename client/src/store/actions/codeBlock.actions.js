import { codeBlockService } from '../../services/codeBlock.service';
import {
  SET_CODEBLOCKS,
  UPDATE_CODEBLOCK,
} from '../reducers/codeBlock.reducer.js';

export function loadCodeBlocks() {
  return async (dispatch) => {
    try {
      const codeBlocks = await codeBlockService.query();
      const action = {
        type: SET_CODEBLOCKS,
        codeBlocks,
      };
      dispatch(action);
    } catch (error) {
      console.log('error:', error);
    }
  };
}

export function updateCodeBlock(codeBlock) {
  return async (dispatch) => {
    try {
      const updatedCodeBlock = await codeBlockService.update(codeBlock);
      const action = {
        type: UPDATE_CODEBLOCK,
        updatedCodeBlock,
      };
      dispatch(action);
    } catch (error) {
      console.log('error:', error);
    }
  };
}
