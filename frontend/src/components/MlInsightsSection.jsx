import React, { useState } from 'react';
import {
  BrainCircuit,
  ShieldAlert,
  GitBranch,
  Layers,
  Sparkles,
  Award,
  BarChart2,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell
} from 'recharts';

export default function MlInsightsSection({ data, loading }) {
  const [selectedConfusionModel, setSelectedConfusionModel] = useState('Random Forest');

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[450px]">
        <div className="flex flex-col items-center space-y-3 text-stone-500">
          <div className="w-9 h-9 border-3 border-forest-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Computing machine learning insights...</p>
        </div>
      </div>
    );
  }

  const { clustering, classification, correlation } = data;
  const { elbowData, clusterProfiles, pcaScatter, optimalK } = clustering;
  const { modelComparison, evalResults, leakageAnalysis, featureImportance } = classification;

  // Selected confusion matrix
  const currentEval = evalResults[selectedConfusionModel] || evalResults['Random Forest'];
  const confusionMatrix = currentEval?.confusionMatrix || [[0, 0, 0, 0]];

  const clusterColors = ['#1b4332', '#52b788', '#d4a373'];

  return (
    <div className="space-y-10 animate-fadeIn">

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-warm-200 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-forest-100 text-forest-800 border border-forest-300/60 mb-3">
            <Cpu className="w-3.5 h-3.5 text-forest-700" />
            <span>Rigorous Machine Learning Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            Model Benchmarks, Clustering & Feature Attribution
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Evaluation across supervised classifiers (Random Forest, Decision Tree, Logistic Regression) and unsupervised student profiling via K-Means clustering. Designed with strict data leakage isolation to deliver early-warning predictions prior to final exams.
          </p>
        </div>
      </div>

      {/* Data Leakage Prevention Highlight Banner */}
      <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold text-amber-950">
                {leakageAnalysis.title}
              </h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900">
                Methodological Integrity Guard
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
              {leakageAnalysis.explanation}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/80 p-3 rounded-lg border border-amber-200 text-xs">
                <p className="text-stone-500 font-medium">ExamScore Correlation</p>
                <p className="text-lg font-bold text-rose-700">{leakageAnalysis.examScoreCorrelation}</p>
                <p className="text-[10px] text-stone-400">Direct target generator</p>
              </div>
              <div className="bg-white/80 p-3 rounded-lg border border-amber-200 text-xs">
                <p className="text-stone-500 font-medium">With ExamScore (Leaked)</p>
                <p className="text-lg font-bold text-stone-600">{leakageAnalysis.postExamAccuracy}% Acc</p>
                <p className="text-[10px] text-stone-400">Trivial / Unusable early warning</p>
              </div>
              <div className="bg-white/90 p-3 rounded-lg border border-forest-300 text-xs shadow-xs">
                <p className="text-forest-800 font-semibold">Pre-Exam Early-Warning (Real)</p>
                <p className="text-lg font-bold text-forest-700">{leakageAnalysis.preExamAccuracy}% Acc</p>
                <p className="text-[10px] text-forest-600 font-medium">Genuine actionable early intervention</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Benchmark & Comparison Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-warm-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-warm-200 pb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Supervised Classification Benchmark</h2>
            <p className="text-xs text-stone-500">Comparative test-set evaluation across 2,801 held-out student records</p>
          </div>
          <span className="text-xs font-semibold text-forest-800 bg-forest-50 px-3 py-1.5 rounded-lg border border-forest-200 self-start sm:self-auto">
            Random Forest: Champion Model
          </span>
        </div>

        {/* Model Comparison Bar Chart */}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={modelComparison} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe1" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#78716c', fontSize: 12, fontWeight: 600 }} />
              <YAxis unit="%" domain={[0, 100]} tick={{ fill: '#78716c', fontSize: 11 }} />
              <Tooltip
                formatter={(val) => [`${val}%`, '']}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="accuracy" name="Accuracy" fill="#1b4332" radius={[4, 4, 0, 0]} />
              <Bar dataKey="f1" name="F1 Score (Weighted)" fill="#52b788" radius={[4, 4, 0, 0]} />
              <Bar dataKey="precision" name="Precision" fill="#d4a373" radius={[4, 4, 0, 0]} />
              <Bar dataKey="recall" name="Recall" fill="#a89475" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Metrics Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-warm-200 bg-warm-50 text-stone-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Classifier</th>
                <th className="py-3 px-3">Architecture Type</th>
                <th className="py-3 px-3">Accuracy</th>
                <th className="py-3 px-3">Weighted F1</th>
                <th className="py-3 px-3">Macro F1</th>
                <th className="py-3 px-3">Weighted Precision</th>
                <th className="py-3 px-3">Weighted Recall</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100">
              {modelComparison.map((m) => {
                const isBest = m.isBest;
                const fullMetric = evalResults[m.name];
                return (
                  <tr key={m.name} className={isBest ? 'bg-forest-50/40 font-semibold' : 'hover:bg-warm-50/50'}>
                    <td className="py-3.5 px-4 font-bold text-stone-900 flex items-center space-x-2">
                      {isBest && <Award className="w-4 h-4 text-forest-700" />}
                      <span>{m.name}</span>
                    </td>
                    <td className="py-3.5 px-3 text-stone-600">{m.type}</td>
                    <td className="py-3.5 px-3 font-bold text-forest-800">{m.accuracy}%</td>
                    <td className="py-3.5 px-3 text-stone-800">{m.f1}%</td>
                    <td className="py-3.5 px-3 text-stone-600">{(fullMetric?.f1Macro * 100).toFixed(2)}%</td>
                    <td className="py-3.5 px-3 text-stone-600">{m.precision}%</td>
                    <td className="py-3.5 px-3 text-stone-600">{m.recall}%</td>
                    <td className="py-3.5 px-3">
                      {isBest ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-forest-100 text-forest-900 border border-forest-300">
                          Selected Champion
                        </span>
                      ) : (
                        <span className="text-stone-400 text-[11px]">Baseline</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Importance & Confusion Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Feature Importance */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-warm-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-warm-200 pb-3">
            <div>
              <h2 className="text-base font-bold text-stone-900">Pre-Exam Feature Importance Ranking</h2>
              <p className="text-xs text-stone-500">Gini Impurity Reduction in Random Forest (sum = 100%)</p>
            </div>
            <span className="text-xs text-stone-500 font-medium">14 Pre-Exam Features</span>
          </div>
          
          <div className="space-y-2.5 pt-2">
            {featureImportance.slice(0, 8).map((f, i) => {
              const pct = (f.rfImportance * 100).toFixed(1);
              return (
                <div key={f.feature} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-stone-800 flex items-center space-x-1.5">
                      <span className="w-4 text-stone-400 font-mono text-[10px]">{i + 1}.</span>
                      <span>{f.feature}</span>
                    </span>
                    <span className="font-bold text-forest-800">{pct}%</span>
                  </div>
                  <div className="w-full bg-warm-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-forest-700 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, f.rfImportance * 450)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-stone-400 pt-2 border-t border-warm-200">
            Coursework engagement (Assignment Completion, Attendance, Study Hours) constitutes over 45% of the total predictive power.
          </p>
        </div>

        {/* Confusion Matrix Heatmap */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-warm-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-warm-200 pb-3">
              <div>
                <h2 className="text-base font-bold text-stone-900">Confusion Matrix Heatmap</h2>
                <p className="text-xs text-stone-500">Predicted vs Actual Test-Set Grades</p>
              </div>
              <select
                value={selectedConfusionModel}
                onChange={(e) => setSelectedConfusionModel(e.target.value)}
                className="text-xs font-semibold bg-warm-50 border border-warm-300 rounded-lg px-2.5 py-1 text-stone-800 focus:outline-none focus:ring-1 focus:ring-forest-600"
              >
                <option value="Random Forest">Random Forest</option>
                <option value="Decision Tree">Decision Tree</option>
                <option value="Logistic Regression">Logistic Regression</option>
              </select>
            </div>

            {/* Matrix Grid */}
            <div className="pt-4">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider text-center mb-2">
                Predicted Grade &rarr;
              </div>
              <div className="flex items-center">
                <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider [writing-mode:vertical-lr] rotate-180 text-center mr-2">
                  Actual Grade &rarr;
                </div>
                <div className="flex-1 grid grid-cols-4 gap-1.5 text-center text-xs">
                  {/* Header */}
                  {['A', 'B', 'C', 'D'].map((g) => (
                    <div key={g} className="font-bold text-stone-600 py-1 bg-warm-100 rounded">
                      {g}
                    </div>
                  ))}
                  {/* Cells */}
                  {confusionMatrix.map((row, rIdx) =>
                    row.map((val, cIdx) => {
                      const isDiagonal = rIdx === cIdx;
                      const maxVal = 800;
                      const intensity = Math.min(1, val / maxVal);
                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className={`py-3 px-1 rounded font-bold transition-all ${
                            isDiagonal
                              ? 'bg-forest-700 text-white shadow-xs'
                              : val > 50
                              ? 'bg-forest-100 text-forest-900'
                              : 'bg-warm-50 text-stone-500'
                          }`}
                        >
                          <p className="text-sm font-extrabold">{val}</p>
                          <p className="text-[9px] font-medium opacity-80">
                            {isDiagonal ? 'Hit' : 'Error'}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-stone-500 pt-3 border-t border-warm-200">
            Selected Model Accuracy: <strong className="text-forest-800">{(currentEval?.accuracy * 100).toFixed(2)}%</strong> across 4 academic tiers.
          </div>
        </div>

      </div>

      {/* K-Means Clustering & Unsupervised Discovery */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-warm-200 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-warm-200 pb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Unsupervised Student Segmentation (K-Means)</h2>
            <p className="text-xs text-stone-500">StandardScaler normalized features, Elbow Method & Silhouette validation</p>
          </div>
          <span className="text-xs font-semibold text-forest-800 bg-forest-50 px-3 py-1.5 rounded-lg border border-forest-200 self-start sm:self-auto">
            Optimal: k = {optimalK} Clusters
          </span>
        </div>

        {/* Elbow Curve & Silhouette Line Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Elbow Inertia */}
          <div className="border border-warm-200 rounded-xl p-5 bg-warm-50/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-stone-800">Elbow Method (Inertia Curve)</h3>
                <p className="text-[11px] text-stone-500">Sum of squared distances for k = 2 to 8</p>
              </div>
              <span className="text-[11px] font-mono font-bold text-forest-800 bg-white px-2 py-0.5 rounded border border-warm-200">
                Elbow at k=3
              </span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={elbowData} margin={{ top: 10, right: 15, left: -5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="k" name="k" tick={{ fill: '#78716c', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#78716c', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '12px' }}
                    formatter={(val) => [val.toLocaleString(), 'Inertia']}
                  />
                  <Line type="monotone" dataKey="inertia" stroke="#1b4332" strokeWidth={2.5} dot={{ r: 4, fill: '#1b4332' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Silhouette Score */}
          <div className="border border-warm-200 rounded-xl p-5 bg-warm-50/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-stone-800">Silhouette Coefficient</h3>
                <p className="text-[11px] text-stone-500">Cluster separation metric (peak indicates best cohesion)</p>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-warm-200">
                Peak: 0.0908 (k=3)
              </span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={elbowData} margin={{ top: 10, right: 15, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="k" name="k" tick={{ fill: '#78716c', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#78716c', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '12px' }}
                    formatter={(val) => [val, 'Silhouette Score']}
                  />
                  <Line type="monotone" dataKey="silhouette" stroke="#52b788" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 4, fill: '#52b788' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Cluster Profiles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {clusterProfiles.map((cp, idx) => (
            <div
              key={cp.clusterId}
              className="bg-white rounded-xl p-5 border border-warm-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: clusterColors[idx] }}>
                    Cluster {cp.clusterId}
                  </span>
                  <span className="text-xs font-semibold text-stone-500">
                    {cp.count.toLocaleString()} students ({cp.percentage}%)
                  </span>
                </div>
                <h3 className="font-bold text-stone-900 text-sm mb-3">{cp.name}</h3>
                
                <div className="space-y-2 text-xs text-stone-600 bg-warm-50 p-3 rounded-lg border border-warm-200">
                  <div className="flex justify-between">
                    <span>Avg Study Hours:</span>
                    <strong className="text-stone-900">{cp.avgStudyHours} hrs/wk</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Attendance:</span>
                    <strong className="text-stone-900">{cp.avgAttendance}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Assignment Completion:</span>
                    <strong className="text-stone-900">{cp.avgAssignment}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Stress Level:</span>
                    <strong className="text-stone-900">{cp.avgStressLevel} / 2.0</strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-warm-200">
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Grade Breakdown</p>
                <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                  {Object.entries(cp.gradeDistribution).map(([grName, cnt]) => (
                    <div key={grName} className="bg-warm-100/70 p-1 rounded">
                      <p className="text-stone-500 font-medium">{grName.replace('Grade ', '')}</p>
                      <p className="font-bold text-stone-800">{cnt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2D PCA Cluster Projection */}
        <div className="border border-warm-200 rounded-xl p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">2D Principal Component Projection (PCA)</h3>
              <p className="text-xs text-stone-500">Dimensionality reduction of scaled pre-exam student feature vectors</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              {clusterProfiles.map((cp, idx) => (
                <span key={cp.clusterId} className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: clusterColors[idx] }}></span>
                  <span className="text-stone-600 font-medium">Cluster {cp.clusterId}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe1" />
                <XAxis type="number" dataKey="pca1" name="PCA Component 1" tick={{ fill: '#78716c', fontSize: 11 }} />
                <YAxis type="number" dataKey="pca2" name="PCA Component 2" tick={{ fill: '#78716c', fontSize: 11 }} />
                <ZAxis range={[30, 30]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border border-stone-200 rounded-lg shadow-md text-xs">
                          <p className="font-bold text-stone-900">{d.clusterName}</p>
                          <p className="text-stone-600">Grade: <strong>{d.grade}</strong> | Attendance: <strong>{d.attendance}%</strong></p>
                          <p className="text-stone-600">Study Hours: <strong>{d.studyHours}h</strong> | Exam Score: <strong>{d.examScore}</strong></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {[0, 1, 2].map((cId) => (
                  <Scatter
                    key={cId}
                    name={`Cluster ${cId}`}
                    data={pcaScatter?.filter(item => item.cluster === cId)}
                    fill={clusterColors[cId]}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
