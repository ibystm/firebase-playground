import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDiscoverMoviesAPI } from "../../../apis/fetchContents";
import { ContentsState } from "../../../types/redux/discovers";
import { reducerFormatUtil } from "../../../utils/redux/reducerUtil";

const SLICE_NAME = "contents";
export const initialState: ContentsState = {
  loading: {
    isProcessing: false,
    message: null,
  },
  data: [],
};

const asyncActions = {
  fetchDiscoverMovies: createAsyncThunk(
    `${SLICE_NAME}/fetchDiscoverMovies`,
    async (genreId: number, { rejectWithValue }) => {
      try {
        const res = await fetchDiscoverMoviesAPI(genreId);
        return res;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
};

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncActions.fetchDiscoverMovies.pending, (state) => {
      state.loading.isProcessing = true;
    });
    builder.addCase(
      asyncActions.fetchDiscoverMovies.fulfilled,
      (state, { payload }) => {
        if (payload) {
          const { results } = payload;
          if (results) {
            state.data =
              reducerFormatUtil.movieListResultToReduxStoreData(results);
          }
        }
        state.loading.isProcessing = false;
      }
    );
    builder.addCase(
      asyncActions.fetchDiscoverMovies.rejected,
      (state, payload) => {
        state.loading.isProcessing = false;
        throw payload;
      }
    );
  },
});

export const contentsActions = {
  ...slice.actions,
  ...asyncActions,
};

export const { reducer } = slice;
