import { createSelector } from "@reduxjs/toolkit";

export const data = (state: RootState) => state.charts.data;
export const filterValue = (state: RootState) => state.charts.filterValue;
export const updateChartData = (state: RootState) =>
  state.charts.updateChartData;
export const isOpenUpdateModal = (state: RootState) =>
  state.charts.isOpenUpdateModal;

export const filteredCharts = createSelector(
  [data, filterValue],
  (data, filterValue) => {
    return filterValue
      ? data.filter(
          (item) =>
            new Date(item.createAt).getFullYear().toString() === filterValue
        )
      : data;
  }
);
