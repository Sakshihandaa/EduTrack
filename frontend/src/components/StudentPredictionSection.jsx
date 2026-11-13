import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  CheckCircle,
  AlertTriangle,
  Info,
  RotateCcw,
  BookOpen,
  Calendar,
  Activity,
  Layers,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';

const PRESETS = {
  scholar: {
    label: 'High-Achieving Student (Honor Roll)',
    values: {
      StudyHours: 32,
      Attendance: 96,
      AssignmentCompletion: 95,
      OnlineCourses: 14,
      Age: 21,
      Resources: 2,
      Motivation: 2,
      StressLevel: 1,
      Extracurricular: 1,
      Internet: 1,
      Gender: 1,
      LearningStyle: 1,
      Discussions: 1,
      EduTech: 1,
      Model: 'Random Forest'
    }
  },
  balanced: {
    label: 'Typical Balanced Student',
    values: {
      StudyHours: 20,
      Attendance: 80,
      AssignmentCompletion: 75,
      OnlineCourses: 8,
      Age: 23,
      Resources: 1,
      Motivation: 1,
      StressLevel: 1,
      Extracurricular: 1,
      Internet: 1,
      Gender: 0,
      LearningStyle: 0,
      Discussions: 1,
      EduTech: 1,
      Model: 'Random Forest'
    }
  },
  atRisk: {
    label: 'At-Risk Early Warning Flag',
    values: {
      StudyHours: 8,
      Attendance: 62,
      AssignmentCompletion: 54,
      OnlineCourses: 2,
      Age: 24,
      Resources: 0,
      Motivation: 0,
      StressLevel: 2,
      Extracurricular: 0,
      Internet: 1,
      Gender: 0,
      LearningStyle: 2,
      Discussions: 0,
      EduTech: 0,
      Model: 'Random Forest'
    }
  },
  overloaded: {
    label: 'High Stress / Heavy Workload',
    values: {
      StudyHours: 36,
      Attendance: 78,
      AssignmentCompletion: 82,
      OnlineCourses: 18,
      Age: 22,
      Resources: 2,
      Motivation: 2,
      StressLevel: 2,
      Extracurricular: 1,
      Internet: 1,
      Gender: 1,
      LearningStyle: 3,
      Discussions: 1,
      EduTech: 1,
      Model: 'Random Forest'
    }
  }
};

