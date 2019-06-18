import { useEffect, useReducer } from 'react';
import useStorage from './useStorage';

function addNote(state) {
  const nextId =
    1 + state.notes.map((note) => note.id).reduce((a, b) => (b > a ? b : a), 0);
  const newNotes = [...state.notes];
  newNotes.unshift({ text: '', id: nextId });
  return { ...state, notes: newNotes, selectedNoteId: nextId };
}

function deleteNote(state) {
  if (state.selectedNoteId === null || state.notes.length === 0) {
    return state;
  }

  const selectedNoteIndex = state.notes.findIndex(
    ({ id }) => id === state.selectedNoteId,
  );

  const newNotes = [...state.notes];
  newNotes.splice(selectedNoteIndex, 1);

  const newSelectedNoteId = newNotes.length > 0 ? newNotes[0].id : null;
  return { notes: newNotes, selectedNoteId: newSelectedNoteId };
}

function updateNote(state, text) {
  if (state.selectedNoteId === null) {
    return state;
  }

  const selectedNoteIndex = state.notes.findIndex(
    ({ id }) => id === state.selectedNoteId,
  );

  const newNotes = [...state.notes];
  newNotes.splice(selectedNoteIndex, 1);

  const selectedNote = state.notes[selectedNoteIndex];
  newNotes.unshift({ ...selectedNote, text });
  return { notes: newNotes, selectedNoteId: state.selectedNoteId };
}

function loadState(savedState) {
  return savedState ? savedState : { notes: [], selectedNoteId: null };
}

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return addNote(state);
    case 'delete':
      return deleteNote(state);
    case 'update':
      return updateNote(state, action.text);
    case 'select':
      return { notes: state.notes, selectedNoteId: action.selectedNoteId };
    case 'load':
      return loadState(action.savedState);
    default:
      throw new Error();
  }
}

// I don't know if a parameter for a ref to some textarea is the way to go.
// This is where TypeScript shines. Instead of passing a ref, we could pass the
// current node/component instead, then use an interface so it expects a focus()
// method.
function useNotes(editorRef) {
  const initialState = { notes: [], selectedNoteId: null };
  const [state, dispatch] = useReducer(reducer, initialState);
  const selectedNote = state.notes.find(
    (note) => note.id === state.selectedNoteId,
  );

  useEffect(
    function focusEditor() {
      // There seems to be a lot of low-level detail here. We could abstract
      // these out.
      if (editorRef.current) {
        editorRef.current.focus();
        editorRef.current.selectionEnd = 0;
      }
    },
    // Only focus when a new note is selected.
    [editorRef, state.selectedNoteId],
  );

  // useStorage requires the raw state itself. Calling it here instead of the
  // App component removes the need to put the state in the returned array.
  // Also, instead of passing the dispatch function, I want to return a function
  // that calls the "load" dispatch type. But the app breaks when I do that.
  useStorage(state, dispatch);

  // With these many elements, I think it's better to return an object. But it
  // seems the convention for custom hooks (if ever there is one) is to return
  // an array.
  return [
    state.notes,
    selectedNote,
    function add() {
      dispatch({ type: 'add' });
    },
    // delete is a keyword; used remove instead.
    function remove() {
      dispatch({ type: 'delete' });
    },
    function update(text) {
      dispatch({ type: 'update', text });
    },
    function select(id) {
      dispatch({ type: 'select', selectedNoteId: id });
    },
  ];
}

export default useNotes;
