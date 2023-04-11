import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chart } from "../app/types";
import { getRandomChartsData } from "../shared";

interface InitialState {
  data: Chart[];
  filterValue: string;
}

const initialState: InitialState = {
  data: [],
  filterValue: "",
};

const slice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    initializationCharts: (state, action: PayloadAction<number>) => {
      state.filterValue = "";
      state.data = getRandomChartsData(action.payload);
    },
    setFilterValue: (state, action: PayloadAction<string>) => {
      state.filterValue = action.payload;
    },
    deleteChart: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((chart) => chart.id !== action.payload);
    },
  },
});

export const { actions: chartActions, reducer: chartReducers } = slice;
