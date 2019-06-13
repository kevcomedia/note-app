import { useReducer } from 'react';

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

  const newSelectedNoteId =
    newNotes.length > 0 ? newNotes[newNotes.length - 1].id : null;
  return { notes: newNotes, selectedNoteId: newSelectedNoteId };
}

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return addNote(state);

    case 'delete':
      return deleteNote(state);

    case 'update':
      if (state.selectedNoteId === null) {
        return state;
      }
      const selectedNoteIndex = state.notes.findIndex(
        ({ id }) => id === state.selectedNoteId,
      );

      const newNotes = [...state.notes];
      newNotes.splice(selectedNoteIndex, 1);

      const selectedNote = state.notes[selectedNoteIndex];
      newNotes.unshift({ ...selectedNote, text: action.text });
      return { notes: newNotes, selectedNoteId: state.selectedNoteId };

    case 'select':
      return { notes: state.notes, selectedNoteId: action.selectedNoteId };

    case 'load':
      if (action.savedState) {
        return action.savedState;
      } else {
        return { notes: [], selectedNoteId: null };
      }

    default:
      throw new Error();
  }
}

function useNotes() {
  const initialState = { notes: [], selectedNoteId: null };
  return useReducer(reducer, initialState);
}

export default useNotes;
