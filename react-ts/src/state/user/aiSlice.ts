import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { Message } from "../../types/AITypes";

export const sendMessage = createAsyncThunk<
  Message,
  { jwt: string; userMessage: string },
  { rejectValue: string }
>("/ai/sendMessage", async ({ jwt, userMessage }, { rejectWithValue }) => {
  try {
    console.log("Sending userMessage:", userMessage);
    const response = await api.post("/ai", userMessage, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("User sendMessage: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || "Failed to sendMessage");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const getUserMessages = createAsyncThunk<
  Message[],
  string,
  { rejectValue: string }
>("/ai/getUserMessages", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get("/ai", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("User getUserMessages: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || "Failed to getUserMessages");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

interface aiChatState {
  message: Message | null;
  messages: Message[];
  loading: boolean;
  error: unknown;
}

const initialState: aiChatState = {
  message: null,
  messages: [],
  loading: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //sendMessage
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //getUserMessages
    builder
      .addCase(getUserMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getUserMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default aiSlice.reducer;
