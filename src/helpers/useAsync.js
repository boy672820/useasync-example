import { useCallback, useEffect, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync(callback, deps = []) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = useCallback(async () => {
    dispatch({ type: 'LOADING' });

    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;
