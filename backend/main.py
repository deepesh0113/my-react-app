
# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# import pandas as pd
# from io import BytesIO

# app = FastAPI(title="Dashboard API")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # For local dev - restrict in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# def convert_timestamp_to_seconds(value, unit_hint="ms"):
#     """Supports 1) MM:SS:MS or MM:SS (00:03:60.0, 00:03) 2) plain number 
#     - if unit_hint 'ns' - treat as nanoseconds, otherwise ms"""
#     try:
#         s = str(value).strip()
#         if ':' in s:
#             parts = s.split(':')
#             if len(parts) == 3:  # MM:SS:MS
#                 minutes = int(parts[0])
#                 seconds = int(parts[1])
#                 millis = int(parts[2])
#                 return minutes * 60 + seconds + millis / 1000.0
#             if len(parts) == 2:  # MM:SS
#                 minutes = int(parts[0])
#                 seconds = int(parts[1])
#                 return minutes * 60 + seconds
#             return None
#         # Plain number
#         val = float(s)
#         if unit_hint == 'ns':
#             return val / 1e9
#         else:  # default ms
#             return val / 1000.0
#     except Exception as e:
#         print(f"Timestamp parse error for {value}: {e}")
#         return None

# @app.post("/upload-csv/")
# async def upload_csv(file: UploadFile = File(...)):
#     """Accepts CSV with format: date,timestamp_ns,count,alert
#     Returns simplified time-series data"""
#     try:
#         raw = await file.read()
#         try:
#             df = pd.read_csv(BytesIO(raw))
#         except Exception as e:
#             print("read_csv error:", e)
#             return {"status": "error", "message": f"Failed to read CSV: {e}", "records": []}
        
#         cols = set(df.columns)
#         print("CSV columns:", list(df.columns))
        
#         # Must have these columns for simplified format
#         if 'date' not in cols:
#             return {"status": "error", "message": "CSV must contain a 'date' column.", "records": []}
#         if 'timestamp_ns' not in cols:
#             return {"status": "error", "message": "CSV must contain 'timestamp_ns' column.", "records": []}
#         if 'count' not in cols:
#             return {"status": "error", "message": "CSV must contain 'count' column.", "records": []}
        
#         # Optional alert column
#         has_alert = 'alert' in cols
#         if has_alert:
#             df['alert'] = df['alert'].astype(str).fillna('')
        
#         df['date'] = df['date'].astype(str)  # Normalize date
        
#         # Convert timestamp_ns to seconds
#         df['timesec'] = df['timestamp_ns'].apply(lambda v: convert_timestamp_to_seconds(v, 'ns'))
#         if df['timesec'].isna().all():
#             return {"status": "error", "message": "No valid rows after timestamp conversion. Check timestamp_ns format.", "records": []}
        
#         df = df.dropna(subset=['timesec'])  # Drop invalid timestamps
        
#         # Time series: date, timesec, count, alert
#         tscols = ['date', 'timesec', 'count']
#         if has_alert:
#             tscols.append('alert')
#         timeseries_df = df[tscols].copy()
#         timeseries_df.rename(columns={'count': 'count'}, inplace=True)
#         timeseries = timeseries_df.to_dict(orient='records')
        
#         # Per-second averages: date, second, avgcount
#         df['sec_bucket'] = df['timesec'].astype(int)
#         persecond_df = (df.groupby(['date', 'sec_bucket'])['count']
#                        .mean()
#                        .reset_index()
#                        .rename(columns={'sec_bucket': 'second', 'count': 'avgcount'}))
#         persecond = persecond_df.to_dict(orient='records')
        
#         # Summary stats
#         summary = {
#             'mincount': float(df['count'].min()),
#             'maxcount': float(df['count'].max()),
#             'meancount': float(df['count'].mean()),
#             'numpoints': int(len(df))
#         }
        
#         # Records for frontend (date, timestamp, count, alert)
#         records = []
#         for _, row in timeseries_df.iterrows():
#             rec = {
#                 'date': row['date'],
#                 'timestamp': float(row['timesec']),
#                 'count': float(row['count'])
#             }
#             if has_alert:
#                 rec['alert'] = row['alert']
#             records.append(rec)
        
#         print(f"Processed {len(records)} rows")
#         return {
#             "status": "success",
#             "records": records,
#             "timeseries": timeseries,
#             "persecond": persecond,
#             "summary": summary
#         }
#     except Exception as e:
#         print("Unexpected server error:", e)
#         return {"status": "error", "message": f"Failed to process CSV: {e}", "records": []}


from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from io import BytesIO

