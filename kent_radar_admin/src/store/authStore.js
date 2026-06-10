import { create } from 'zustand';

const useAuthStore = create((set) => ({
  admin: null,
  token: localStorage.getItem('admin_token') || null,
  isAuthenticated: !!localStorage.getItem('admin_token'),
  isLoading: false,
  error: null,

  setAdmin: (admin) => set({ admin }),
  setToken: (token) => {
    localStorage.setItem('admin_token', token);
    set({ token, isAuthenticated: true });
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  logout: () => {
    localStorage.removeItem('admin_token');
    set({ admin: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
