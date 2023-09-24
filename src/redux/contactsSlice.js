import { createSlice } from '@reduxjs/toolkit';
import { addContact, fetchContact, deleteContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [fetchContact.pending]: handlePending,
    [fetchContact.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchContact.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled]: (state, action) => {
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
      state.isLoading = false;
      state.error = null;
    },
    [deleteContact.rejected]: handleRejected,
  },
});

export default contactsSlice.reducer;
