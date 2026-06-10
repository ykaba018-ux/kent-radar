import { create } from 'zustand';

const useReportStore = create((set) => ({
  reports: [],
  selectedReport: null,
  filters: {
    status: 'all',
    category: 'all',
    district: 'all',
    searchText: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },

  setReports: (reports) => set({ reports }),
  setSelectedReport: (report) => set({ selectedReport: report }),
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
    pagination: { ...state.pagination, page: 1 },
  })),
  setPagination: (pagination) => set((state) => ({
    pagination: { ...state.pagination, ...pagination },
  })),
  resetFilters: () => set({
    filters: {
      status: 'all',
      category: 'all',
      district: 'all',
      searchText: '',
    },
    pagination: { page: 1, limit: 10, total: 0 },
  }),
}));

export default useReportStore;
