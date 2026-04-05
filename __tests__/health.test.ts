jest.mock('react-native', () => ({
  Platform: { OS: 'ios' },
}));

jest.mock('react', () => ({
  useState: jest.fn((init) => [typeof init === 'function' ? init() : init, jest.fn()]),
  useEffect: jest.fn((fn) => fn()),
  useCallback: jest.fn((fn) => fn),
}));

describe('useHealth', () => {
  const { useHealth } = require('../src/hooks/useHealth');

  it('returns health data fields', () => {
    const result = useHealth();

    expect(result).toHaveProperty('steps');
    expect(result).toHaveProperty('calories');
    expect(result).toHaveProperty('distance');
    expect(result).toHaveProperty('heartRate');
    expect(result).toHaveProperty('activeMinutes');
    expect(result).toHaveProperty('isLoading');
    expect(result).toHaveProperty('syncData');
    expect(result).toHaveProperty('refetch');
  });

  it('getGoalProgress returns correct ratio', () => {
    const result = useHealth();
    // Default data has steps: 0 (from initial state)
    const progress = result.getGoalProgress('steps', 10000);
    expect(progress).toBeGreaterThanOrEqual(0);
    expect(progress).toBeLessThanOrEqual(1);
  });

  it('getGoalProgress returns 0 for zero target', () => {
    const result = useHealth();
    const progress = result.getGoalProgress('steps', 0);
    expect(progress).toBe(0);
  });

  it('getDailySummary returns formatted string', () => {
    const result = useHealth();
    const summary = result.getDailySummary();
    expect(typeof summary).toBe('string');
    expect(summary).toContain('steps');
    expect(summary).toContain('cal');
    expect(summary).toContain('km');
  });
});
