export const SET_CODEBLOCKS = 'SET_CODEBLOCKS';

const INITIAL_STATE = {
  codeBlocks: [],
};

export function codeBlockReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_CODEBLOCKS:
      return {
        ...state,
        codeBlocks: action.codeBlocks,
      };

    default:
      return state;
  }
}