app = FastAPI(title="Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For local dev - restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def convert_timestamp_to_seconds(value, unit_hint="ms"):
    """
    Convert various timestamp formats into seconds (float).

    Supports:
    1) String formats like "MM:SS:MS" or "MM:SS"
    2) Plain numbers, interpreted by unit_hint:
        - 'ns' : nanoseconds  -> / 1e9
        - 'ms' : milliseconds -> / 1e3
        - 'sec': seconds      -> as-is
    """
    try:
        s = str(value).strip()
        # String time format like "00:03:400" or "00:03"
        if ":" in s:
            parts = s.split(":")
            if len(parts) == 3:  # MM:SS:MS
                minutes = int(parts[0])
                seconds = int(parts[1])
                millis = int(parts[2])
                return minutes * 60 + seconds + millis / 1000.0
            if len(parts) == 2:  # MM:SS
                minutes = int(parts[0])
                seconds = int(parts[1])
                return minutes * 60 + seconds
            return None

        # Plain numeric value
        val = float(s)
        if unit_hint == "ns":
            return val / 1e9
        elif unit_hint == "sec":
            return val  # already in seconds
        else:  # default: ms
            return val / 1000.0

    except Exception as e:
        print(f"Timestamp parse error for {value}: {e}")
        return None


@app.post("/upload-csv/")
async def upload_csv(file: UploadFile = File(...)):
    """
    Accepts CSV with time columns like:
      - date,timestamp_ns,count,alert        (nanoseconds)
      - date,timestamp_ms,count,alert        (milliseconds)
      - date,timestamp,count,alert           (seconds or MM:SS:MS string)

    Returns:
      - records:    [{date, timestamp (sec), count, alert}]
      - per_second: [{date, second, avg_count}]
      - summary:    {min_count, max_count, mean_count, num_points}
    """
    try:
        raw = await file.read()
        try:
            df = pd.read_csv(BytesIO(raw))
        except Exception as e:
            print("read_csv error:", e)
            return {
                "status": "error",
                "message": f"Failed to read CSV: {e}",
                "records": [],
            }

        cols = set(df.columns)
        print("CSV columns:", list(df.columns))

        # ---- Required columns ----
        if "date" not in cols:
            return {
                "status": "error",
                "message": "CSV must contain a 'date' column.",
                "records": [],
            }

        # Determine which timestamp column is present
        ts_col = None
        unit_hint = "ms"  # default

        if "timestamp_ns" in cols:
            ts_col = "timestamp_ns"
            unit_hint = "ns"
        elif "timestamp_ms" in cols:
            ts_col = "timestamp_ms"
            unit_hint = "ms"
        elif "timestamp" in cols:
            ts_col = "timestamp"
            unit_hint = "sec"  # treat as seconds (like 0, 0.417, 0.833)
        else:
            return {
                "status": "error",
                "message": "CSV must contain one of: 'timestamp_ns', 'timestamp_ms', or 'timestamp'.",
                "records": [],
            }

        if "count" not in cols:
            return {
                "status": "error",
                "message": "CSV must contain 'count' column.",
                "records": [],
            }

        # Optional alert column
        has_alert = "alert" in cols
        if has_alert:
            df["alert"] = df["alert"].astype(str).fillna("")

        # Normalize date to string
        df["date"] = df["date"].astype(str)

        # ---- Convert timestamp column -> seconds ----
        df["timesec"] = df[ts_col].apply(
            lambda v: convert_timestamp_to_seconds(v, unit_hint)
        )

        if df["timesec"].isna().all():
            return {
                "status": "error",
                "message": f"No valid rows after timestamp conversion. Check {ts_col} format.",
                "records": [],
            }

        # Drop rows with invalid timestamps
        df = df.dropna(subset=["timesec"])

        # ================== Time series ==================
        # For frontend: date, timestamp (sec), count, alert
        tscols = ["date", "timesec", "count"]
        if has_alert:
            tscols.append("alert")

        timeseries_df = df[tscols].copy()

        # For potential debugging/extra usage
        timeseries = timeseries_df.to_dict(orient="records")

        # Build records array in the exact shape frontend expects
        records = []
        for _, row in timeseries_df.iterrows():
            rec = {
                "date": row["date"],
                # frontend will re-format this seconds value into "MM:SS.mmm" if needed
                "timestamp": float(row["timesec"]),
                "count": float(row["count"]),
            }
            if has_alert:
                rec["alert"] = row["alert"]
            records.append(rec)

        # ================== Per-second averages ==================
        # bucket by whole seconds
        df["sec_bucket"] = df["timesec"].astype(int)

        persecond_df = (
            df.groupby(["date", "sec_bucket"])["count"]
            .mean()
            .reset_index()
            .rename(
                columns={
                    "sec_bucket": "second",
                    "count": "avg_count",  # match React naming
                }
            )
        )

        per_second = persecond_df.to_dict(orient="records")

        # ================== Summary stats ==================
        summary = {
            "min_count": float(df["count"].min()),
            "max_count": float(df["count"].max()),
            "mean_count": float(df["count"].mean()),
            "num_points": int(len(df)),
        }

        print(f"Processed {len(records)} rows")
        return {
            "status": "success",
            "records": records,
            "timeseries": timeseries,  # optional, React doesn't use it but kept for debugging
            "per_second": per_second,
            "summary": summary,
        }

    except Exception as e:
        print("Unexpected server error:", e)
        return {
            "status": "error",
            "message": f"Failed to process CSV: {e}",
            "records": [],
        }
