import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrls from "../../common/apiUrls";
import { toast } from "react-toastify";

// Fetch user details
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const loading = toast.loading("Fetching data, Please wait...", {
      position: "bottom-center",
    });
    const axiosInstance = axios.create({ withCredentials: true });
    const response = await axiosInstance(apiUrls.userDetails.url);
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

// Logout user
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    const loading = toast.loading("Loading, Please wait...", {
      position: "bottom-center",
    });
    const axiosInstance = axios.create({ withCredentials: true });
    const response = await axiosInstance(apiUrls.logout.url);
    if (response.data.error) {
      toast.error(response.data.message, { position: "bottom-center" });
      throw new Error(response.data.message);
    }
    toast.dismiss(loading.current);
    toast.success(response.data.message, { position: "bottom-center" });
    return response.data;
  } catch (error) {
    toast.error("Something went wrong", { position: "bottom-center" });
    throw error;
  }
});

export const updateUserBasicDetails = createAsyncThunk(
  "user/updateBasicDetails",
  async (userDetails) => {
    try {
      const axiosInstance = axios.create({ withCredentials: true });
      const response = await axiosInstance.put(
        apiUrls.updateUserBasicDetails.url,
        userDetails
      );

      if (response.data.error) {
        toast.error(response.data.message, { position: "bottom-center" });
        const emailResponse = await axiosInstance.post(apiUrls.sendcode.url, {
          email: userDetails.email,
          check: false,
        });
        if (emailResponse.data.success) {
          toast.success(emailResponse.data.message, {
            position: "bottom-center",
          });
        } else if (emailResponse.data.error) {
          toast.error(emailResponse.data.message, {
            position: "bottom-center",
          });
        }
        return emailResponse.data;
      }else{
      toast.success(response.data.message, { position: "bottom-center" });
      return response.data;
      }
    } catch (error) {
      toast.error("Something went wrong", { position: "bottom-center" });
      throw error;
    }
  }
);

export const UpdateInfo = createAsyncThunk(
  "user/paymentOptionUpdate",
  async ({userDetail, url }) => {
    try {
      const axiosInstance = axios.create({ withCredentials: true });
      const response = await axiosInstance.put(
        url,
        userDetail
      );
      console.log(response)
      if (response.data.error) {
        toast.error(response.data.message, { position: "bottom-center" });
      }
      else{
      toast.success(response.data.message, { position: "bottom-center" });
      return response.data;
      }
    } catch (error) {
      toast.error("Something went wrong", { position: "bottom-center" });
    }
  }
);


// Initial state
const initialState = {
  userDetail: null,
};

// User slice
const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userDetail = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userDetail = null;
      })
      .addCase(updateUserBasicDetails.fulfilled, (state, action) => {
        if (action.payload?.codeSend === undefined)
          state.userDetail = action.payload;
        else {
          state.userDetail = {
            ...state.userDetail,
            msg: action.payload
          };
        }
      })
      .addCase(UpdateInfo.fulfilled, (state, action) => {
          state.userDetail = action.payload;
      })
  },
});

export const { setUserDetail } = userDetailSlice.actions;
export default userDetailSlice.reducer;
