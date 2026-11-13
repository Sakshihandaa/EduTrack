import os
import json
import joblib
import numpy as np
import pandas as pd
from typing import Optional, Dict, Any, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

# Load precomputed metrics and models
METRICS_PATH = 'backend/models/ml_metrics.json'
with open(METRICS_PATH, 'r') as f:
    ml_metrics_data = json.load(f)

# Load trained models
scaler = joblib.load('backend/models/scaler.joblib')
rf_model = joblib.load('backend/models/rf_model.joblib')
dt_model = joblib.load('backend/models/dt_model.joblib')
lr_model = joblib.load('backend/models/lr_model.joblib')
kmeans_model = joblib.load('backend/models/kmeans_model.joblib')
pca_model = joblib.load('backend/models/pca_model.joblib')

app = FastAPI(
    title="EduTrack AI - Student Performance Analysis & Prediction API",
    description="Machine Learning API for student grade classification, clustering and early warning insights.",
    version="1.0.0"
)

# Enable CORS for frontend development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static plots directory if it exists
if os.path.exists('backend/static'):
    app.mount("/static", StaticFiles(directory="backend/static"), name="static")

# Mount built frontend assets if dist exists
if os.path.exists('frontend/dist/assets'):
    app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")

GRADE_INFO = {
    0: {
        "grade": "A",
        "title": "Grade A (Honors / Excellent)",
        "badge": "Honors / Excellent",
        "riskLevel": "Low Risk",
        "riskColor": "emerald",
        "color": "#2d6a4f",
        "scoreRange": "85 - 100",
        "summary": "Outstanding academic standing. Strong engagement across attendance, study hours, and assignments."
    },
    1: {
        "grade": "B",
        "title": "Grade B (Good / Above Average)",
        "badge": "Good / Above Average",
        "riskLevel": "Low-Moderate Risk",
        "riskColor": "green",
        "color": "#52b788",
        "scoreRange": "70 - 84",
        "summary": "Solid academic consistency. Shows reliable performance with potential to reach top-tier with targeted support."
    },
    2: {
        "grade": "C",
        "title": "Grade C (Satisfactory / Average)",
        "badge": "Satisfactory / Average",
        "riskLevel": "Moderate Risk",
        "riskColor": "amber",
        "color": "#d4a373",
        "scoreRange": "55 - 69",
        "summary": "Passing but vulnerable to setbacks. Improvements in assignment completion and study routine recommended."
    },
    3: {
        "grade": "D",
        "title": "Grade D (At Risk / Needs Intervention)",
        "badge": "At Risk / Needs Intervention",
        "riskLevel": "High Risk",
        "riskColor": "rose",
        "color": "#bc4749",
        "scoreRange": "40 - 54",
        "summary": "Immediate academic intervention required. Low attendance or assignment deficits significantly elevate failure probability."
    }
}

CLUSTER_INFO = {
    0: {
        "name": "Balanced & Consistent Learners",
        "description": "Consistent attendance and steady assignment completion. Moderate stress and standard study routines."
    },
    1: {
        "name": "High Stress & High Workload Learners",
        "description": "Intense study hours paired with elevated stress levels. Vulnerable to burnout without wellness interventions."
    },
    2: {
        "name": "Independent / Digital Self-Starters",
        "description": "High engagement with online courses, digital resources, and self-paced study pathways."
    }
}

class StudentPredictionInput(BaseModel):
    StudyHours: float = Field(..., ge=1, le=60, description="Weekly self-study hours (e.g. 20)")
    Attendance: float = Field(..., ge=40, le=100, description="Class attendance percentage (e.g. 85)")
    AssignmentCompletion: float = Field(..., ge=30, le=100, description="Assignment completion percentage (e.g. 80)")
    OnlineCourses: int = Field(default=10, ge=0, le=30, description="Number of online courses taken")
    Age: int = Field(default=22, ge=16, le=50, description="Student age")
    Resources: int = Field(default=1, ge=0, le=2, description="Access to learning resources (0=Low, 1=Medium, 2=High)")
    Motivation: int = Field(default=1, ge=0, le=2, description="Motivation level (0=Low, 1=Medium, 2=High)")
    StressLevel: int = Field(default=1, ge=0, le=2, description="Stress level (0=Low, 1=Medium, 2=High)")
    Extracurricular: int = Field(default=1, ge=0, le=1, description="Participates in extracurriculars (0=No, 1=Yes)")
    Internet: int = Field(default=1, ge=0, le=1, description="Reliable internet access (0=No, 1=Yes)")
    Gender: int = Field(default=0, ge=0, le=1, description="Gender indicator (0 or 1)")
    LearningStyle: int = Field(default=1, ge=0, le=3, description="Learning style (0=Visual, 1=Auditory, 2=Read/Write, 3=Kinesthetic)")
    Discussions: int = Field(default=1, ge=0, le=1, description="Participates in classroom/forum discussions (0=No, 1=Yes)")
    EduTech: int = Field(default=1, ge=0, le=1, description="Regularly utilizes educational technology tools (0=No, 1=Yes)")
    Model: Optional[str] = Field(default="Random Forest", description="Model to use: 'Random Forest', 'Decision Tree', or 'Logistic Regression'")

@app.get("/")
def serve_root():
    """Serve the built production frontend dashboard if available, else API summary."""
    dist_index = 'frontend/dist/index.html'
    if os.path.exists(dist_index):
        return FileResponse(dist_index)
    return {
        "message": "EduTrack AI API is active. Open frontend development server or build frontend.",
        "docs": "/docs",
        "health": "/api/health"
    }

