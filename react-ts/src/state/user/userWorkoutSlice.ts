import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateExerciseRequest,
  CreateSetRequest,
  CreateWorkoutRequest,
  Exercise,
  UpdateExerciseRequest,
  UpdateWorkoutRequest,
  UpdateWorkoutSetRequest,
  Workout,
  WorkoutExercise,
  WorkoutSet,
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

export const fetchAllWorkoutsByUser = createAsyncThunk<
  Workout[],
  string,
  { rejectValue: string }
>("/userworkout/fetchAllWorkoutsByUser", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get(`/workout`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
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

export const addExerciseToWorkout = createAsyncThunk<
  WorkoutExercise,
  { jwt: string; workoutId: number; exerciseId: number },
  { rejectValue: string }
>(
  "/userworkout/addExerciseToWorkout",
  async ({ jwt, workoutId, exerciseId }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/workout/${workoutId}/${exerciseId}/exercise`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User Add Exercise To Workout: ", response.data);
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

export const deleteWorkoutExercise = createAsyncThunk<
  void,
  { jwt: string; workoutExerciseId: number },
  { rejectValue: string }
>(
  "/userworkout/deleteWorkoutExercise",
  async ({ jwt, workoutExerciseId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/workout/workout-exercise/${workoutExerciseId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User Delete Exercise: ", response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to delete exercise");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchWorkoutByWorkoutExercise = createAsyncThunk<
  WorkoutExercise,
  { jwt: string; workoutExerciseId: number },
  { rejectValue: string }
>(
  "/userworkout/fetchWorkoutByWorkoutExercise",
  async ({ jwt, workoutExerciseId }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/workout/workout-exercise/${workoutExerciseId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User Delete Exercise: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to fetch workout exercise"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchWorkoutByWorkoutId = createAsyncThunk<
  Workout,
  { jwt: string; workoutId: number },
  { rejectValue: string }
>(
  "/userworkout/fetchWorkoutByWorkoutId",
  async ({ jwt, workoutId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/workout/${workoutId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("User fetchWorkoutByWorkoutId: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to fetchWorkoutByWorkoutId"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const addSetToExercise = createAsyncThunk<
  WorkoutSet,
  {
    jwt: string;
    workoutExerciseId: number;
    createSetRequest: CreateSetRequest;
  },
  { rejectValue: string }
>(
  "/userworkout/addSetToExercise",
  async ({ jwt, workoutExerciseId, createSetRequest }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/workout/exercise/${workoutExerciseId}`,
        createSetRequest,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User addSetToExercise: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to addSetToExercise");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchWorkoutExerciseById = createAsyncThunk<
  WorkoutExercise,
  { jwt: string; workoutExerciseId: number },
  { rejectValue: string }
>(
  "/userworkout/fetchWorkoutExerciseById",
  async ({ jwt, workoutExerciseId }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/workout/workout-exercise/${workoutExerciseId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User fetchWorkoutExerciseById: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to fetchWorkoutExerciseById"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteWorkoutSet = createAsyncThunk<
  void,
  { jwt: string; workoutSetId: number },
  { rejectValue: string }
>(
  "/userworkout/deleteWorkoutSet",
  async ({ jwt, workoutSetId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/workout/workout-exercise/set/${workoutSetId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User deleteWorkoutSet: ", response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to deleteWorkoutSet");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateWorkoutSet = createAsyncThunk<
  WorkoutSet,
  {
    jwt: string;
    workoutSetId: number;
    updateWorkoutSetRequest: UpdateWorkoutSetRequest;
  },
  { rejectValue: string }
>(
  "/userworkout/updateWorkoutSet",
  async (
    { jwt, workoutSetId, updateWorkoutSetRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/workout/set/${workoutSetId}`,
        updateWorkoutSetRequest,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User updateWorkoutSet: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to updateWorkoutSet");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

interface UserWorkoutState {
  workout: Workout | null;
  workouts: Workout[] | null;
  workoutExercise: WorkoutExercise | null;
  exercises: Exercise[] | null;
  exercise: Exercise | null;
  workoutSet: WorkoutSet | null;
  loading: boolean;
  error: unknown;
}

const initialState: UserWorkoutState = {
  workout: null,
  workouts: [],
  workoutExercise: null,
  workoutSet: null,
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

    //fetchAllWorkoutsByUser
    builder
      .addCase(fetchAllWorkoutsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWorkoutsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = action.payload;
      })
      .addCase(fetchAllWorkoutsByUser.rejected, (state, action) => {
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

    //addExerciseToWorkout
    builder
      .addCase(addExerciseToWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExerciseToWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutExercise = action.payload;
      })
      .addCase(addExerciseToWorkout.rejected, (state, action) => {
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

    //deleteWorkoutExercise
    builder
      .addCase(deleteWorkoutExercise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkoutExercise.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteWorkoutExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //fetchWorkoutByWorkoutExercise
    builder
      .addCase(fetchWorkoutByWorkoutExercise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkoutByWorkoutExercise.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutExercise = action.payload;
      })
      .addCase(fetchWorkoutByWorkoutExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchWorkoutByWorkoutId
    builder
      .addCase(fetchWorkoutByWorkoutId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkoutByWorkoutId.fulfilled, (state, action) => {
        state.loading = false;
        state.workout = action.payload;
      })
      .addCase(fetchWorkoutByWorkoutId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //addSetToExercise
    builder
      .addCase(addSetToExercise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSetToExercise.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutSet = action.payload;
      })
      .addCase(addSetToExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //fetchWorkoutExerciseById
    builder
      .addCase(fetchWorkoutExerciseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkoutExerciseById.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutExercise = action.payload;
      })
      .addCase(fetchWorkoutExerciseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //deleteWorkoutSet
    builder
      .addCase(deleteWorkoutSet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkoutSet.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteWorkoutSet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //updateWorkoutSet
    builder
      .addCase(updateWorkoutSet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkoutSet.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutSet = action.payload;
      })
      .addCase(updateWorkoutSet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userWorkoutSlice.reducer;

// export const fetchAllWorkouts = createAsyncThunk<
//   Workout[],
//   void,
//   { rejectValue: string }
// >("/userworkout/fetchAllWorkouts", async (_, { rejectWithValue }) => {
//   try {
//     const response = await api.get("/workout/all");
//     console.log("User Fetch All Workouts: ", response.data);
//     return response.data;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return rejectWithValue(
//         error.message || "Failed to fetch user order history"
//       );
//     }
//     return rejectWithValue("An unknown error occurred");
//   }
// });
