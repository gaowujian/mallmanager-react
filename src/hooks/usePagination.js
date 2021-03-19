import React from "react";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case typeName:
      return { ...state, ...payload };

    default:
      return state;
  }
};

function usePagination(initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
export default usePagination;
