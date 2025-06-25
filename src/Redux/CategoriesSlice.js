import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getCategories = createAsyncThunk('categoriesSlice/getCategories',
    async () => {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        return data.data;
    }
)
export let getSpecificBrand = createAsyncThunk('categoriesSlice/getSpecificBrand',
    async (brand_id) => {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brand_id}`)
        return data.data;
    }
)

let initialState = { categories: [],brand: null, loading: false, isError: null };

let categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isError = action.error.message || "Something went wrong";
                state.loading = false;
            })
            .addCase(getSpecificBrand.pending, (state) => {
                state.loading = true;
                state.brand = null;
            })
            .addCase(getSpecificBrand.fulfilled, (state, action) => {
                state.brand = action.payload;
                state.loading = false;
            })
            .addCase(getSpecificBrand.rejected, (state, action) => {
                state.isError = action.error.message || "Failed to load brand";
                state.loading = false;
            });
    }
});

export let categoriesReducer = categoriesSlice.reducer;
