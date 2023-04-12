import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chart } from "../app/types";
import { getRandomChartsData } from "../shared";
import { INITIAL_UPDATE_CHART_DATA } from "../shared/constants";

interface InitialState {
  data: Chart[];
  updateChartData: Chart;
  filterValue: string;
  isOpenUpdateModal: boolean;
}

const initialState: InitialState = {
  data: [],
  updateChartData: INITIAL_UPDATE_CHART_DATA,
  filterValue: "",
  isOpenUpdateModal: false,
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

    deleteChart: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((chart) => chart.id !== action.payload);
    },

    createChart: (state, action: PayloadAction<Chart>) => {
      state.data.unshift(action.payload);
    },

    setIsOpenUpdateModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenUpdateModal = action.payload;
    },

    setUpdateChartData: (state, action: PayloadAction<Chart>) => {
      state.updateChartData = action.payload;
    },

    clearUpdateChartData: (state) => {
      state.updateChartData = INITIAL_UPDATE_CHART_DATA;
    },

    updateChart: (
      state,
      action: PayloadAction<{ data: Chart; id: string }>
    ) => {
      state.data.forEach((chart, i) => {
        if (chart.id === action.payload.id) {
          const chartData = action.payload.data.data.sort((a, b) => {
            return a.year - b.year;
          });
          state.data[i] = {
            ...action.payload.data,
            data: chartData,
          };
        }
        return chart;
      });
    },
  },
});

export const { actions: chartActions, reducer: chartReducers } = slice;
