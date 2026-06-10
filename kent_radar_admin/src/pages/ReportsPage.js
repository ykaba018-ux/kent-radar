import React, { useEffect, useState } from 'react';
import { FiSearch, FiFilter, FiChevronDown, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import { reportsAPI } from '../services/api';
import useReportStore from '../store/reportStore';
import toast from 'react-hot-toast';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const { filters, pagination, setFilters, setPagination } = useReportStore();

  useEffect(() => {
    fetchReports();
  }, [filters, pagination.page]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const { data } = await reportsAPI.getAll({
        status: filters.status !== 'all' ? filters.status : undefined,
        category: filters.category !== 'all' ? filters.category : undefined,
        district: filters.district !== 'all' ? filters.district : undefined,
        search: filters.searchText || undefined,
        page: pagination.page,
        limit: pagination.limit,
      });
      setReports(data.data);
      setPagination({ total: data.total });
    } catch (error) {
      toast.error('İhbarlar yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      received: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Alındı' },
      assigned: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Atandı' },
      in_progress: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'İşlemde' },
      resolved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Çözüldü' },
      closed: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Kapatıldı' },
    };
    const s = statusMap[status] || statusMap.received;
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${s.bg} ${s.text}`}>{s.label}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">İhbarlar</h1>
        <p className="text-gray-600 mt-2">Tüm şehir ihbarlarını yönetin ve takip edin.</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Arama..."
                value={filters.searchText}
                onChange={(e) => setFilters({ searchText: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="received">Alındı</option>
            <option value="assigned">Atandı</option>
            <option value="in_progress">İşlemde</option>
            <option value="resolved">Çözüldü</option>
            <option value="closed">Kapatıldı</option>
          </select>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => setFilters({ category: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">Tüm Kategoriler</option>
            <option value="pothole">Çukur</option>
            <option value="lighting">Aydınlatma</option>
            <option value="tree">Ağaç</option>
            <option value="sanitation">Temizlik</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Başlık</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Kategori</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Durum</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tarih</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Yükleniyor...
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    İhbar bulunamadı
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700">#{report.report_number}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{report.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{report.category_name}</td>
                    <td className="px-6 py-4 text-sm">{getStatusBadge(report.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(report.created_at).toLocaleDateString('tr-TR')}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" title="Görüntüle">
                        <FiEye />
                      </button>
                      <button className="text-green-600 hover:text-green-800" title="Düzenle">
                        <FiEdit />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Toplam: <span className="font-medium">{pagination.total}</span> ihbar
          </p>
          <div className="space-x-2">
            <button
              onClick={() => setPagination({ page: Math.max(1, pagination.page - 1) })}
              disabled={pagination.page === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Önceki
            </button>
            <button
              onClick={() => setPagination({ page: pagination.page + 1 })}
              disabled={pagination.page * pagination.limit >= pagination.total}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sonraki
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
