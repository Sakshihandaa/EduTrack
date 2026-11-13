import React from 'react';
import {
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  CalendarCheck,
  TrendingUp,
  Brain
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

export default function OverviewSection({ data, loading }) {
  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[450px]">
        <div className="flex flex-col items-center space-y-3 text-stone-500">
          <div className="w-9 h-9 border-3 border-forest-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Loading cohort statistics...</p>
        </div>
      </div>
    );
  }

  const {
    totalStudents,
    avgAttendance,
    avgStudyHours,
    avgAssignmentCompletion,
    passRate,
    highRiskRate,
    gradeDistribution,
    studyHoursDistribution,
    attendanceDistribution,
    stressDistribution,
    academicScatter
  } = data;

  const statCards = [
    {
      label: 'Total Cohort Students',
      value: totalStudents?.toLocaleString(),
      subtext: 'Complete verified records',
      icon: Users,
      badge: '14,003 samples',
      badgeColor: 'bg-warm-100 text-stone-700'
    },
    {
      label: 'Average Attendance',
      value: `${avgAttendance}%`,
      subtext: 'Classroom & lecture rate',
      icon: CalendarCheck,
      badge: 'Target: >80%',
      badgeColor: 'bg-emerald-50 text-emerald-800 border border-emerald-200'
    },
    {
      label: 'Avg Weekly Study Hours',
      value: `${avgStudyHours} hrs`,
      subtext: 'Independent study time',
      icon: Clock,
      badge: 'Median: 20 hrs',
      badgeColor: 'bg-forest-50 text-forest-800 border border-forest-200'
    },
    {
      label: 'Assignment Completion',
      value: `${avgAssignmentCompletion}%`,
      subtext: 'Coursework submission rate',
      icon: CheckCircle2,
      badge: 'Core Predictor',
      badgeColor: 'bg-amber-50 text-amber-800 border border-amber-200'
    },
    {
      label: 'Cohort Pass Rate',
      value: `${passRate}%`,
      subtext: 'Grades A, B & C combined',
      icon: Award,
      badge: 'Satisfactory+',
      badgeColor: 'bg-forest-100 text-forest-800'
    },
    {
      label: 'At-Risk Early Warning',
      value: `${highRiskRate}%`,
      subtext: 'Grade D (needs intervention)',
      icon: AlertTriangle,
      badge: 'Immediate Focus',
      badgeColor: 'bg-rose-50 text-rose-800 border border-rose-200'
    }
  ];

  const gradeColors = {
    'A': '#2d6a4f',
    'B': '#52b788',
    'C': '#d4a373',
    'D': '#bc4749'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 border border-stone-200 rounded-lg shadow-lg text-xs">
          <p className="font-bold text-stone-800 mb-1">{label || payload[0]?.name}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-stone-600 flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></span>
              <span>{entry.name}: <strong className="text-stone-900">{entry.value}</strong></span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-forest-700/80 text-forest-200 border border-forest-600/50 mb-3">
            <Brain className="w-3.5 h-3.5 text-forest-300" />
            <span>EduTrack AI Cohort Intelligence</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Student Performance Analysis Dashboard
          </h1>
          <p className="text-forest-100 text-sm sm:text-base leading-relaxed">
            Comprehensive exploratory analysis across 14,003 verified undergraduate records. This module profiles academic engagement indicators, grade distributions, and early warning flags before final exam administration.
          </p>
        </div>
        <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
          <GraduationCap className="w-80 h-80" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl p-4 border border-warm-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-warm-100 flex items-center justify-center text-forest-800">
                    <Icon className="w-4 h-4 text-forest-700" />
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${stat.badgeColor}`}>
                    {stat.badge}
                  </span>
                </div>
                <p className="text-xs font-medium text-stone-500">{stat.label}</p>
                <p className="text-2xl font-extrabold text-stone-900 mt-1 tracking-tight">{stat.value}</p>
              </div>
              <p className="text-[11px] text-stone-400 mt-2 border-t border-stone-100 pt-1.5 font-medium">
                {stat.subtext}
              </p>
            </div>
          );
        })}
      </div>

      {/* Grade Distribution & Donut breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Bar chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-warm-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-stone-900">Academic Grade Distribution</h2>
              <p className="text-xs text-stone-500">Number of students classified across performance tiers (0=A, 1=B, 2=C, 3=D)</p>
            </div>
            <span className="text-xs font-semibold text-forest-800 bg-forest-50 px-2.5 py-1 rounded-lg border border-forest-200">
              Balanced Cohort
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeDistribution} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe1" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#78716c', fontSize: 11 }} />
                <YAxis tick={{ fill: '#78716c', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Students">
                  {gradeDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-warm-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900 mb-1">Cohort Composition</h2>
            <p className="text-xs text-stone-500 mb-4">Percentage share of each outcome</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {gradeDistribution?.map((entry, index) => (
                      <Cell key={`donut-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-warm-200">
            {gradeDistribution?.map((g) => (
              <div key={g.classId} className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-md" style={{ backgroundColor: g.color }}></span>
                <span className="font-medium text-stone-700">Grade {g.grade}:</span>
                <span className="font-bold text-stone-900">{g.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Engagement Distributions: Study Hours & Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Study Hours */}
        <div className="bg-white p-6 rounded-2xl border border-warm-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-stone-900">Weekly Study Hours Frequency</h2>
              <p className="text-xs text-stone-500">Distribution of independent study commitment</p>
            </div>
            <span className="text-xs text-stone-500 font-medium bg-warm-100 px-2.5 py-1 rounded-md">
              Mean: 20.0 hrs
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyHoursDistribution} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe1" vertical={false} />
                <XAxis dataKey="range" tick={{ fill: '#78716c', fontSize: 11 }} />
                <YAxis tick={{ fill: '#78716c', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#40916c" radius={[4, 4, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white p-6 rounded-2xl border border-warm-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-stone-900">Attendance Rate Distribution</h2>
              <p className="text-xs text-stone-500">Lecture and laboratory attendance bins</p>
            </div>
            <span className="text-xs text-stone-500 font-medium bg-warm-100 px-2.5 py-1 rounded-md">
              Mean: 80.2%
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceDistribution} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe1" vertical={false} />
                <XAxis dataKey="range" tick={{ fill: '#78716c', fontSize: 11 }} />
                <YAxis tick={{ fill: '#78716c', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#2d6a4f" radius={[4, 4, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Academic Performance Engagement Scatter & Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Scatter Plot */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-warm-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-stone-900">Academic Engagement Correlation</h2>
              <p className="text-xs text-stone-500">Weekly Study Hours vs Assignment Completion Rate (Sampled Cohort)</p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-[#2d6a4f]"></span><span className="text-stone-600">A</span></span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-[#52b788]"></span><span className="text-stone-600">B</span></span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-[#d4a373]"></span><span className="text-stone-600">C</span></span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-[#bc4749]"></span><span className="text-stone-600">D</span></span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe1" />
                <XAxis type="number" dataKey="studyHours" name="Study Hours" unit="h" tick={{ fill: '#78716c', fontSize: 11 }} />
                <YAxis type="number" dataKey="assignmentCompletion" name="Assignment %" unit="%" tick={{ fill: '#78716c', fontSize: 11 }} />
                <ZAxis range={[25, 25]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white p-2.5 border border-stone-200 rounded-lg shadow-md text-xs">
                          <p className="font-bold text-stone-800">Grade: {d.grade}</p>
                          <p className="text-stone-600">Study Hours: {d.studyHours}h</p>
                          <p className="text-stone-600">Assignments: {d.assignmentCompletion}%</p>
                          <p className="text-stone-600">Attendance: {d.attendance}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {['A', 'B', 'C', 'D'].map((gr) => (
                  <Scatter
                    key={gr}
                    name={`Grade ${gr}`}
                    data={academicScatter?.filter(item => item.grade === gr)}
                    fill={gradeColors[gr]}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pedagogical Insights */}
        <div className="lg:col-span-4 bg-warm-100/70 p-6 rounded-2xl border border-warm-300/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-forest-800 mb-3">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-bold text-stone-900 text-sm">Key Analytical Takeaways</h3>
            </div>
            <ul className="space-y-3 text-xs text-stone-700 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-700 mt-1.5 shrink-0"></span>
                <span><strong>Assignment Completion (16.2% imp)</strong> and <strong>Attendance (15.3% imp)</strong> are the two most decisive pre-exam early warning indicators.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-700 mt-1.5 shrink-0"></span>
                <span>Students maintaining <strong>&gt;22 hours/week</strong> study time and &gt;85% attendance have an 88% probability of securing Grade A or B.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-700 mt-1.5 shrink-0"></span>
                <span>Students with <strong>&lt;65% attendance</strong> represent 72% of the Grade D (high risk) cohort, signaling urgent need for attendance checks before midterms.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-warm-300 text-[11px] text-stone-500">
            Source: EduTrack AI Dataset (14,003 students)
          </div>
        </div>

      </div>

    </div>
  );
}

function GraduationCap(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}
