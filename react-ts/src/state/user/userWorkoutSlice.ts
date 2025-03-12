import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateExerciseRequest,
  CreateWorkoutRequest,
  Exercise,
  UpdateExerciseRequest,
  UpdateWorkoutRequest,
  Workout,
} from "../../types/WorkoutTypes";
import { api } from "../../config/api";

export const fetchAllExercises = createAsyncThunk<
  Exercise[],
  void,
  { rejectValue: string }
>("/userworkout/fetchAllExercises", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/workout/all/exercises");
    console.log("User Fetch All Exercises: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(
        error.message || "Failed to fetch user order history"
      );
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const fetchAllWorkouts = createAsyncThunk<
  Workout[],
  void,
  { rejectValue: string }
>("/userworkout/fetchAllWorkouts", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/workout/all");
    console.log("User Fetch All Workouts: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(
        error.message || "Failed to fetch user order history"
      );
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const addWorkout = createAsyncThunk<
  Workout,
  { jwt: string; workoutData: CreateWorkoutRequest },
  { rejectValue: string }
>(
  "/userworkout/addWorkout",
  async ({ jwt, workoutData }, { rejectWithValue }) => {
    try {
      const response = await api.post("/workout", workoutData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("User Create Workout: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to fetch user order history"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateWorkout = createAsyncThunk<
  Workout,
  { jwt: string; workoutData: UpdateWorkoutRequest; workoutId: number },
  { rejectValue: string }
>(
  "/userworkout/updateWorkout",
  async ({ jwt, workoutData, workoutId }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/workout/update/${workoutId}`,
        workoutData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User Create Workout: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to fetch user order history"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteWorkout = createAsyncThunk<
  void,
  { jwt: string; workoutId: number },
  { rejectValue: string }
>(
  "/userworkout/deleteWorkout",
  async ({ jwt, workoutId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`workout/${workoutId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("User Delete Exercise: ", response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to delete exercise");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const addExercise = createAsyncThunk<
  Exercise,
  { jwt: string; exerciseData: CreateExerciseRequest },
  { rejectValue: string }
>(
  "/userworkout/addExercise",
  async ({ jwt, exerciseData }, { rejectWithValue }) => {
    try {
      const response = await api.post("/workout/exercise", exerciseData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("User Create Exercise: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to fetch user order history"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateExercise = createAsyncThunk<
  Exercise,
  { jwt: string; exerciseData: UpdateExerciseRequest; exerciseId: number },
  { rejectValue: string }
>(
  "/userworkout/updateExercise",
  async ({ jwt, exerciseData, exerciseId }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/workout/exercise/${exerciseId}`,
        exerciseData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User Create Exercise: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to fetch user order history"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteExercise = createAsyncThunk<
  void,
  { jwt: string; exerciseId: number },
  { rejectValue: string }
>(
  "/userworkout/deleteExercise",
  async ({ jwt, exerciseId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/exercise/${exerciseId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("User Delete Exercise: ", response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to delete exercise");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

interface UserWorkoutState {
  workout: Workout | null;
  workouts: Workout[] | null;
  exercises: Exercise[] | null;
  exercise: Exercise | null;
  loading: boolean;
  error: unknown;
}

const initialState: UserWorkoutState = {
  workout: null,
  workouts: [],
  exercise: null,
  exercises: [],
  loading: false,
  error: null,
};

const userWorkoutSlice = createSlice({
  name: "userworkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetchAllExercises
    builder
      .addCase(fetchAllExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchAllExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //fetchAllWorkouts
    builder
      .addCase(fetchAllWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWorkouts.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = action.payload;
      })
      .addCase(fetchAllWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //addWorkout
    builder
      .addCase(addWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workout = action.payload;
      })
      .addCase(addWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //updateWorkout
    builder
      .addCase(updateWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workout = action.payload;
      })
      .addCase(updateWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //deleteWorkout
    builder
      .addCase(deleteWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkout.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //addExercise
    builder
      .addCase(addExercise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExercise.fulfilled, (state, action) => {
        state.loading = false;
        state.exercise = action.payload;
      })
      .addCase(addExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //updateExercise
    builder
      .addCase(updateExercise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExercise.fulfilled, (state, action) => {
        state.loading = false;
        state.exercise = action.payload;
      })
      .addCase(updateExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //deleteExercise
    builder
      .addCase(deleteExercise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExercise.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userWorkoutSlice.reducer;
