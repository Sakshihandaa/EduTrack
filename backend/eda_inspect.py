import pandas as pd
import numpy as np

df = pd.read_csv('data/merged_dataset.csv')
print("--- SHAPE & INFO ---")
print("Shape:", df.shape)
print("Missing values:", df.isnull().sum().to_dict())
print("\n--- DATA TYPES ---")
print(df.dtypes)
print("\n--- SUMMARY STATS ---")
print(df.describe().T[['mean', 'std', 'min', '50%', 'max']])

print("\n--- FINAL GRADE DISTRIBUTION ---")
print(df['FinalGrade'].value_counts().sort_index())

print("\n--- EXAM SCORE BY FINAL GRADE ---")
print(df.groupby('FinalGrade')['ExamScore'].describe())

print("\n--- CORRELATION WITH FINAL GRADE ---")
numeric_df = df.select_dtypes(include=[np.number])
corr = numeric_df.corr()
print(corr['FinalGrade'].sort_values())

print("\n--- HEAD (5 ROWS) ---")
print(df.head())
