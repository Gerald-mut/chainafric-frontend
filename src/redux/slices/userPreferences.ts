
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferencesState {
  language: string;
  theme: 'dark' | 'light' | 'system';
  connectedWallet: string | null;
  bookmarkedAddresses: string[];
}

const initialState: UserPreferencesState = {
  language: 'en',
  theme: 'system',
  connectedWallet: null,
  bookmarkedAddresses: [],
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<'dark' | 'light' | 'system'>) => {
      state.theme = action.payload;
    },
    setConnectedWallet: (state, action: PayloadAction<string | null>) => {
      state.connectedWallet = action.payload;
    },
    addBookmarkedAddress: (state, action: PayloadAction<string>) => {
      if (!state.bookmarkedAddresses.includes(action.payload)) {
        state.bookmarkedAddresses.push(action.payload);
      }
    },
    removeBookmarkedAddress: (state, action: PayloadAction<string>) => {
      state.bookmarkedAddresses = state.bookmarkedAddresses.filter(
        address => address !== action.payload
      );
    },
  },
});

export const { 
  setLanguage, 
  setTheme, 
  setConnectedWallet,
  addBookmarkedAddress,
  removeBookmarkedAddress
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