export default function StudentPredictionSection() {
  const [formData, setFormData] = useState(PRESETS.scholar.values);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const applyPreset = (presetKey) => {
    const preset = PRESETS[presetKey];
    if (preset) {
      setFormData(preset.values);
      setResult(null);
    }
  };

  const handlePredict = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Prediction failed:', err);
      setError('Failed to reach backend prediction service. Ensure FastAPI server is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-warm-200 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-forest-100 text-forest-800 border border-forest-300/60 mb-3">
            <Zap className="w-3.5 h-3.5 text-forest-700" />
            <span>Real-Time Inference Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            Student Performance & Early Warning Prediction
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Input pre-exam student engagement and study metrics to obtain real-time machine learning predictions, class probability distributions, behavioral cluster mapping, and tailored pedagogical recommendations.
          </p>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="bg-warm-100/70 p-4 rounded-xl border border-warm-200 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-stone-700 uppercase tracking-wider mr-1 flex items-center space-x-1">
          <Sliders className="w-3.5 h-3.5 text-forest-700" />
          <span>Quick Presets:</span>
        </span>
        {Object.entries(PRESETS).map(([key, item]) => (
          <button
            key={key}
            type="button"
            onClick={() => applyPreset(key)}
            className="text-xs px-3 py-1.5 rounded-lg bg-white border border-warm-300 text-stone-700 font-medium hover:bg-forest-50 hover:text-forest-900 hover:border-forest-300 transition-all shadow-2xs"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Form & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Form Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-warm-200 shadow-sm">
          <form onSubmit={handlePredict} className="space-y-6">
            
            <div className="flex items-center justify-between border-b border-warm-200 pb-3">
              <h2 className="text-base font-bold text-stone-900">Student Profile & Engagement Parameters</h2>
              <button
                type="button"
                onClick={() => setFormData(PRESETS.scholar.values)}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center space-x-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Form</span>
              </button>
            </div>

            {/* Model Selector */}
            <div className="bg-warm-50 p-4 rounded-xl border border-warm-200 space-y-1.5">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Inference Classifier
              </label>
              <select
                value={formData.Model}
                onChange={(e) => handleInputChange('Model', e.target.value)}
                className="w-full bg-white border border-warm-300 rounded-lg px-3 py-2 text-sm text-stone-800 font-semibold focus:outline-none focus:ring-2 focus:ring-forest-600 shadow-2xs"
              >
                <option value="Random Forest">Random Forest (92.4% Accuracy - Recommended)</option>
                <option value="Decision Tree">Decision Tree (67.2% Accuracy)</option>
                <option value="Logistic Regression">Logistic Regression (28.1% Accuracy)</option>
              </select>
              <p className="text-[11px] text-stone-500">
                Random Forest captures multi-feature nonlinear interactions across student behaviors.
              </p>
            </div>

            {/* Core Sliders */}
            <div className="space-y-5">
              
              {/* Study Hours */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-800">Weekly Study Hours</span>
                  <span className="font-extrabold text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded border border-forest-200">
                    {formData.StudyHours} hours / week
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="45"
                  step="1"
                  value={formData.StudyHours}
                  onChange={(e) => handleInputChange('StudyHours', parseFloat(e.target.value))}
                  className="w-full accent-forest-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>5 hrs (Low)</span>
                  <span>20 hrs (Peer Mean)</span>
                  <span>45 hrs (Intensive)</span>
                </div>
              </div>

              {/* Attendance */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-800">Classroom Attendance</span>
                  <span className="font-extrabold text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded border border-forest-200">
                    {formData.Attendance}%
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  step="1"
                  value={formData.Attendance}
                  onChange={(e) => handleInputChange('Attendance', parseFloat(e.target.value))}
                  className="w-full accent-forest-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>60% (At Risk)</span>
                  <span>80% (Cohort Avg)</span>
                  <span>100% (Perfect)</span>
                </div>
              </div>

              {/* Assignment Completion */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-800">Assignment Completion Rate</span>
                  <span className="font-extrabold text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded border border-forest-200">
                    {formData.AssignmentCompletion}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={formData.AssignmentCompletion}
                  onChange={(e) => handleInputChange('AssignmentCompletion', parseFloat(e.target.value))}
                  className="w-full accent-forest-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>50% (Lagging)</span>
                  <span>75% (Target)</span>
                  <span>100% (Complete)</span>
                </div>
              </div>

              {/* Online Courses */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-800">Completed Online Courses / Modules</span>
                  <span className="font-extrabold text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded border border-forest-200">
                    {formData.OnlineCourses} modules
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={formData.OnlineCourses}
                  onChange={(e) => handleInputChange('OnlineCourses', parseInt(e.target.value))}
                  className="w-full accent-forest-700 cursor-pointer"
                />
              </div>

            </div>

            {/* Categorical & Discrete Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-warm-200">
              
              {/* Stress Level */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Perceived Stress Level</label>
                <select
                  value={formData.StressLevel}
                  onChange={(e) => handleInputChange('StressLevel', parseInt(e.target.value))}
                  className="w-full bg-white border border-warm-300 rounded-lg px-3 py-2 text-xs text-stone-800"
                >
                  <option value={0}>0 - Low Stress / Relaxed</option>
                  <option value={1}>1 - Moderate / Manageable</option>
                  <option value={2}>2 - High Stress / Overloaded</option>
                </select>
              </div>

              {/* Motivation */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Self Motivation</label>
                <select
                  value={formData.Motivation}
                  onChange={(e) => handleInputChange('Motivation', parseInt(e.target.value))}
                  className="w-full bg-white border border-warm-300 rounded-lg px-3 py-2 text-xs text-stone-800"
                >
                  <option value={0}>0 - Low Motivation</option>
                  <option value={1}>1 - Moderate Motivation</option>
                  <option value={2}>2 - High Motivation</option>
                </select>
              </div>

              {/* Resources Access */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Access to Learning Resources</label>
                <select
                  value={formData.Resources}
                  onChange={(e) => handleInputChange('Resources', parseInt(e.target.value))}
                  className="w-full bg-white border border-warm-300 rounded-lg px-3 py-2 text-xs text-stone-800"
                >
                  <option value={0}>0 - Limited Access</option>
                  <option value={1}>1 - Adequate Access</option>
                  <option value={2}>2 - Comprehensive / High Access</option>
                </select>
              </div>

              {/* Learning Style */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Primary Learning Style</label>
                <select
                  value={formData.LearningStyle}
                  onChange={(e) => handleInputChange('LearningStyle', parseInt(e.target.value))}
                  className="w-full bg-white border border-warm-300 rounded-lg px-3 py-2 text-xs text-stone-800"
                >
                  <option value={0}>0 - Visual Learner</option>
                  <option value={1}>1 - Auditory Learner</option>
                  <option value={2}>2 - Reading / Writing</option>
                  <option value={3}>3 - Kinesthetic / Practical</option>
                </select>
              </div>

              {/* Age */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Student Age</label>
                <input
                  type="number"
                  min="18"
                  max="35"
                  value={formData.Age}
                  onChange={(e) => handleInputChange('Age', parseInt(e.target.value))}
                  className="w-full bg-white border border-warm-300 rounded-lg px-3 py-1.5 text-xs text-stone-800"
                />
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Gender Code</label>
                <select
                  value={formData.Gender}
                  onChange={(e) => handleInputChange('Gender', parseInt(e.target.value))}
                  className="w-full bg-white border border-warm-300 rounded-lg px-3 py-2 text-xs text-stone-800"
                >
                  <option value={0}>Code 0</option>
                  <option value={1}>Code 1</option>
                </select>
              </div>

            </div>

            {/* Binary Checkbox Toggles */}
            <div className="pt-2 border-t border-warm-200">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 block">
                Academic Engagement Factors
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <label className="flex items-center space-x-2 p-2 rounded-lg bg-warm-50 border border-warm-200 cursor-pointer hover:bg-white">
                  <input
                    type="checkbox"
                    checked={formData.Discussions === 1}
                    onChange={(e) => handleInputChange('Discussions', e.target.checked ? 1 : 0)}
                    className="accent-forest-700"
                  />
                  <span className="text-stone-700 font-medium">Forum Discussions</span>
                </label>
                <label className="flex items-center space-x-2 p-2 rounded-lg bg-warm-50 border border-warm-200 cursor-pointer hover:bg-white">
                  <input
                    type="checkbox"
                    checked={formData.EduTech === 1}
                    onChange={(e) => handleInputChange('EduTech', e.target.checked ? 1 : 0)}
                    className="accent-forest-700"
                  />
                  <span className="text-stone-700 font-medium">Uses EduTech</span>
                </label>
                <label className="flex items-center space-x-2 p-2 rounded-lg bg-warm-50 border border-warm-200 cursor-pointer hover:bg-white">
                  <input
                    type="checkbox"
                    checked={formData.Extracurricular === 1}
                    onChange={(e) => handleInputChange('Extracurricular', e.target.checked ? 1 : 0)}
                    className="accent-forest-700"
                  />
                  <span className="text-stone-700 font-medium">Extracurricular</span>
                </label>
                <label className="flex items-center space-x-2 p-2 rounded-lg bg-warm-50 border border-warm-200 cursor-pointer hover:bg-white">
                  <input
                    type="checkbox"
                    checked={formData.Internet === 1}
                    onChange={(e) => handleInputChange('Internet', e.target.checked ? 1 : 0)}
                    className="accent-forest-700"
                  />
                  <span className="text-stone-700 font-medium">Reliable Internet</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-forest-800 hover:bg-forest-900 transition-all flex items-center justify-center space-x-2 shadow-md shadow-forest-900/15 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Running ML Inference...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-forest-300" />
                  <span>Execute Early-Warning Prediction</span>
                  <ArrowRight className="w-4 h-4 text-forest-300" />
                </>
              )}
            </button>

          </form>
        </div>

        {/* Prediction Results Column */}
        <div className="lg:col-span-5 space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-800 flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!result && !loading && (
            <div className="bg-white rounded-2xl p-8 border border-warm-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-800 text-base">Awaiting Student Data</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                Click <strong>"Execute Early-Warning Prediction"</strong> or select one of the quick presets to invoke the trained model and view grade probabilities.
              </p>
              <button
                type="button"
                onClick={handlePredict}
                className="mt-2 text-xs font-semibold px-4 py-2 rounded-lg bg-warm-100 hover:bg-forest-100 hover:text-forest-900 text-stone-700 transition-colors"
              >
                Run with Current Values
              </button>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Predicted Grade Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-warm-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-warm-200 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Inference Result ({result.modelUsed})
                    </span>
                    <h3 className="text-base font-extrabold text-stone-900">Predicted Academic Grade</h3>
                  </div>
                  <span
                    className="text-xs font-extrabold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: result.gradeDetails.color }}
                  >
                    {result.gradeDetails.riskLevel}
                  </span>
                </div>

                <div className="flex items-center space-x-5">
                  <div
                    className="w-20 h-20 rounded-2xl text-white flex flex-col items-center justify-center font-extrabold text-4xl shadow-md shrink-0"
                    style={{ backgroundColor: result.gradeDetails.color }}
                  >
                    <span>{result.predictedGrade}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-stone-900 text-base leading-tight">
                      {result.gradeDetails.title}
                    </p>
                    <p className="text-xs text-stone-500 font-medium">
                      Expected Final Exam Range: <strong className="text-stone-800">{result.gradeDetails.scoreRange} / 100</strong>
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed pt-1">
                      {result.gradeDetails.summary}
                    </p>
                  </div>
                </div>

                {/* Class Probabilities */}
                <div className="pt-3 border-t border-warm-200 space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-bold text-stone-700">
                    <span>Model Confidence Distribution</span>
                    <span className="text-forest-800 font-mono text-[11px]">Sum = 100%</span>
                  </div>
                  <div className="space-y-2">
                    {result.probabilities.map((p) => (
                      <div key={p.grade} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-stone-700 flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
                            <span>Grade {p.grade}</span>
                          </span>
                          <span className="font-bold text-stone-900">{p.probability}%</span>
                        </div>
                        <div className="w-full bg-warm-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${p.probability}%`,
                              backgroundColor: p.color
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cluster Assignment */}
                <div className="pt-3 border-t border-warm-200 bg-warm-50/70 p-3.5 rounded-xl border border-warm-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-700">Assigned Student Cluster</span>
                    <span className="font-mono text-[11px] font-bold text-forest-800 bg-white px-2 py-0.5 rounded border border-warm-200">
                      Cluster {result.clusterDetails.clusterId}
                    </span>
                  </div>
                  <p className="font-semibold text-stone-900">{result.clusterDetails.name}</p>
                  <p className="text-stone-500 text-[11px]">{result.clusterDetails.description}</p>
                </div>

              </div>

              {/* Actionable Recommendations */}
              <div className="bg-white rounded-2xl p-6 border border-warm-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-forest-800">
                  <BookOpen className="w-4 h-4" />
                  <h4 className="font-bold text-stone-900 text-sm">Pedagogical Guidance & Action Plan</h4>
                </div>

                <div className="space-y-2 pt-1">
                  {result.recommendations.map((rec, i) => {
                    const isPositive = rec.type === 'positive';
                    const isWarning = rec.type === 'warning';
                    return (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border text-xs space-y-1 ${
                          isWarning
                            ? 'bg-rose-50/60 border-rose-200 text-rose-950'
                            : isPositive
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                            : 'bg-warm-100/60 border-warm-200 text-stone-800'
                        }`}
                      >
                        <p className="font-bold flex items-center space-x-1.5">
                          {isWarning && <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                          {isPositive && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                          <span>{rec.title}</span>
                        </p>
                        <p className="opacity-90 leading-relaxed text-[11px]">{rec.message}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
