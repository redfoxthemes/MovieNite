
const movieReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_INIT':
      return {
        ...state,
        isLoadingError: false
      };
    case 'LOAD_COMPLETE':
      return {
        ...state,
        isLoadingError: false,
        data: action.payload,
      };
    case 'LOAD_FAILURE':
      return {
        ...state,
        isLoadingError: true,
      };
    default:
      throw new Error();
  }
};
export default movieReducer;