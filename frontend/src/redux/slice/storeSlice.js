import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import apiUrls from "../../common/apiUrls";
import { toast } from "react-toastify";

export const fetchStore= createAsyncThunk("store/fetchStore", async () => {
  try {
    const loading = toast.loading("Fetching data, Please wait...", {
      position: "bottom-center",
    });
    const axiosInstance = axios.create({ withCredentials: true });
    const response = await axiosInstance(apiUrls.fatchStoreDetails.url);
    toast.dismiss(loading.current);
    if (response.data.error) {
      toast.error(response.data.message, { position: "bottom-center" });
      throw new Error(response.data.message);
    }
    toast.success(response.data.message, { position: "bottom-center" });
    return response.data;
  } catch (error) {
    toast.error("Something went wrong", { position: "bottom-center" });
    throw error;
  }
});

export const CreateUpdateStore = createAsyncThunk(
  "store/CreateUpdateStore",
  async ({info, url }) => {
    const loading = toast.loading("Fetching data, Please wait...", {
      position: "bottom-center",
    });
    try {
      const loading = toast.loading("Fetching data, Please wait...", {
        position: "bottom-center",
      });
      const axiosInstance = axios.create({ withCredentials: true });
      const response = await axiosInstance.post(
        url,
        info
      );
      toast.dismiss(loading.current);
      if (response.data.error) {
        toast.error(response.data.message, { position: "bottom-center" });
      }
      else{
      toast.success(response.data.message, { position: "bottom-center" });
      return response.data;
      }
    } catch (error) {
      toast.dismiss(loading.current);
      toast.error("Something went wrong", { position: "bottom-center" });
    }
  }
);

const storeSlice = createSlice({
  name: 'Store',
  initialState: {
    Store: [],
  },
  reducers: {
    setStore(state, action) {
      state.Store = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStore.fulfilled, (state, action) => {
        state.Store = action.payload;
      })
    builder
      .addCase(CreateUpdateStore.fulfilled, (state, action) => {
        state.Store = action.payload;
      })
    }
});

export const { setStore } = storeSlice.actions;
export default storeSlice.reducer;