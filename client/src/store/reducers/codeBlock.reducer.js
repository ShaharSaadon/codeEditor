export const SET_CODEBLOCKS = 'SET_CODEBLOCKS';
export const UPDATE_CODEBLOCK = 'UPDATE_CODEBLOCK';

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
    case UPDATE_CODEBLOCK:
      return {
        ...state,
        codeBlocks: state.codeBlocks.map((codeBlock) =>
          codeBlock._id === action.updatedCodeBlock._id
            ? action.updatedCodeBlock
            : codeBlock
        ),
      };

    default:
      return state;
  }
}
