import { useEffect } from 'react';
import { debounce } from 'lodash';

function useStorage(state, dispatch) {
  const debouncedSaveToLocalStorage = debounce((state) => {
    localStorage.setItem('notes', JSON.stringify(state));
  }, 1000);

  useEffect(function loadFromStorage() {
    const savedState = JSON.parse(localStorage.getItem('notes'));
    dispatch({ type: 'load', savedState });
  }, [dispatch]);

  useEffect(function saveToStorage() {
    debouncedSaveToLocalStorage(state);
  });
}

export default useStorage;
