# EduTrack AI: Machine Learning Student Performance Analysis & Early Warning System

EduTrack AI is a complete, production-ready Machine Learning college project designed to analyze student performance, detect early-warning academic risk, and provide real-time grade predictions using pre-exam engagement indicators.

The project incorporates **data cleaning and preprocessing**, **exploratory data analysis (EDA)**, **K-Means clustering** with unsupervised cohort segmentation, **supervised model benchmarking** across Random Forest, Decision Tree, and Logistic Regression, a high-performance **FastAPI backend**, and a **React dashboard** built with Vite, Tailwind CSS, and Recharts.

---

## Key Highlights & Innovations

1. **Target Leakage Prevention (Pre-Exam vs. Post-Exam Analysis)**:
   - In educational data mining, predicting `FinalGrade` using `ExamScore` produces artificial ~99.8% accuracy because final grades are thresholded from final exam scores ($r = -0.968$).
   - Using `ExamScore` before exams are taken is impossible in practice. EduTrack AI isolates **pre-exam indicators** (Study Hours, Attendance, Assignment Completion, Online Courses, Stress Level, Discussions, Resources) to deliver **actionable early warning predictions (92.4% accuracy with Random Forest)** before final exams take place.

2. **Unsupervised Behavioral Profiling (K-Means Clustering)**:
   - Features standardized via `StandardScaler`.
   - Cluster validation using both the **Elbow Method** (inertia reduction) and **Silhouette Analysis** (peak score $0.0908$ at $k = 3$).
   - Identified 3 distinct student segments:
     - *Cluster 0*: Balanced & Consistent Learners (steady attendance, moderate stress).
     - *Cluster 1*: High Stress & High Workload Learners (heavy study volume, elevated burnout risk).
     - *Cluster 2*: Independent / Digital Self-Starters (high engagement in online courses).
   - 2D Principal Component Analysis (PCA) projection for interactive cluster visualization.

3. **Multi-Model Supervised Benchmark**:
   - **Random Forest Classifier**: **92.36% Accuracy**, **0.923 Weighted F1** (Selected Champion).
   - **Decision Tree Classifier**: **67.23% Accuracy**, **0.672 Weighted F1**.
   - **Logistic Regression**: **28.13% Accuracy** (Linear boundary fails on complex multi-tier student behavior patterns).

4. **Pedagogical Feature Attribution**:
   - Gini Impurity ranking reveals that coursework engagement (**Assignment Completion 16.2%**, **Attendance 15.3%**, and **Study Hours 14.4%**) drives over 45% of student grade outcomes.

5. **Design**:
   - Modern Forest-Green (`#1b4332`, `#2d6a4f`, `#52b788`), warm-white (`#faf8f5`), and neutral stone palette.
   - Built with clean KPI cards, responsive Recharts charts, presets, and diagnostic feedback.

---

## System Architecture

```
student - ml model/
├── backend/
│   ├── main.py                  # FastAPI server & prediction endpoints
│   ├── ml_pipeline.py            # Complete ML training & evaluation pipeline
│   ├── eda_inspect.py            # Dataset exploratory inspection script
│   ├── models/                   # Serialized Joblib models & precomputed metrics
│   │   ├── rf_model.joblib       # Trained Random Forest classifier
│   │   ├── dt_model.joblib       # Trained Decision Tree classifier
│   │   ├── lr_model.joblib       # Trained Logistic Regression classifier
│   │   ├── kmeans_model.joblib   # Trained K-Means clustering model
│   │   ├── scaler.joblib         # Fitted StandardScaler
│   │   ├── pca_model.joblib      # Fitted 2D PCA transformer
│   │   └── ml_metrics.json       # Precomputed dataset stats & evaluation metrics
│   └── static/plots/             # High-resolution saved evaluation plots
├── data/
│   └── merged_dataset.csv        # Real student dataset (14,003 rows, 16 columns)
├── frontend/                     # React + Vite + Tailwind CSS dashboard
│   ├── dist/                     # Production-built optimized frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar with cohort stats
│   │   │   ├── OverviewSection.jsx      # Section 1: Cohort stats & distributions
│   │   │   ├── MlInsightsSection.jsx    # Section 2: Clustering, models & benchmarks
│   │   │   └── StudentPredictionSection.jsx # Section 3: Interactive inference & guidance
│   │   ├── App.jsx               # Main dashboard controller
│   │   ├── index.css             # Tailwind base styles & theme
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── run.py                        # Single-command launcher for backend & frontend
└── README.md
```

---

## Dataset Description (`data/merged_dataset.csv`)

- **Total Records**: 14,003 verified undergraduate records.
- **Attributes (16 columns)**:
  1. `StudyHours`: Self-study hours per week (5 – 44 hours).
  2. `Attendance`: Classroom & lecture attendance rate (60% – 100%).
  3. `Resources`: Access to learning resources (0=Low, 1=Medium, 2=High).
  4. `Extracurricular`: Participation in extracurricular activities (0=No, 1=Yes).
  5. `Motivation`: Self-reported motivation level (0=Low, 1=Medium, 2=High).
  6. `Internet`: Reliable internet connectivity (0=No, 1=Yes).
  7. `Gender`: Gender code (0 or 1).
  8. `Age`: Student age (18 – 29 years).
  9. `LearningStyle`: Primary learning style (0=Visual, 1=Auditory, 2=Reading/Writing, 3=Kinesthetic).
  10. `OnlineCourses`: Modules completed online (0 – 20).
  11. `Discussions`: Active in class and online forum discussions (0=No, 1=Yes).
  12. `AssignmentCompletion`: Coursework submission completion (50% – 100%).
  13. `EduTech`: Regular utilization of educational technology tools (0=No, 1=Yes).
  14. `StressLevel`: Stress index (0=Low, 1=Moderate, 2=High).
  15. `ExamScore`: Final examination mark (40 – 100).
  16. `FinalGrade`: Target academic classification:
      - `0`: Grade A (Honors / Excellent, 85–100 score) — 3,832 students (27.4%)
      - `1`: Grade B (Good / Above Average, 70–84 score) — 3,310 students (23.6%)
      - `2`: Grade C (Satisfactory / Average, 55–69 score) — 3,618 students (25.8%)
      - `3`: Grade D (At Risk / Needs Intervention, 40–54 score) — 3,243 students (23.2%)

---

## How to Run EduTrack AI

### Option 1: Unified Production Mode (One Command)
FastAPI serves both the ML API and the compiled React dashboard:

```bash
python run.py
```
Open **[http://127.0.0.1:8000](http://127.0.0.1:8000)** in your browser.

- Interactive API Documentation: **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**
- Health Check: **[http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)**

---

### Option 2: Development Mode (Hot Reload)

**Terminal 1 — Backend:**
```bash
python run.py
```

**Terminal 2 — Frontend:**
```bash
npm.cmd --prefix frontend run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser. Vite automatically proxies `/api` requests to the FastAPI server at port 8000.

---

## Re-training the ML Pipeline

To re-run the complete training process, recalculate metrics, re-cluster, and update saved Joblib models:

```bash
python backend/ml_pipeline.py
```

This updates:
- `backend/models/*.joblib`
- `backend/models/ml_metrics.json`
- `backend/static/plots/*.png`
