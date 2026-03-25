import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import { HealthData, HealthMetric } from '../types';

/**
 * Custom hook for health data integration
 * Supports HealthKit (iOS) and Google Fit (Android)
 */
export function useHealth() {
  const [data, setData] = useState<HealthData>({
    steps: 0,
    calories: 0,
    distance: 0,
    heartRate: 0,
    activeMinutes: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const fetchHealthData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Platform-specific health data fetching
      if (Platform.OS === 'ios') {
        // HealthKit integration
        const healthKitData = await fetchFromHealthKit();
        setData(healthKitData);
      } else {
        // Google Fit integration
        const googleFitData = await fetchFromGoogleFit();
        setData(googleFitData);
      }

      setLastSynced(new Date());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch health data'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const syncData = useCallback(async () => {
    await fetchHealthData();
  }, [fetchHealthData]);

  useEffect(() => {
    fetchHealthData();

    // Set up background sync interval
    const interval = setInterval(fetchHealthData, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [fetchHealthData]);

  const getGoalProgress = useCallback(
    (metric: keyof HealthData, target: number): number => {
      if (target <= 0) return 0;
      const current = data[metric];
      return Math.min(current / target, 1);
    },
    [data]
  );

  const getDailySummary = useCallback((): string => {
    return `${data.steps} steps, ${data.calories} cal, ${data.distance} km`;
  }, [data]);

  return {
    ...data,
    isLoading,
    error,
    lastSynced,
    syncData,
    refetch: fetchHealthData,
    getGoalProgress,
    getDailySummary,
  };
}

// Placeholder functions - implement with actual SDK
async function fetchFromHealthKit(): Promise<HealthData> {
  // Implementation with react-native-health
  return {
    steps: 8432,
    calories: 420,
    distance: 5.2,
    heartRate: 72,
    activeMinutes: 45,
  };
}

async function fetchFromGoogleFit(): Promise<HealthData> {
  // Implementation with react-native-google-fit
  return {
    steps: 8432,
    calories: 420,
    distance: 5.2,
    heartRate: 72,
    activeMinutes: 45,
  };
}
