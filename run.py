import uvicorn
import os

if __name__ == '__main__':
    print("=" * 60)
    print("  EduTrack AI - Student Performance Analysis & Prediction")
    print("=" * 60)
    print("Starting server on http://127.0.0.1:8000")
    print("Frontend Dashboard: http://127.0.0.1:8000")
    print("Interactive API Docs: http://127.0.0.1:8000/docs")
    print("=" * 60)
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=False)
