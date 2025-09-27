import { MediaType } from '@/types/media.type';
import { OptionMediaPicked } from '@/types/option.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MediaState = {
  mediaProductPicked: MediaType[];
  mediaOptionsPicked: OptionMediaPicked[];
};

const initialState: MediaState = {
  mediaProductPicked: [],
  mediaOptionsPicked: [],
};

const mediaSlice = createSlice({
  name: 'mediaSlice',
  initialState: initialState,
  reducers: {
    setMedia: (state: MediaState, action: PayloadAction<MediaType[]>) => {
      state.mediaProductPicked = action.payload;
    },
    pushMedia: (state: MediaState, action: PayloadAction<MediaType>) => {
      state.mediaProductPicked.push(action.payload);
    },

    pushOptionMedia: (
      state: MediaState,
      action: PayloadAction<OptionMediaPicked>,
    ) => {
      state.mediaOptionsPicked.push(action.payload);
    },
    removeOptionMedia: (state: MediaState, action: PayloadAction<string>) => {
      state.mediaOptionsPicked = state.mediaOptionsPicked.filter(
        (item) => item.formId === action.payload,
      );
    },
  },
});

const mediaReducer = mediaSlice.reducer;
export const { setMedia } = mediaSlice.actions;
export default mediaReducer;
export type { MediaState };
