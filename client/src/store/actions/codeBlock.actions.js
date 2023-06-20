import { codeBlockService } from '../../services/codeBlock.service';
import { SET_CODEBLOCKS } from '../reducers/codeBlock.reducer.js';

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
