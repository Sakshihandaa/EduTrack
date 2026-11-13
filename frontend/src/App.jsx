import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import OverviewSection from './components/OverviewSection';
import MlInsightsSection from './components/MlInsightsSection';
import StudentPredictionSection from './components/StudentPredictionSection';
import { RefreshCw, AlertCircle, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [overviewData, setOverviewData] = useState(null);
  const [mlData, setMlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [resOverview, resMl] = await Promise.all([
        fetch('/api/overview'),
        fetch('/api/ml-insights')
      ]);

      if (!resOverview.ok || !resMl.ok) {
        throw new Error('Failed to load application data from backend.');
      }

      const dataOverview = await resOverview.json();
      const dataMl = await resMl.json();

      setOverviewData(dataOverview);
      setMlData(dataMl);
    } catch (err) {
      console.error('Data load error:', err);
      setError('Unable to connect to the EduTrack AI FastAPI service (http://127.0.0.1:8000). Ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  return (
    <div className="min-h-screen bg-warm-50 text-stone-800 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalStudents={overviewData?.totalStudents}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center space-x-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={fetchAppData}
              className="ml-4 px-3 py-1.5 rounded-lg bg-rose-700 text-white font-semibold hover:bg-rose-800 transition-colors flex items-center space-x-1 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {/* Tab Views */}
        {activeTab === 'overview' && (
          <OverviewSection data={overviewData} loading={loading} />
        )}

        {activeTab === 'insights' && (
          <MlInsightsSection data={mlData} loading={loading} />
        )}

        {activeTab === 'prediction' && (
          <StudentPredictionSection />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-warm-200 mt-16 py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-stone-800">EduTrack AI</span>
            <span>&bull;</span>
            <span>Machine Learning Student Performance Analysis & Early Warning Project</span>
          </div>
          <div className="flex items-center space-x-4 text-stone-400">
            <span>FastAPI Backend</span>
            <span>&bull;</span>
            <span>Scikit-Learn ML Models</span>
            <span>&bull;</span>
            <span>React + Vite + Tailwind CSS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
