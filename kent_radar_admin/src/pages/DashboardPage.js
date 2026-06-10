import React, { useEffect, useState } from 'react';
import { FiTrendingUp, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { statisticsAPI } from '../services/api';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [dashboardRes, categoryRes, districtRes, statusRes] = await Promise.all([
        statisticsAPI.getDashboard(),
        statisticsAPI.getReportsByCategory('month'),
        statisticsAPI.getReportsByDistrict('month'),
        statisticsAPI.getReportsByStatus(),
      ]);

      setDashboard(dashboardRes.data);

      // Prepare chart data
      setChartData({
        category: categoryRes.data,
        district: districtRes.data,
        status: statusRes.data,
      });
    } catch (error) {
      toast.error('Dashboard verileri yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Hoş geldiniz! Sistem genel görünümü aşağıdadır.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Reports */}
        <StatCard
          icon={<FiAlertCircle className="text-2xl" />}
          title="Toplam İhbar"
          value={dashboard?.total_reports || 0}
          bgColor="bg-red-50"
          iconColor="text-red-600"
        />

        {/* Resolved */}
        <StatCard
          icon={<FiCheckCircle className="text-2xl" />}
          title="Çözülen"
          value={dashboard?.resolved_reports || 0}
          bgColor="bg-green-50"
          iconColor="text-green-600"
        />

        {/* In Progress */}
        <StatCard
          icon={<FiTrendingUp className="text-2xl" />}
          title="İşlemde"
          value={dashboard?.in_progress_reports || 0}
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
        />

        {/* Pending */}
        <StatCard
          icon={<FiClock className="text-2xl" />}
          title="Beklemede"
          value={dashboard?.pending_reports || 0}
          bgColor="bg-yellow-50"
          iconColor="text-yellow-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        {chartData?.category && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Kategorilere Göre İhbarlar</h2>
            <Bar data={chartData.category} />
          </div>
        )}

        {/* Status Distribution */}
        {chartData?.status && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Duruma Göre İhbarlar</h2>
            <Doughnut data={chartData.status} />
          </div>
        )}
      </div>

      {/* District Distribution */}
      {chartData?.district && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-4">İlçelere Göre İhbarlar</h2>
          <Bar data={chartData.district} />
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, title, value, bgColor, iconColor }) => (
  <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
      </div>
      <div className={`${iconColor} opacity-20`}>{icon}</div>
    </div>
  </div>
);

export default DashboardPage;