@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "EduTrack AI API",
        "modelsLoaded": ["Random Forest", "Decision Tree", "Logistic Regression", "K-Means", "PCA"]
    }

@app.get("/api/overview")
def get_overview():
    """Return student cohort overview, demographics, and grade statistics."""
    return ml_metrics_data["overview"]

@app.get("/api/ml-insights")
def get_ml_insights():
    """Return model evaluations, K-Means clustering, elbow curve, confusion matrices, and feature importances."""
    return {
        "correlation": ml_metrics_data["correlation"],
        "clustering": ml_metrics_data["clustering"],
        "classification": ml_metrics_data["classification"]
    }

@app.post("/api/predict")
def predict_student(data: StudentPredictionInput):
    """Predict student grade category, cluster profile, class probabilities, and diagnostic recommendations."""
    feature_names = ml_metrics_data["features"]

    # Extract input values in exact feature order as a DataFrame to keep feature names
    input_dict = data.model_dump()
    row_values = [input_dict[col] for col in feature_names]
    X_df = pd.DataFrame([row_values], columns=feature_names)

    # Select model
    model_name = data.Model if data.Model in ["Random Forest", "Decision Tree", "Logistic Regression"] else "Random Forest"

    if model_name == "Random Forest":
        clf = rf_model
        pred_class = int(clf.predict(X_df)[0])
        probs = clf.predict_proba(X_df)[0]
    elif model_name == "Decision Tree":
        clf = dt_model
        pred_class = int(clf.predict(X_df)[0])
        probs = clf.predict_proba(X_df)[0]
    else: # Logistic Regression
        clf = lr_model
        X_scaled = scaler.transform(X_df)
        pred_class = int(clf.predict(X_scaled)[0])
        probs = clf.predict_proba(X_scaled)[0]

    # Predict Cluster & 2D PCA coordinate
    X_scaled_all = scaler.transform(X_df)
    cluster_id = int(kmeans_model.predict(X_scaled_all)[0])
    pca_coords = pca_model.transform(X_scaled_all)[0]

    # Format class probabilities
    grade_probabilities = [
        {
            "classId": i,
            "grade": GRADE_INFO[i]["grade"],
            "title": GRADE_INFO[i]["title"],
            "probability": round(float(probs[i]) * 100, 2),
            "color": GRADE_INFO[i]["color"]
        }
        for i in range(len(probs))
    ]

    # Generate tailored pedagogical insights / recommendations
    recommendations = []
    if data.Attendance < 75:
        recommendations.append({
            "type": "warning",
            "title": "Critical Attendance Deficit",
            "message": f"Current attendance ({data.Attendance:.0f}%) is below the recommended 80% threshold. Regular lecture presence correlates strongly with higher final marks."
        })
    elif data.Attendance >= 85:
        recommendations.append({
            "type": "positive",
            "title": "Strong Attendance Record",
            "message": f"Solid attendance ({data.Attendance:.0f}%) provides a strong foundation for exam preparedness."
        })

    if data.AssignmentCompletion < 70:
        recommendations.append({
            "type": "warning",
            "title": "Low Assignment Completion",
            "message": f"Completing assignments ({data.AssignmentCompletion:.0f}%) is one of the top predictors of student success. Prioritize submitted coursework."
        })

    if data.StudyHours < 12:
        recommendations.append({
            "type": "warning",
            "title": "Sub-Optimal Study Hours",
            "message": f"Weekly study time of {data.StudyHours:.0f} hours is below peer average (20 hrs). Incrementing by 4-6 hours per week significantly boosts grade trajectories."
        })
    elif data.StudyHours >= 25 and data.StressLevel == 2:
        recommendations.append({
            "type": "caution",
            "title": "Burnout Risk Alert",
            "message": f"High study volume ({data.StudyHours:.0f} hrs) combined with high stress may lead to diminishing cognitive returns. Incorporate planned recovery intervals."
        })

    if data.Motivation == 0:
        recommendations.append({
            "type": "neutral",
            "title": "Engagement & Motivation Support",
            "message": "Connecting with peer study circles and academic advisors can help rebuild momentum."
        })

    if not recommendations:
        recommendations.append({
            "type": "positive",
            "title": "Balanced Academic Trajectory",
            "message": "Student metrics indicate healthy study patterns and consistent academic behaviors."
        })

    return {
        "modelUsed": model_name,
        "predictedGrade": GRADE_INFO[pred_class]["grade"],
        "gradeDetails": GRADE_INFO[pred_class],
        "clusterDetails": {
            "clusterId": cluster_id,
            "name": CLUSTER_INFO.get(cluster_id, {}).get("name", f"Cluster {cluster_id}"),
            "description": CLUSTER_INFO.get(cluster_id, {}).get("description", ""),
            "pcaCoordinates": {
                "pca1": round(float(pca_coords[0]), 3),
                "pca2": round(float(pca_coords[1]), 3)
            }
        },
        "probabilities": grade_probabilities,
        "recommendations": recommendations,
        "inputSummary": {
            "studyHours": data.StudyHours,
            "attendance": data.Attendance,
            "assignmentCompletion": data.AssignmentCompletion,
            "stressLevel": data.StressLevel,
            "onlineCourses": data.OnlineCourses
        }
    }
