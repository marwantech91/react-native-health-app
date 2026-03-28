/**
 * Health data types
 */

export interface HealthData {
  steps: number;
  calories: number;
  distance: number;
  heartRate: number;
  activeMinutes: number;
}

export interface HealthMetric {
  value: number;
  unit: string;
  timestamp: Date;
  source: 'healthkit' | 'googlefit' | 'manual';
}

export interface DailyHealthSummary {
  date: string;
  steps: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  sleepHours: number;
  waterIntake: number;
}

export interface HealthGoal {
  id: string;
  type: 'steps' | 'calories' | 'distance' | 'activeMinutes' | 'water';
  target: number;
  current: number;
  unit: string;
}

/**
 * User types
 */

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  units: 'metric' | 'imperial';
  notifications: boolean;
  darkMode: 'system' | 'light' | 'dark';
  dailyGoals: {
    steps: number;
    calories: number;
    water: number;
  };
}

/**
 * Navigation types
 */

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Activity: undefined;
  Profile: undefined;
  Settings: undefined;
};

/**
 * API types
 */

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface SyncStatus {
  lastSynced: Date | null;
  pendingChanges: number;
  isSyncing: boolean;
}

/**
 * Workout types
 */

export type WorkoutType = 'running' | 'walking' | 'cycling' | 'swimming' | 'strength' | 'yoga' | 'other';

export interface Workout {
  id: string;
  type: WorkoutType;
  startTime: Date;
  endTime: Date;
  calories: number;
  distance?: number;
  heartRateAvg?: number;
  notes?: string;
}

/**
 * Calculate workout duration in minutes
 */
export function getWorkoutDuration(workout: Workout): number {
  return (workout.endTime.getTime() - workout.startTime.getTime()) / 60000;
}

export function isGoalMet(goal: HealthGoal): boolean {
  return goal.current >= goal.target;
}

export function goalProgress(goal: HealthGoal): number {
  return Math.min(1, goal.current / goal.target);
}

/** Calculate remaining amount needed to reach a health goal */
export function goalRemaining(goal: HealthGoal): number {
  return Math.max(0, goal.target - goal.current);
}
