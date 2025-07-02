// src/tests/stores/auth.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../../stores/auth';

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: vi.fn(),
        removeItem: vi.fn(),
        getItem: vi.fn(),
      },
      writable: true,
    });
  });

  it('should have initial state correctly', () => {
    const auth = useAuthStore();
    expect(auth.user).toBeNull();
    expect(auth.isAuthenticated).toBe(false);
    expect(auth.token).toBeNull();
  });

  it('should set isAuthenticated and user after successful login', async () => {
    const auth = useAuthStore();
    // Mock fetch API call
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: { id: 1, name: 'Test User' }, token: 'fake-token' }),
      })
    );

    const result = await auth.login({ username: 'test', password: 'password' });

    expect(result).toBe(true);
    expect(auth.isAuthenticated).toBe(true);
    expect(auth.user).toEqual({ id: 1, name: 'Test User' });
    expect(auth.token).toBe('fake-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('userToken', 'fake-token');
  });

  it('should clear state and remove token on logout', () => {
    const auth = useAuthStore();
    auth.user = { id: 1, name: 'Test User' };
    auth.isAuthenticated = true;
    auth.token = 'some-token';

    auth.logout();

    expect(auth.user).toBeNull();
    expect(auth.isAuthenticated).toBe(false);
    expect(auth.token).toBeNull();
    expect(localStorage.removeItem).toHaveBeenCalledWith('userToken');
  });

  it('should load user from token if present in localStorage', () => {
    const auth = useAuthStore();
    localStorage.getItem.mockReturnValue('existing-token'); // Mock existing token

    auth.loadUserFromToken();

    expect(auth.token).toBe('existing-token');
    expect(auth.isAuthenticated).toBe(true);
    // Jika ada logika decodeToken, bisa diuji di sini juga
  });
});