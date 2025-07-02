// src/tests/stores/ukm.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUKMStore } from '../../stores/ukm';
import * as api from '../../services/api'; // Import your API functions to mock them

// Mock API functions
vi.mock('../../services/api', () => ({
  fetchUKMs: vi.fn(),
  fetchUKMById: vi.fn(),
  registerUKM: vi.fn(),
}));

describe('UKM Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  it('should have initial state correctly', () => {
    const ukmStore = useUKMStore();
    expect(ukmStore.ukms).toEqual([]);
    expect(ukmStore.currentUKM).toBeNull();
    expect(ukmStore.loading).toBe(false);
    expect(ukmStore.error).toBeNull();
  });

  it('should load UKMs successfully', async () => {
    const ukmStore = useUKMStore();
    const mockUKMs = [{ id: 1, name: 'UKM A' }, { id: 2, name: 'UKM B' }];
    api.fetchUKMs.mockResolvedValue(mockUKMs); // Mock successful API call

    await ukmStore.loadUKMs();

    expect(ukmStore.loading).toBe(false);
    expect(ukmStore.error).toBeNull();
    expect(ukmStore.ukms).toEqual(mockUKMs);
    expect(api.fetchUKMs).toHaveBeenCalledTimes(1);
  });

  it('should handle error when loading UKMs', async () => {
    const ukmStore = useUKMStore();
    const errorMessage = 'Network error';
    api.fetchUKMs.mockRejectedValue(new Error(errorMessage)); // Mock failed API call

    await ukmStore.loadUKMs();

    expect(ukmStore.loading).toBe(false);
    expect(ukmStore.error).toContain(errorMessage);
    expect(ukmStore.ukms).toEqual([]);
    expect(api.fetchUKMs).toHaveBeenCalledTimes(1);
  });

  it('should load UKM detail successfully', async () => {
    const ukmStore = useUKMStore();
    const mockUKM = { id: 1, name: 'UKM A', description: 'Desc A' };
    api.fetchUKMById.mockResolvedValue(mockUKM);

    await ukmStore.loadUKMDetail(1);

    expect(ukmStore.loading).toBe(false);
    expect(ukmStore.error).toBeNull();
    expect(ukmStore.currentUKM).toEqual(mockUKM);
    expect(api.fetchUKMById).toHaveBeenCalledWith(1);
  });

  it('should handle error when loading UKM detail', async () => {
    const ukmStore = useUKMStore();
    const errorMessage = 'UKM not found';
    api.fetchUKMById.mockRejectedValue(new Error(errorMessage));

    await ukmStore.loadUKMDetail(99);

    expect(ukmStore.loading).toBe(false);
    expect(ukmStore.error).toContain(errorMessage);
    expect(ukmStore.currentUKM).toBeNull();
    expect(api.fetchUKMById).toHaveBeenCalledWith(99);
  });

  it('should submit UKM registration successfully', async () => {
    const ukmStore = useUKMStore();
    const registrationData = { name: 'New UKM', description: 'New Desc' };
    const apiResponse = { id: 4, ...registrationData };
    api.registerUKM.mockResolvedValue(apiResponse);

    const result = await ukmStore.submitUKMRegistration(registrationData);

    expect(ukmStore.loading).toBe(false);
    expect(ukmStore.error).toBeNull();
    expect(result).toEqual(apiResponse);
    expect(api.registerUKM).toHaveBeenCalledWith(registrationData);
  });

  it('should handle error when submitting UKM registration', async () => {
    const ukmStore = useUKMStore();
    const registrationData = { name: 'New UKM', description: 'New Desc' };
    const errorMessage = 'Registration failed';
    api.registerUKM.mockRejectedValue(new Error(errorMessage));

    await expect(ukmStore.submitUKMRegistration(registrationData)).rejects.toThrow(errorMessage);

    expect(ukmStore.loading).toBe(false);
    expect(ukmStore.error).toContain(errorMessage);
    expect(api.registerUKM).toHaveBeenCalledWith(registrationData);
  });
});