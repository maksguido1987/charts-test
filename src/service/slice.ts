import { createSlice } from "@reduxjs/toolkit";
import { Chart } from "../app/types";

interface InitialState {
  data: Chart[];
}

const initialState = {
  data: [],
};

const slice = createSlice({
  name: "root",
  initialState,
  reducers: {},
});
