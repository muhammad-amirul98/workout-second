import { User } from "./UserTypes";

export interface Workout {
  id: number;
  name: string;
  user?: User;
  type: string;
  createdOn: string;
  workoutLogs?: WorkoutLog[];
  totalWeightLifted?: number;
  isEditing?: boolean;
  duration?: string;
  workoutExercises?: WorkoutExercise[];
}

export interface WorkoutExercise {
  id: number;
  exercise: Exercise;
  workout: Workout;
  workoutSets: WorkoutSet[];
}

export interface Exercise {
  id: number;
  name: string;
  type: string;
  description: string;
  images?: string[];
  workouts?: Workout[];
  sets?: WorkoutSet[];
}

export interface WorkoutSet {
  id: number;
  setNumber: number;
  reps: number;
  weight: number;
  exercise: Exercise;
  actualReps?: number;
  actualWeight?: number;
}

export interface WorkoutLog {
  id?: number;
  workout: Workout;
  timeStarted: string;
  timeCompleted?: string;
  exerciseLogs: ExerciseLog[];
  workoutStatus: string;
  totalWeightLifted?: number;
}

export interface ExerciseLog {
  id?: number;
  exercise: Exercise;
  workoutLog?: WorkoutLog;
  timeStarted?: string;
  timeCompleted?: string;
  setLogs?: SetLog[];
}

export interface SetLog {
  id?: number;
  reps?: number;
  weight?: number;
  exerciseLog?: ExerciseLog;
  timeStarted: string;
  timeCompleted?: string;
}

export interface CreateExerciseRequest {
  name: string;
  type: string;
  description: string;
  images?: string[];
}

export interface UpdateExerciseRequest extends CreateExerciseRequest {
  id?: number;
}

export interface CreateWorkoutRequest {
  name: string;
  type: string;
}

export interface UpdateWorkoutRequest extends CreateWorkoutRequest {
  id?: number;
}

export interface CreateSetRequest {
  setNumber: number;
  plannedReps: number;
  plannedWeight: number;
}

export interface UpdateWorkoutSetRequest extends CreateSetRequest {
  id?: number;
}
