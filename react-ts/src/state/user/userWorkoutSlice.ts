import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BodyMeasurement,
  CompleteSetLogRequest,
  CreateExerciseRequest,
  CreateSetRequest,
  CreateWorkoutRequest,
  Exercise,
  MaxWeight,
  SetLog,
  UpdateBodyMeasurementsRequest,
  UpdateExerciseRequest,
  UpdateWorkoutRequest,
  UpdateWorkoutSetRequest,
  Workout,
  WorkoutCount,
  WorkoutExercise,
  WorkoutLog,
  WorkoutSet,
  WorkoutVolume,
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
      const response = await api.put(
        `/workout/update/${workoutId}`,
        workoutData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User updateWorkout: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to updateWorkout");
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
      console.log("User updateExercise: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to updateExercise");
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
      const response = await api.delete(`/workout/exercise/${exerciseId}`, {
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

export const startWorkout = createAsyncThunk<
  WorkoutLog,
  {
    jwt: string;
    workoutId: number;
  },
  { rejectValue: string }
>(
  "/userworkout/startWorkout",
  async ({ jwt, workoutId }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/workout/${workoutId}/start`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User startWorkout: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to startWorkout");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchAllWorkoutLogsByUser = createAsyncThunk<
  WorkoutLog[],
  { jwt: string },
  { rejectValue: string }
>(
  "/userworkout/fetchAllWorkoutLogsByUser",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get("/workout/workout-logs", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("User fetchAllWorkoutLogsByUser: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to fetchAllWorkoutLogsByUser"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteWorkoutLog = createAsyncThunk<
  void,
  { jwt: string; workoutLogId: number },
  { rejectValue: string }
>(
  "/userworkout/deleteWorkoutLog",
  async ({ jwt, workoutLogId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/workout/workout-logs/${workoutLogId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User deleteWorkoutLog: ", response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to deleteWorkoutLog");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchCurrentWorkout = createAsyncThunk<
  WorkoutLog,
  string,
  { rejectValue: string }
>("/userworkout/getCurrentWorkout", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get("/workout/current-workout", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("User getCurrentWorkout: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || "Failed to getCurrentWorkout");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const completeWorkout = createAsyncThunk<
  WorkoutLog,
  { jwt: string; workoutLogId: number },
  { rejectValue: string }
>(
  "/userworkout/completeWorkout",
  async ({ jwt, workoutLogId }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/workout/${workoutLogId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User completeWorkout: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to completeWorkout");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const cancelWorkout = createAsyncThunk<
  WorkoutLog,
  { jwt: string; workoutLogId: number },
  { rejectValue: string }
>(
  "/userworkout/cancelWorkout",
  async ({ jwt, workoutLogId }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/workout/${workoutLogId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User cancelWorkout: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to cancelWorkout");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const completeSetLog = createAsyncThunk<
  SetLog,
  { jwt: string; setLogId: number; req: CompleteSetLogRequest },
  { rejectValue: string }
>(
  "/userworkout/completeSetLog",
  async ({ jwt, setLogId, req }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/workout/set-log/${setLogId}/complete`,
        req,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User completeSetLog: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to completeSetLog");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const uncompleteSetLog = createAsyncThunk<
  SetLog,
  { jwt: string; setLogId: number },
  { rejectValue: string }
>(
  "/userworkout/uncompleteSetLog",
  async ({ jwt, setLogId }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/workout/set-log/${setLogId}/uncompleted`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User uncompleteSetLog: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to uncompleteSetLog");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchWorkoutVolume = createAsyncThunk<
  WorkoutVolume[],
  string,
  { rejectValue: string }
>("/userworkout/fetchWorkoutVolume", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get(`workout/workout-volume`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("User fetchWorkoutVolume: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || "Failed to fetchWorkoutVolume");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const fetchWorkoutCount = createAsyncThunk<
  WorkoutCount[],
  string,
  { rejectValue: string }
>("/userworkout/fetchWorkoutCount", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get(`workout/workout-count`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("User fetchWorkoutCount: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || "Failed to fetchWorkoutCount");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const fetchWorkoutMaxWeights = createAsyncThunk<
  MaxWeight[],
  string,
  { rejectValue: string }
>("/userworkout/fetchWorkoutMaxWeights", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get(`workout/workout-max-weight`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("User fetchWorkoutMaxWeights: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(
        error.message || "Failed to fetchWorkoutMaxWeights"
      );
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const addHeightAndWeight = createAsyncThunk<
  BodyMeasurement,
  { jwt: string; req: UpdateBodyMeasurementsRequest },
  { rejectValue: string }
>(
  "/userworkout/addHeightAndWeight",
  async ({ jwt, req }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/workout/bm`, req, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("User addHeightAndWeight: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to addHeightAndWeight");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchUserBodyMeasurements = createAsyncThunk<
  BodyMeasurement[],
  string,
  { rejectValue: string }
>(
  "/userworkout/fetchUserBodyMeasurements",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`/workout/bm`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("User fetchUserBodyMeasurements: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to fetchUserBodyMeasurements"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateBodyMeasurement = createAsyncThunk<
  BodyMeasurement,
  { jwt: string; req: UpdateBodyMeasurementsRequest; id: number },
  { rejectValue: string }
>(
  "/userworkout/updateBodyMeasurement",
  async ({ jwt, req, id }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/workout/bm/${id}`, req, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("User updateBodyMeasurement: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to updateBodyMeasurement"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteBodyMeasurement = createAsyncThunk<
  void,
  { jwt: string; id: number },
  { rejectValue: string }
>(
  "/userworkout/deleteBodyMeasurement",
  async ({ jwt, id }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/workout/bm/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(`User deleteBodyMeasurement with ID: ${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to deleteBodyMeasurement"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

interface UserWorkoutState {
  workout: Workout | null;
  workouts: Workout[] | null;
  workoutExercise: WorkoutExercise | null;
  workoutLog: WorkoutLog | null;
  workoutLogs: WorkoutLog[] | null;
  exercises: Exercise[] | null;
  exercise: Exercise | null;
  workoutSet: WorkoutSet | null;
  currentWorkout: WorkoutLog | null;
  data: WorkoutVolume[] | null;
  workoutCountData: WorkoutCount[] | null;
  workoutMaxWeights: MaxWeight[] | null;
  bodyMeasurement: BodyMeasurement | null;
  bodyMeasurements: BodyMeasurement[] | null;
  setLog: SetLog | null;
  loading: boolean;
  error: unknown;
}

const initialState: UserWorkoutState = {
  workout: null,
  workouts: [],
  workoutExercise: null,
  workoutLog: null,
  workoutLogs: [],
  workoutSet: null,
  exercise: null,
  exercises: [],
  currentWorkout: null,
  workoutCountData: null,
  workoutMaxWeights: null,
  bodyMeasurement: null,
  bodyMeasurements: [],
  data: null,
  setLog: null,
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

    // startWorkout
    builder
      .addCase(startWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutLog = action.payload;
      })
      .addCase(startWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //fetchAllWorkoutLogsByUser
    builder
      .addCase(fetchAllWorkoutLogsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWorkoutLogsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutLogs = action.payload;
      })
      .addCase(fetchAllWorkoutLogsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //deleteWorkoutLog
    builder
      .addCase(deleteWorkoutLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkoutLog.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteWorkoutLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //fetchCurrentWorkout
    builder
      .addCase(fetchCurrentWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkout = action.payload;
      })
      .addCase(fetchCurrentWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //completeWorkout
    builder
      .addCase(completeWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeWorkout.fulfilled, (state) => {
        state.loading = false;
        state.currentWorkout = null;
      })
      .addCase(completeWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //cancelWorkout
    builder
      .addCase(cancelWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelWorkout.fulfilled, (state) => {
        state.loading = false;
        state.currentWorkout = null;
      })
      .addCase(cancelWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //completeSetLog
    builder
      .addCase(completeSetLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeSetLog.fulfilled, (state, action) => {
        state.loading = false;
        state.setLog = action.payload;
      })
      .addCase(completeSetLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //uncompleteSetLog
    builder
      .addCase(uncompleteSetLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uncompleteSetLog.fulfilled, (state, action) => {
        state.loading = false;
        state.setLog = action.payload;
      })
      .addCase(uncompleteSetLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //fetchWorkoutVolume
    builder
      .addCase(fetchWorkoutVolume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkoutVolume.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWorkoutVolume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //fetchWorkoutCount
    builder
      .addCase(fetchWorkoutCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkoutCount.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutCountData = action.payload;
      })
      .addCase(fetchWorkoutCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //fetchWorkoutMaxWeights

    builder
      .addCase(fetchWorkoutMaxWeights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkoutMaxWeights.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutMaxWeights = action.payload;
      })
      .addCase(fetchWorkoutMaxWeights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //addHeightAndWeight
    builder
      .addCase(addHeightAndWeight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHeightAndWeight.fulfilled, (state, action) => {
        state.loading = false;
        state.bodyMeasurement = action.payload;
      })
      .addCase(addHeightAndWeight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //fetchUserBodyMeasurements
    builder
      .addCase(fetchUserBodyMeasurements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBodyMeasurements.fulfilled, (state, action) => {
        state.loading = false;
        state.bodyMeasurements = action.payload;
      })
      .addCase(fetchUserBodyMeasurements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //updateBodyMeasurement
    builder
      .addCase(updateBodyMeasurement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBodyMeasurement.fulfilled, (state, action) => {
        state.loading = false;
        state.bodyMeasurement = action.payload;
      })
      .addCase(updateBodyMeasurement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //deleteBodyMeasurement
    builder
      .addCase(deleteBodyMeasurement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBodyMeasurement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBodyMeasurement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userWorkoutSlice.reducer;
