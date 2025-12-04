// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   CartesianGrid,
//   Legend,
//   Cell,
//   ReferenceLine,
// } from "recharts";

// function useWindowWidth() {
//   const [width, setWidth] = useState(window.innerWidth);
//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return width;
// }

// function Dashboard() {
//   const navigate = useNavigate();

//   const [csvFile, setCsvFile] = useState(null);

//   // main time series used by first graph
//   const [graphData, setGraphData] = useState([]);

//   // extra datasets from backend
//   const [timeSeries, setTimeSeries] = useState([]);      // time_sec vs count
//   const [perSecondData, setPerSecondData] = useState([]); // second vs avg_count
//   const [frameSeries, setFrameSeries] = useState([]);    // frame_index vs count
//   const [summary, setSummary] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]); // left-side history

//   // thresholds
//   const [minThreshold, setMinThreshold] = useState("");
//   const [maxThreshold, setMaxThreshold] = useState("");

//   // details toggles
//   const [showTimeDetails, setShowTimeDetails] = useState(false);
//   const [showPerSecondDetails, setShowPerSecondDetails] = useState(false);
//   const [showFrameDetails, setShowFrameDetails] = useState(false);

//   const width = useWindowWidth();
//   const isMobile = width < 700;

//   // parsed thresholds
//   const parsedMin = parseFloat(minThreshold);
//   const parsedMax = parseFloat(maxThreshold);
//   const thresholdsActive =
//     !Number.isNaN(parsedMin) && !Number.isNaN(parsedMax);

//   // Theme colors
//   const BG = "#020617";
//   const BLUE = "#3b82f6";
//   const CYAN = "#0ea5e9";
//   const GREEN = "#22c55e";
//   const RED = "#ef4444";
//   const AMBER = "#facc15";

//   const styles = {
//     page: {
//       minHeight: "100vh",
//       backgroundColor: BG,
//       fontFamily:
//         "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//       display: "flex",
//       justifyContent: "center",
//       padding: isMobile ? "18px 4vw 32px" : "28px 28px 40px",
//       boxSizing: "border-box",
//     },
//     content: {
//       width: "100%",
//       maxWidth: 1120,
//       display: "flex",
//       flexDirection: "column",
//       gap: isMobile ? 16 : 20,
//       animation: "fadeIn 0.5s ease-in",
//     },
//     topBar: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "flex-start",
//       gap: 16,
//       flexWrap: "wrap",
//     },
//     backBtn: {
//       borderRadius: 999,
//       border: "1px solid #1e293b",
//       backgroundColor: "transparent",
//       color: "#9ca3af",
//       padding: "7px 16px",
//       fontSize: 13,
//       cursor: "pointer",
//     },
//     brandBlock: {
//       display: "flex",
//       flexDirection: "column",
//       gap: 2,
//       textAlign: "left",
//     },
//     brand: {
//       fontSize: 11,
//       textTransform: "uppercase",
//       letterSpacing: "0.23em",
//       color: "#6b7280",
//     },
//     header: {
//       fontWeight: 600,
//       fontSize: isMobile ? "1.25rem" : "1.6rem",
//       color: "#e5e7eb",
//     },
//     subtitle: {
//       fontSize: 12,
//       color: "#9ca3af",
//     },

//     theoryCard: {
//       background: "radial-gradient(circle at top left, #020617, #020617 60%)",
//       borderRadius: 18,
//       padding: isMobile ? "14px 14px" : "18px 18px",
//       boxShadow: "0 24px 52px rgba(15,23,42,0.9)",
//       border: "1px solid #111827",
//     },
//     theoryTitle: {
//       fontSize: 14,
//       textTransform: "uppercase",
//       letterSpacing: "0.18em",
//       color: "#9ca3af",
//       marginBottom: 8,
//     },
//     theoryHeading: {
//       fontSize: 15,
//       fontWeight: 600,
//       color: "#e5e7eb",
//       marginBottom: 8,
//     },
//     theoryText: {
//       fontSize: 13,
//       color: "#9ca3af",
//       lineHeight: 1.65,
//     },
//     theoryList: {
//       marginTop: 10,
//       paddingLeft: 18,
//       fontSize: 13,
//       color: "#9ca3af",
//       lineHeight: 1.6,
//     },

//     mainRow: {
//       display: "flex",
//       flexDirection: isMobile ? "column" : "row",
//       gap: 18,
//       alignItems: "flex-start",
//     },
//     leftCol: {
//       flex: isMobile ? "unset" : "0 0 280px",
//       width: isMobile ? "100%" : 280,
//       display: "flex",
//       flexDirection: "column",
//       gap: 14,
//     },
//     rightCol: {
//       flex: 1,
//       display: "flex",
//       flexDirection: "column",
//       gap: 14,
//     },

//     historyCard: {
//       background: "radial-gradient(circle at top, #020617, #020617 70%)",
//       borderRadius: 18,
//       padding: isMobile ? "14px 14px" : "16px 16px",
//       boxShadow: "0 22px 50px rgba(15,23,42,0.9)",
//       border: "1px solid #111827",
//     },
//     historyTitle: {
//       fontSize: 14,
//       color: "#93c5fd",
//       fontWeight: 600,
//       marginBottom: 6,
//     },
//     historySub: {
//       fontSize: 12,
//       color: "#6b7280",
//       marginBottom: 10,
//     },
//     historyList: {
//       margin: 0,
//       padding: 0,
//       listStyle: "none",
//       maxHeight: 260,
//       overflowY: "auto",
//     },
//     historyItem: {
//       padding: "7px 0",
//       borderBottom: "1px solid rgba(15,23,42,0.9)",
//     },
//     historyName: {
//       fontSize: 13,
//       color: "#e5e7eb",
//       marginBottom: 2,
//       wordBreak: "break-all",
//     },
//     historyMeta: {
//       fontSize: 11,
//       color: "#9ca3af",
//     },
//     historyEmpty: {
//       fontSize: 12,
//       color: "#6b7280",
//       marginTop: 6,
//     },

//     graphBox: {
//       background: "radial-gradient(circle at top right, #020617, #020617 70%)",
//       borderRadius: 18,
//       border: "1px solid #111827",
//       boxShadow: "0 24px 52px rgba(15,23,42,0.95)",
//       padding: isMobile ? "16px 12px 20px" : "18px 18px 24px",
//       display: "flex",
//       flexDirection: "column",
//       gap: 10,
//     },
//     graphTitle: {
//       fontSize: 14,
//       color: BLUE,
//       fontWeight: 600,
//     },
//     graphSubtitle: {
//       fontSize: 12,
//       color: "#6b7280",
//     },
//     fileInput: {
//       marginTop: 8,
//       marginBottom: 10,
//       padding: 7,
//       borderRadius: 10,
//       background: BG,
//       color: "#e5e7eb",
//       border: "1px solid #111827",
//       fontSize: 13,
//     },
//     resetBtn: {
//       backgroundColor: "#10b981",
//       color: "#fff",
//       padding: "8px 20px",
//       borderRadius: 999,
//       cursor: "pointer",
//       border: "none",
//       fontWeight: 600,
//     },
//     actionBtn: {
//       backgroundColor: CYAN,
//       color: "#0b1120",
//       cursor: "pointer",
//       border: "none",
//       fontWeight: 600,
//       padding: "7px 16px",
//       borderRadius: 999,
//       fontSize: 13,
//     },
//     selectedFile: {
//       marginTop: 8,
//       fontSize: 12,
//       color: "#93c5fd",
//       wordBreak: "break-all",
//     },

//     graphArea: {
//       width: "100%",
//       height: 320,
//       marginTop: 4,
//     },
//     graphPlaceholder: {
//       flex: 1,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: 13,
//       color: CYAN,
//       borderRadius: 12,
//       border: "1px dashed #1e293b",
//     },
//     summaryRow: {
//       display: "flex",
//       flexWrap: "wrap",
//       gap: 10,
//       fontSize: 12,
//       color: "#9ca3af",
//       marginTop: 4,
//     },
//     summaryChip: {
//       padding: "4px 10px",
//       borderRadius: 999,
//       border: "1px solid #1e293b",
//     },
//     thresholdRow: {
//       display: "flex",
//       flexWrap: "wrap",
//       gap: 8,
//       marginTop: 10,
//       alignItems: "center",
//       fontSize: 12,
//       color: "#9ca3af",
//     },
//     thresholdInput: {
//       width: 90,
//       padding: "4px 8px",
//       borderRadius: 999,
//       border: "1px solid #1f2937",
//       backgroundColor: "#020617",
//       color: "#e5e7eb",
//       fontSize: 12,
//       outline: "none",
//     },
//     detailBtn: {
//       alignSelf: "flex-end",
//       marginTop: 4,
//       padding: "4px 10px",
//       fontSize: 11,
//       borderRadius: 999,
//       border: "1px solid #1f2937",
//       backgroundColor: "#020617",
//       color: "#9ca3af",
//       cursor: "pointer",
//     },
//     detailPanel: {
//       marginTop: 8,
//       padding: "8px 10px",
//       borderRadius: 12,
//       border: "1px solid #1f2937",
//       backgroundColor: "#020617",
//       fontSize: 11,
//       maxHeight: 160,
//       overflowY: "auto",
//       lineHeight: 1.5,
//     },
//     detailSectionTitle: {
//       fontWeight: 600,
//       marginTop: 4,
//       marginBottom: 2,
//       fontSize: 11,
//     },
//   };

//   // custom dot renderer for line charts based on thresholds
//   const renderColoredDot = (props) => {
//     const { cx, cy, payload } = props;
//     const value = payload.count;
//     let fill = "#60a5fa";

//     if (thresholdsActive) {
//       if (value > parsedMax) fill = RED; // alert
//       else if (value >= parsedMin && value <= parsedMax) fill = GREEN; // safe
//       else fill = AMBER; // below min
//     }

//     return (
//       <circle cx={cx} cy={cy} r={3} fill={fill} stroke={BG} strokeWidth={1} />
//     );
//   };

//   const handleCSVUpload = async () => {
//     if (!csvFile) {
//       alert("Please select a CSV file first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", csvFile);

//     setLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/upload-csv", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.status === "error") {
//         alert(data.message || "Error processing CSV");
//         setLoading(false);
//         return;
//       }

//       setGraphData(data.records || []);
//       setTimeSeries(data.time_series || []);
//       setPerSecondData(data.per_second || []);
//       setFrameSeries(data.frame_series || []);
//       setSummary(data.summary || null);

//       setHistory((prev) => [
//         {
//           name: csvFile.name,
//           uploadedAt: new Date().toLocaleString(),
//           points: (data.records || []).length,
//         },
//         ...prev,
//       ]);
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Failed to upload CSV");
//     }

//     setLoading(false);
//   };

//   const resetView = () => {
//     setCsvFile(null);
//     setGraphData([]);
//     setTimeSeries([]);
//     setPerSecondData([]);
//     setFrameSeries([]);
//     setSummary(null);
//     setMinThreshold("");
//     setMaxThreshold("");
//     setShowTimeDetails(false);
//     setShowPerSecondDetails(false);
//     setShowFrameDetails(false);
//     setTimeout(() => {
//       window.location.reload();
//     }, 150);
//   };

//   // helpers for detail panels
//   const getTimeAlerts = () =>
//     thresholdsActive
//       ? graphData.filter((p) => p.count > parsedMax)
//       : [];

//   const getTimeSafe = () =>
//     thresholdsActive
//       ? graphData.filter(
//         (p) => p.count >= parsedMin && p.count <= parsedMax
//       )
//       : [];

//   const getPerSecondAlerts = () =>
//     thresholdsActive
//       ? perSecondData.filter((p) => p.avg_count > parsedMax)
//       : [];

//   const getPerSecondSafe = () =>
//     thresholdsActive
//       ? perSecondData.filter(
//         (p) => p.avg_count >= parsedMin && p.avg_count <= parsedMax
//       )
//       : [];

//   const getFrameAlerts = () =>
//     thresholdsActive
//       ? frameSeries.filter((p) => p.count > parsedMax)
//       : [];

//   const getFrameSafe = () =>
//     thresholdsActive
//       ? frameSeries.filter(
//         (p) => p.count >= parsedMin && p.count <= parsedMax
//       )
//       : [];

//   return (
//     <>
//       <div style={styles.page}>
//         <div style={styles.content}>
//           {/* TOP BAR */}
//           <div style={styles.topBar}>
//             <button style={styles.backBtn} onClick={() => navigate(-1)}>
//               ← Back
//             </button>

//             <div style={styles.brandBlock}>
//               <div style={styles.brand}>VigilNet Dashboard</div>
//               <div style={styles.header}>Historical Crowd Analytics</div>
//               <div style={styles.subtitle}>
//                 Upload model outputs as CSV and explore time-based crowd trends
//                 for research, debugging, and reporting.
//               </div>
//             </div>
//           </div>

//           {/* THEORY CARD */}
//           <div style={styles.theoryCard}>
//             <div style={styles.theoryTitle}>Why this dashboard matters</div>
//             <div style={styles.theoryHeading}>
//               From raw CSV logs to decisions you can defend
//             </div>
//             <p style={styles.theoryText}>
//               VigilNet’s historical dashboard turns timestamp–count logs into a
//               visual narrative. Instead of scanning thousands of rows in Excel
//               or terminal prints, you get an immediate sense of where crowd
//               density spikes, how long risk levels persist, and whether your
//               models behave consistently across events and days.
//             </p>
//             <ul style={styles.theoryList}>
//               <li>
//                 <strong>Model evaluation:</strong> overlay time and crowd count
//                 to spot drift, undercounting, or saturation.
//               </li>
//               <li>
//                 <strong>Operational insight:</strong> identify peak windows,
//                 entry bottlenecks, and exit clearing times.
//               </li>
//               <li>
//                 <strong>Professional reporting:</strong> graphs exported from
//                 here can go directly into BTP reports, papers, or presentations.
//               </li>
//             </ul>
//           </div>

//           {/* MAIN ROW */}
//           <div style={styles.mainRow}>
//             {/* LEFT COLUMN: HISTORY */}
//             <div style={styles.leftCol}>
//               <div style={styles.historyCard}>
//                 <div style={styles.historyTitle}>Upload history</div>
//                 <div style={styles.historySub}>
//                   Recent CSV files processed on this dashboard.
//                 </div>

//                 {history.length === 0 ? (
//                   <div style={styles.historyEmpty}>
//                     No files analyzed yet. Upload a CSV to start building your
//                     history.
//                   </div>
//                 ) : (
//                   <ul style={styles.historyList}>
//                     {history.map((item, idx) => (
//                       <li key={idx} style={styles.historyItem}>
//                         <div style={styles.historyName}>{item.name}</div>
//                         <div style={styles.historyMeta}>
//                           {item.points} points · {item.uploadedAt}
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>

//             {/* RIGHT COLUMN: UPLOAD + GRAPHS */}
//             <div style={styles.rightCol}>
//               {/* CSV Upload + Thresholds */}
//               <div style={styles.graphBox}>
//                 <div style={styles.graphTitle}>Upload CSV file</div>
//                 <div style={styles.graphSubtitle}>
//                   Expected format:&nbsp;
//                   <code>timestamp_ns, frame_index, count</code>
//                 </div>

//                 <input
//                   type="file"
//                   accept=".csv"
//                   onChange={(e) => setCsvFile(e.target.files[0])}
//                   style={styles.fileInput}
//                 />

//                 <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
//                   <button onClick={handleCSVUpload} style={styles.actionBtn}>
//                     {loading ? "Processing..." : "Upload & Process"}
//                   </button>


//                   <button onClick={resetView} style={styles.resetBtn}>
//                     Clear / Refresh
//                   </button>
//                 </div>


//                 {csvFile && (
//                   <div style={styles.selectedFile}>
//                     Selected file: {csvFile.name}
//                   </div>
//                 )}

//                 {/* Threshold controls */}
//                 <div style={styles.thresholdRow}>
//                   <span>Thresholds:</span>
//                   <span>Min (safe start)</span>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={minThreshold}
//                     onChange={(e) => setMinThreshold(e.target.value)}
//                     style={styles.thresholdInput}
//                     placeholder="e.g. 100"
//                   />
//                   <span>Max (alert)</span>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={maxThreshold}
//                     onChange={(e) => setMaxThreshold(e.target.value)}
//                     style={styles.thresholdInput}
//                     placeholder="e.g. 150"
//                   />
//                 </div>

//                 {summary && (
//                   <div style={styles.summaryRow}>
//                     <span style={styles.summaryChip}>
//                       Min count: {summary.min_count.toFixed(2)}
//                     </span>
//                     <span style={styles.summaryChip}>
//                       Max count: {summary.max_count.toFixed(2)}
//                     </span>
//                     <span style={styles.summaryChip}>
//                       Mean count: {summary.mean_count.toFixed(2)}
//                     </span>
//                     <span style={styles.summaryChip}>
//                       Points: {summary.num_points}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* GRAPH 1: Time-series trend */}
//               <div style={styles.graphBox}>
//                 <div style={styles.graphTitle}>
//                   Crowd trends (time-series)
//                 </div>
//                 <div style={styles.graphSubtitle}>
//                   time_sec vs count – green = within safe range, red = above
//                   alert threshold.
//                 </div>

//                 <button
//                   style={styles.detailBtn}
//                   onClick={() => setShowTimeDetails((prev) => !prev)}
//                 >
//                   {showTimeDetails ? "Hide details" : "Show details"}
//                 </button>

//                 <div style={styles.graphArea}>
//                   {graphData.length === 0 ? (
//                     <div style={styles.graphPlaceholder}>
//                       Upload a CSV file to render the time–series chart.
//                     </div>
//                   ) : (
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={graphData}>
//                         <XAxis
//                           dataKey="timestamp"
//                           tick={{ fill: "#93c5fd", fontSize: 11 }}
//                           label={{
//                             value: "Time (sec)",
//                             position: "insideBottom",
//                             offset: -4,
//                             fill: "#6b7280",
//                             fontSize: 11,
//                           }}
//                         />
//                         <YAxis
//                           tick={{ fill: "#93c5fd", fontSize: 11 }}
//                           label={{
//                             value: "Count",
//                             angle: -90,
//                             position: "insideLeft",
//                             fill: "#6b7280",
//                             fontSize: 11,
//                           }}
//                         />
//                         <Tooltip
//                           contentStyle={{
//                             backgroundColor: "#020617",
//                             border: "1px solid #1e293b",
//                             borderRadius: 8,
//                             fontSize: 11,
//                           }}
//                           labelStyle={{ color: "#e5e7eb" }}
//                         />
//                         {thresholdsActive && (
//                           <>
//                             <ReferenceLine
//                               y={parsedMin}
//                               stroke={GREEN}
//                               strokeDasharray="3 3"
//                               label={{
//                                 value: "Min safe",
//                                 fill: GREEN,
//                                 fontSize: 10,
//                               }}
//                             />
//                             <ReferenceLine
//                               y={parsedMax}
//                               stroke={RED}
//                               strokeDasharray="3 3"
//                               label={{
//                                 value: "Max alert",
//                                 fill: RED,
//                                 fontSize: 10,
//                               }}
//                             />
//                           </>
//                         )}
//                         <Line
//                           type="monotone"
//                           dataKey="count"
//                           stroke={BLUE}
//                           strokeWidth={2}
//                           dot={(props) => renderColoredDot(props)}
//                           activeDot={{ r: 5 }}
//                         />

//                       </LineChart>
//                     </ResponsiveContainer>
//                   )}
//                 </div>

//                 {showTimeDetails && thresholdsActive && (
//                   <div style={styles.detailPanel}>
//                     <div style={styles.detailSectionTitle}>
//                       Alert points (count &gt; max)
//                     </div>
//                     {getTimeAlerts().length === 0 ? (
//                       <div>No alert points.</div>
//                     ) : (
//                       getTimeAlerts().map((p, idx) => (
//                         <div key={`ta-${idx}`}>
//                           t = {p.timestamp}, count = {p.count.toFixed(3)}
//                         </div>
//                       ))
//                     )}
//                     <div style={styles.detailSectionTitle}>
//                       Safe points (between min &amp; max)
//                     </div>
//                     {getTimeSafe().length === 0 ? (
//                       <div>No safe points based on current thresholds.</div>
//                     ) : (
//                       getTimeSafe().map((p, idx) => (
//                         <div key={`ts-${idx}`}>
//                           t = {p.timestamp}, count = {p.count.toFixed(3)}
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* GRAPH 2: Per-second average (bar chart) */}
//               <div style={styles.graphBox}>
//                 <div style={styles.graphTitle}>
//                   Per-second average crowd level
//                 </div>
//                 <div style={styles.graphSubtitle}>
//                   Bars show average count per whole second – green safe, red
//                   alert.
//                 </div>

//                 <button
//                   style={styles.detailBtn}
//                   onClick={() =>
//                     setShowPerSecondDetails((prev) => !prev)
//                   }
//                 >
//                   {showPerSecondDetails ? "Hide details" : "Show details"}
//                 </button>

//                 <div style={styles.graphArea}>
//                   {perSecondData.length === 0 ? (
//                     <div style={styles.graphPlaceholder}>
//                       Upload a CSV to see per-second averages.
//                     </div>
//                   ) : (
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={perSecondData}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis
//                           dataKey="second"
//                           tick={{ fill: "#93c5fd", fontSize: 11 }}
//                           label={{
//                             value: "Second",
//                             position: "insideBottom",
//                             offset: -4,
//                             fill: "#6b7280",
//                             fontSize: 11,
//                           }}
//                         />
//                         <YAxis
//                           tick={{ fill: "#93c5fd", fontSize: 11 }}
//                           label={{
//                             value: "Avg Count",
//                             angle: -90,
//                             position: "insideLeft",
//                             fill: "#6b7280",
//                             fontSize: 11,
//                           }}
//                         />
//                         <Tooltip
//                           contentStyle={{
//                             backgroundColor: "#020617",
//                             border: "1px solid #1e293b",
//                             borderRadius: 8,
//                             fontSize: 11,
//                           }}
//                           labelStyle={{ color: "#e5e7eb" }}
//                         />
//                         <Legend />
//                         <Bar dataKey="avg_count" name="Avg count">
//                           {perSecondData.map((entry, index) => {
//                             const v = entry.avg_count;
//                             let fillColor = "#60a5fa";
//                             if (thresholdsActive) {
//                               if (v > parsedMax) fillColor = RED;
//                               else if (
//                                 v >= parsedMin &&
//                                 v <= parsedMax
//                               )
//                                 fillColor = GREEN;
//                               else fillColor = AMBER;
//                             }
//                             return (
//                               <Cell key={`cell-${index}`} fill={fillColor} />
//                             );
//                           })}
//                         </Bar>
//                         {thresholdsActive && (
//                           <>
//                             <ReferenceLine
//                               y={parsedMin}
//                               stroke={GREEN}
//                               strokeDasharray="3 3"
//                             />
//                             <ReferenceLine
//                               y={parsedMax}
//                               stroke={RED}
//                               strokeDasharray="3 3"
//                             />
//                           </>
//                         )}
//                       </BarChart>
//                     </ResponsiveContainer>
//                   )}
//                 </div>

//                 {showPerSecondDetails && thresholdsActive && (
//                   <div style={styles.detailPanel}>
//                     <div style={styles.detailSectionTitle}>
//                       Alert seconds (avg &gt; max)
//                     </div>
//                     {getPerSecondAlerts().length === 0 ? (
//                       <div>No alert seconds.</div>
//                     ) : (
//                       getPerSecondAlerts().map((p, idx) => (
//                         <div key={`pa-${idx}`}>
//                           second = {p.second}, avg ={" "}
//                           {p.avg_count.toFixed(3)}
//                         </div>
//                       ))
//                     )}
//                     <div style={styles.detailSectionTitle}>
//                       Safe seconds (between min &amp; max)
//                     </div>
//                     {getPerSecondSafe().length === 0 ? (
//                       <div>No safe seconds for current thresholds.</div>
//                     ) : (
//                       getPerSecondSafe().map((p, idx) => (
//                         <div key={`ps-${idx}`}>
//                           second = {p.second}, avg ={" "}
//                           {p.avg_count.toFixed(3)}
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* GRAPH 3: Frame index vs count */}
//               <div style={styles.graphBox}>
//                 <div style={styles.graphTitle}>
//                   Frame index vs crowd count
//                 </div>
//                 <div style={styles.graphSubtitle}>
//                   Helps you see how model behaves as frames progress.
//                 </div>

//                 <button
//                   style={styles.detailBtn}
//                   onClick={() => setShowFrameDetails((prev) => !prev)}
//                 >
//                   {showFrameDetails ? "Hide details" : "Show details"}
//                 </button>

//                 <div style={styles.graphArea}>
//                   {frameSeries.length === 0 ? (
//                     <div style={styles.graphPlaceholder}>
//                       Upload a CSV to see frame-based trend.
//                     </div>
//                   ) : (
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={frameSeries}>
//                         <XAxis
//                           dataKey="frame_index"
//                           tick={{ fill: "#93c5fd", fontSize: 11 }}
//                           label={{
//                             value: "Frame index",
//                             position: "insideBottom",
//                             offset: -4,
//                             fill: "#6b7280",
//                             fontSize: 11,
//                           }}
//                         />
//                         <YAxis
//                           tick={{ fill: "#93c5fd", fontSize: 11 }}
//                           label={{
//                             value: "Count",
//                             angle: -90,
//                             position: "insideLeft",
//                             fill: "#6b7280",
//                             fontSize: 11,
//                           }}
//                         />
//                         <Tooltip
//                           contentStyle={{
//                             backgroundColor: "#020617",
//                             border: "1px solid #1e293b",
//                             borderRadius: 8,
//                             fontSize: 11,
//                           }}
//                           labelStyle={{ color: "#e5e7eb" }}
//                         />
//                         {thresholdsActive && (
//                           <>
//                             <ReferenceLine
//                               y={parsedMin}
//                               stroke={GREEN}
//                               strokeDasharray="3 3"
//                             />
//                             <ReferenceLine
//                               y={parsedMax}
//                               stroke={RED}
//                               strokeDasharray="3 3"
//                             />
//                           </>
//                         )}
//                         <Line
//                           type="monotone"
//                           dataKey="count"
//                           stroke={CYAN}
//                           strokeWidth={2}
//                           dot={(props) => renderColoredDot(props)}
//                           activeDot={{ r: 5 }}
//                         />

//                       </LineChart>
//                     </ResponsiveContainer>
//                   )}
//                 </div>

//                 {showFrameDetails && thresholdsActive && (
//                   <div style={styles.detailPanel}>
//                     <div style={styles.detailSectionTitle}>
//                       Alert frames (count &gt; max)
//                     </div>
//                     {getFrameAlerts().length === 0 ? (
//                       <div>No alert frames.</div>
//                     ) : (
//                       getFrameAlerts().map((p, idx) => (
//                         <div key={`fa-${idx}`}>
//                           frame = {p.frame_index}, count ={" "}
//                           {p.count.toFixed(3)}
//                         </div>
//                       ))
//                     )}
//                     <div style={styles.detailSectionTitle}>
//                       Safe frames (between min &amp; max)
//                     </div>
//                     {getFrameSafe().length === 0 ? (
//                       <div>No safe frames for current thresholds.</div>
//                     ) : (
//                       getFrameSafe().map((p, idx) => (
//                         <div key={`fs-${idx}`}>
//                           frame = {p.frame_index}, count ={" "}
//                           {p.count.toFixed(3)}
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;


# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# import pandas as pd
# from io import BytesIO

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# def convert_timestamp_ns_to_seconds(ts_str: str):
#     """
#     Convert 'MM:SS:MS' like '00:00:400' -> seconds as float (0.4)
#     """
#     try:
#         parts = ts_str.split(":")
#         if len(parts) != 3:
#             return None
#         minutes = int(parts[0])
#         seconds = int(parts[1])
#         millis = int(parts[2])
#         total_seconds = minutes * 60 + seconds + millis / 1000.0
#         return total_seconds
#     except Exception:
#         return None


# @app.post("/upload-csv")
# async def upload_csv(file: UploadFile = File(...)):
#     """
#     CSV must contain: timestamp_ns, frame_index, count
#     Returns:
#       - records      -> used by your existing frontend graph
#       - time_series  -> time_sec vs count
#       - per_second   -> second vs avg_count
#       - frame_series -> frame_index vs count
#       - summary      -> stats
#     """
#     try:
#         raw = await file.read()
#         df = pd.read_csv(BytesIO(raw))

#         required_cols = {"timestamp_ns", "frame_index", "count"}
#         if not required_cols.issubset(df.columns):
#             return {
#                 "status": "error",
#                 "message": "CSV must contain columns: timestamp_ns, frame_index, count",
#                 "records": [],
#             }

#         # Convert timestamp_ns -> seconds
#         df["time_sec"] = df["timestamp_ns"].astype(str).apply(convert_timestamp_ns_to_seconds)
#         df = df.dropna(subset=["time_sec"])

#         # 1) time series: time_sec vs count
#         time_series_df = df[["time_sec", "count"]].copy()
#         time_series = time_series_df.to_dict(orient="records")

#         # 2) per-second avg (bucket)
#         df["sec_bucket"] = df["time_sec"].astype(int)
#         per_second_df = (
#             df.groupby("sec_bucket")["count"]
#             .mean()
#             .reset_index()
#             .rename(columns={"sec_bucket": "second", "count": "avg_count"})
#         )
#         per_second = per_second_df.to_dict(orient="records")

#         # 3) frame_index vs count
#         frame_series_df = df[["frame_index", "count"]].copy()
#         frame_series = frame_series_df.to_dict(orient="records")

#         # Summary
#         summary = {
#             "min_count": float(df["count"].min()),
#             "max_count": float(df["count"].max()),
#             "mean_count": float(df["count"].mean()),
#             "num_points": int(len(df)),
#         }

#         # ✅ Compatibility for existing frontend:
#         # make a `records` array with `timestamp` and `count`
#         records = [
#             {"timestamp": row["time_sec"], "count": row["count"]}
#             for row in time_series
#         ]

#         return {
#             "status": "success",
#             "records": records,          # <-- your React uses this
#             "time_series": time_series,
#             "per_second": per_second,
#             "frame_series": frame_series,
#             "summary": summary,
#         }

#     except Exception as e:
#         return {
#             "status": "error",
#             "message": f"Failed to process CSV: {str(e)}",
#             "records": [],
#         }




// after more
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   CartesianGrid,
//   Legend,
//   Cell,
//   ReferenceLine,
// } from "recharts";

// function useWindowWidth() {
//   const [width, setWidth] = useState(window.innerWidth);
//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return width;
// }

// function Dashboard() {
//   const navigate = useNavigate();

//   const [csvFile, setCsvFile] = useState(null);

//   // filtered data used by graphs
//   const [graphData, setGraphData] = useState([]); // time-series records
//   const [perSecondData, setPerSecondData] = useState([]);
//   const [frameSeries, setFrameSeries] = useState([]);
//   const [summary, setSummary] = useState(null);

//   // raw (unfiltered) data for date filtering
//   const [rawGraphData, setRawGraphData] = useState([]);
//   const [rawPerSecondData, setRawPerSecondData] = useState([]);
//   const [rawFrameSeries, setRawFrameSeries] = useState([]);

//   const [availableDates, setAvailableDates] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]); // left-side history
//   const [selectedHistory, setSelectedHistory] = useState(null);


//   // thresholds
//   const [minThreshold, setMinThreshold] = useState("");
//   const [maxThreshold, setMaxThreshold] = useState("");

//   // details toggles
//   const [showTimeDetails, setShowTimeDetails] = useState(false);
//   const [showPerSecondDetails, setShowPerSecondDetails] = useState(false);
//   const [showFrameDetails, setShowFrameDetails] = useState(false);

//   const width = useWindowWidth();
//   const isMobile = width < 700;

//   // parsed thresholds
//   const parsedMin = parseFloat(minThreshold);
//   const parsedMax = parseFloat(maxThreshold);
//   const thresholdsActive =
//     !Number.isNaN(parsedMin) && !Number.isNaN(parsedMax);

//   // Theme colors
//   const BG = "#020617";
//   const BLUE = "#3b82f6";
//   const CYAN = "#0ea5e9";
//   const GREEN = "#22c55e";
//   const RED = "#ef4444";
//   const AMBER = "#facc15";

//   const styles = {
//     page: {
//       minHeight: "100vh",
//       backgroundColor: BG,
//       fontFamily:
//         "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//       display: "flex",
//       justifyContent: "center",
//       padding: isMobile ? "18px 4vw 32px" : "28px 28px 40px",
//       boxSizing: "border-box",
//     },
//     content: {
//       width: "100%",
//       maxWidth: 1120,
//       display: "flex",
//       flexDirection: "column",
//       gap: isMobile ? 16 : 20,
//       animation: "fadeIn 0.5s ease-in",
//     },
//     topBar: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "flex-start",
//       gap: 16,
//       flexWrap: "wrap",
//     },
//     backBtn: {
//       borderRadius: 999,
//       border: "1px solid #1e293b",
//       backgroundColor: "transparent",
//       color: "#9ca3af",
//       padding: "7px 16px",
//       fontSize: 13,
//       cursor: "pointer",
//     },
//     brandBlock: {
//       display: "flex",
//       flexDirection: "column",
//       gap: 2,
//       textAlign: "left",
//     },
//     brand: {
//       fontSize: 11,
//       textTransform: "uppercase",
//       letterSpacing: "0.23em",
//       color: "#6b7280",
//     },
//     header: {
//       fontWeight: 600,
//       fontSize: isMobile ? "1.25rem" : "1.6rem",
//       color: "#e5e7eb",
//     },
//     subtitle: {
//       fontSize: 12,
//       color: "#9ca3af",
//     },

//     theoryCard: {
//       background: "radial-gradient(circle at top left, #020617, #020617 60%)",
//       borderRadius: 18,
//       padding: isMobile ? "14px 14px" : "18px 18px",
//       boxShadow: "0 24px 52px rgba(15,23,42,0.9)",
//       border: "1px solid #111827",
//     },
//     theoryTitle: {
//       fontSize: 14,
//       textTransform: "uppercase",
//       letterSpacing: "0.18em",
//       color: "#9ca3af",
//       marginBottom: 8,
//     },
//     theoryHeading: {
//       fontSize: 15,
//       fontWeight: 600,
//       color: "#e5e7eb",
//       marginBottom: 8,
//     },
//     theoryText: {
//       fontSize: 13,
//       color: "#9ca3af",
//       lineHeight: 1.65,
//     },
//     theoryList: {
//       marginTop: 10,
//       paddingLeft: 18,
//       fontSize: 13,
//       color: "#9ca3af",
//       lineHeight: 1.6,
//     },

//     mainRow: {
//       display: "flex",
//       flexDirection: isMobile ? "column" : "row",
//       gap: 18,
//       alignItems: "flex-start",
//     },
//     leftCol: {
//       flex: isMobile ? "unset" : "0 0 280px",
//       width: isMobile ? "100%" : 280,
//       display: "flex",
//       flexDirection: "column",
//       gap: 14,
//     },
//     rightCol: {
//       flex: 1,
//       display: "flex",
//       flexDirection: "column",
//       gap: 14,
//     },

//     historyCard: {
//       background: "radial-gradient(circle at top, #020617, #020617 70%)",
//       borderRadius: 18,
//       padding: isMobile ? "14px 14px" : "16px 16px",
//       boxShadow: "0 22px 50px rgba(15,23,42,0.9)",
//       border: "1px solid #111827",
//     },
//     historyTitle: {
//       fontSize: 14,
//       color: "#93c5fd",
//       fontWeight: 600,
//       marginBottom: 6,
//     },
//     historySub: {
//       fontSize: 12,
//       color: "#6b7280",
//       marginBottom: 10,
//     },
//     historyList: {
//       margin: 0,
//       padding: 0,
//       listStyle: "none",
//       maxHeight: 260,
//       overflowY: "auto",
//     },
//     historyItem: {
//       padding: "7px 0",
//       borderBottom: "1px solid rgba(15,23,42,0.9)",
//     },
//     historyName: {
//       fontSize: 13,
//       color: "#e5e7eb",
//       marginBottom: 2,
//       wordBreak: "break-all",
//     },
//     historyMeta: {
//       fontSize: 11,
//       color: "#9ca3af",
//     },
//     historyEmpty: {
//       fontSize: 12,
//       color: "#6b7280",
//       marginTop: 6,
//     },

//     graphBox: {
//       background: "radial-gradient(circle at top right, #020617, #020617 70%)",
//       borderRadius: 18,
//       border: "1px solid #111827",
//       boxShadow: "0 24px 52px rgba(15,23,42,0.95)",
//       padding: isMobile ? "16px 12px 20px" : "18px 18px 24px",
//       display: "flex",
//       flexDirection: "column",
//       gap: 10,
//     },
//     graphTitle: {
//       fontSize: 14,
//       color: BLUE,
//       fontWeight: 600,
//     },
//     graphSubtitle: {
//       fontSize: 12,
//       color: "#6b7280",
//     },
//     fileInput: {
//       marginTop: 8,
//       marginBottom: 10,
//       padding: 7,
//       borderRadius: 10,
//       background: BG,
//       color: "#e5e7eb",
//       border: "1px solid #111827",
//       fontSize: 13,
//     },
//     resetBtn: {
//       backgroundColor: "#10b981",
//       color: "#fff",
//       padding: "8px 20px",
//       borderRadius: 999,
//       cursor: "pointer",
//       border: "none",
//       fontWeight: 600,
//     },
//     actionBtn: {
//       backgroundColor: CYAN,
//       color: "#0b1120",
//       cursor: "pointer",
//       border: "none",
//       fontWeight: 600,
//       padding: "7px 16px",
//       borderRadius: 999,
//       fontSize: 13,
//     },
//     selectedFile: {
//       marginTop: 8,
//       fontSize: 12,
//       color: "#93c5fd",
//       wordBreak: "break-all",
//     },

//     graphArea: {
//       width: "100%",
//       height: 320,
//       marginTop: 4,
//     },
//     graphPlaceholder: {
//       flex: 1,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: 13,
//       color: CYAN,
//       borderRadius: 12,
//       border: "1px dashed #1e293b",
//     },
//     summaryRow: {
//       display: "flex",
//       flexWrap: "wrap",
//       gap: 10,
//       fontSize: 12,
//       color: "#9ca3af",
//       marginTop: 4,
//     },
//     summaryChip: {
//       padding: "4px 10px",
//       borderRadius: 999,
//       border: "1px solid #1e293b",
//     },
//     thresholdRow: {
//       display: "flex",
//       flexWrap: "wrap",
//       gap: 8,
//       marginTop: 10,
//       alignItems: "center",
//       fontSize: 12,
//       color: "#9ca3af",
//     },
//     thresholdInput: {
//       width: 90,
//       padding: "4px 8px",
//       borderRadius: 999,
//       border: "1px solid #1f2937",
//       backgroundColor: "#020617",
//       color: "#e5e7eb",
//       fontSize: 12,
//       outline: "none",
//     },
//     detailBtn: {
//       alignSelf: "flex-end",
//       marginTop: 4,
//       padding: "4px 10px",
//       fontSize: 11,
//       borderRadius: 999,
//       border: "1px solid #1f2937",
//       backgroundColor: "#020617",
//       color: "#9ca3af",
//       cursor: "pointer",
//     },
//     detailPanel: {
//       marginTop: 8,
//       padding: "8px 10px",
//       borderRadius: 12,
//       border: "1px solid #1f2937",
//       backgroundColor: "#020617",
//       fontSize: 11,
//       maxHeight: 160,
//       overflowY: "auto",
//       lineHeight: 1.5,
//     },
//     detailSectionTitle: {
//       fontWeight: 600,
//       marginTop: 4,
//       marginBottom: 2,
//       fontSize: 11,
//     },
//     dateSelect: {
//       padding: "4px 8px",
//       borderRadius: 999,
//       border: "1px solid #1f2937",
//       backgroundColor: "#020617",
//       color: "#e5e7eb",
//       fontSize: 12,
//       outline: "none",
//     },
//     filterBtn: {
//       backgroundColor: BLUE,
//       color: "#f9fafb",
//       border: "none",
//       borderRadius: 999,
//       padding: "6px 14px",
//       fontSize: 12,
//       cursor: "pointer",
//       fontWeight: 500,
//     },
//   };

//   // custom dot renderer for line charts based on thresholds
//   const renderColoredDot = (props) => {
//     const { cx, cy, payload } = props;
//     const value = payload.count;
//     let fill = "#60a5fa";

//     if (thresholdsActive) {
//       if (value > parsedMax) fill = RED; // alert
//       else if (value >= parsedMin && value <= parsedMax) fill = GREEN; // safe
//       else fill = AMBER; // below min
//     }

//     return (
//       <circle cx={cx} cy={cy} r={3} fill={fill} stroke={BG} strokeWidth={1} />
//     );
//   };

//   // apply date filter to all datasets
//   const applyDateFilter = (date, recordsSrc, perSecondSrc, frameSrc) => {
//     if (!date) {
//       setGraphData(recordsSrc);
//       setPerSecondData(perSecondSrc);
//       setFrameSeries(frameSrc);
//       return;
//     }

//     const filteredRecords = recordsSrc.filter((r) => r.date === date);
//     const filteredPerSecond = perSecondSrc.filter((r) => r.date === date);
//     const filteredFrame = frameSrc.filter((r) => r.date === date);

//     setGraphData(filteredRecords);
//     setPerSecondData(filteredPerSecond);
//     setFrameSeries(filteredFrame);
//   };

//   const handleCSVUpload = async () => {
//     if (!csvFile) {
//       alert("Please select a CSV file first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", csvFile);

//     setLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/upload-csv", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.status === "error") {
//         alert(data.message || "Error processing CSV");
//         setLoading(false);
//         return;
//       }

//       const records = data.records || [];
//       const perSecondAll = data.per_second || [];
//       const frameAll = data.frame_series || [];

//       // store raw (unfiltered)
//       setRawGraphData(records);
//       setRawPerSecondData(perSecondAll);
//       setRawFrameSeries(frameAll);

//       // collect unique dates from records
//       const uniqueDates = Array.from(
//         new Set(records.map((r) => r.date).filter(Boolean))
//       );

//       setAvailableDates(uniqueDates);
//       const initialDate = uniqueDates[0] || "";
//       setSelectedDate(initialDate);

//       // apply initial filter (first date or all)
//       applyDateFilter(initialDate, records, perSecondAll, frameAll);

//       setSummary(data.summary || null);

//       // setHistory((prev) => [
//       //   {
//       //     name: csvFile.name,
//       //     uploadedAt: new Date().toLocaleString(),
//       //     points: records.length,
//       //   },
//       //   ...prev,
//       // ]);
//       // Make sure summary exists before saving to history
//       const minVal =
//         data.summary && typeof data.summary.min_count !== "undefined"
//           ? data.summary.min_count
//           : "—";

//       const maxVal =
//         data.summary && typeof data.summary.max_count !== "undefined"
//           ? data.summary.max_count
//           : "—";

//       // Build history item
//       const newHistoryItem = {
//         name: csvFile.name,
//         uploadedAt: new Date().toLocaleString(),
//         points: records.length,
//         minCount: minVal,
//         maxCount: maxVal,
//       };

//       // Save into history
//       setHistory((prev) => [newHistoryItem, ...prev]);

//       // Select it automatically
//       setSelectedHistory(newHistoryItem);


//       setHistory((prev) => [newHistoryItem, ...prev]);
//       setSelectedHistory(newHistoryItem);

//     } catch (err) {
//       console.error("Error:", err);
//       alert("Failed to upload CSV");
//     }

//     setLoading(false);
//   };

//   const resetView = () => {
//     setCsvFile(null);
//     setGraphData([]);
//     setPerSecondData([]);
//     setFrameSeries([]);
//     setSummary(null);
//     setMinThreshold("");
//     setMaxThreshold("");
//     setShowTimeDetails(false);
//     setShowPerSecondDetails(false);
//     setShowFrameDetails(false);

//     setRawGraphData([]);
//     setRawPerSecondData([]);
//     setRawFrameSeries([]);
//     setAvailableDates([]);
//     setSelectedDate("");
//     setTimeout(() => {
//       window.location.reload();
//     }, 150);
//   };

//   // helpers for detail panels
//   const getTimeAlerts = () =>
//     thresholdsActive ? graphData.filter((p) => p.count > parsedMax) : [];

//   const getTimeSafe = () =>
//     thresholdsActive
//       ? graphData.filter(
//         (p) => p.count >= parsedMin && p.count <= parsedMax
//       )
//       : [];

//   const getPerSecondAlerts = () =>
//     thresholdsActive
//       ? perSecondData.filter((p) => p.avg_count > parsedMax)
//       : [];

//   const getPerSecondSafe = () =>
//     thresholdsActive
//       ? perSecondData.filter(
//         (p) => p.avg_count >= parsedMin && p.avg_count <= parsedMax
//       )
//       : [];

//   const getFrameAlerts = () =>
//     thresholdsActive ? frameSeries.filter((p) => p.count > parsedMax) : [];

//   const getFrameSafe = () =>
//     thresholdsActive
//       ? frameSeries.filter(
//         (p) => p.count >= parsedMin && p.count <= parsedMax
//       )
//       : [];

//   return (
//     <>
//       <div style={styles.page}>
//         <div style={styles.content}>
//           {/* TOP BAR */}
//           <div style={styles.topBar}>
//             <button style={styles.backBtn} onClick={() => navigate(-1)}>
//               ← Back
//             </button>

//             <div style={styles.brandBlock}>
//               <div style={styles.brand}>VigilNet Dashboard</div>
//               <div style={styles.header}>Historical Crowd Analytics</div>
//               <div style={styles.subtitle}>
//                 Upload model outputs as CSV and explore time-based crowd trends
//                 for research, debugging, and reporting.
//               </div>
//             </div>
//           </div>

//           {/* THEORY CARD */}
//           <div style={styles.theoryCard}>
//             <div style={styles.theoryTitle}>Why this dashboard matters</div>
//             <div style={styles.theoryHeading}>
//               From raw CSV logs to decisions you can defend
//             </div>
//             <p style={styles.theoryText}>
//               VigilNet’s historical dashboard turns date + timestamp + count
//               logs into a visual narrative. Instead of scanning thousands of
//               rows in Excel or terminal prints, you get an immediate sense of
//               where crowd density spikes, how long risk levels persist, and
//               whether your models behave consistently across days and events.
//             </p>
//             <ul style={styles.theoryList}>
//               <li>
//                 <strong>Model evaluation:</strong> overlay time and crowd count
//                 to spot drift, undercounting, or saturation.
//               </li>
//               <li>
//                 <strong>Operational insight:</strong> identify peak windows,
//                 entry bottlenecks, and exit clearing times.
//               </li>
//               <li>
//                 <strong>Professional reporting:</strong> graphs exported from
//                 here can go directly into BTP reports, papers, or presentations.
//               </li>
//             </ul>
//           </div>

//           {/* MAIN ROW */}
//           <div style={styles.mainRow}>
//             {/* LEFT COLUMN: HISTORY */}
//             <div style={styles.leftCol}>
//               <div style={styles.historyCard}>
//                 <div style={styles.historyTitle}>Upload history</div>
//                 <div style={styles.historySub}>
//                   Recent CSV files processed on this dashboard.
//                 </div>

//                 {history.length === 0 ? (
//                   <div style={styles.historyEmpty}>
//                     No files analyzed yet. Upload a CSV to start building your
//                     history.
//                   </div>
//                 ) : (
//                   <>
//                     <ul style={styles.historyList}>
//                       {history.map((item, idx) => (
//                         <li
//                           key={idx}
//                           style={{
//                             ...styles.historyItem,
//                             cursor: "pointer",
//                             backgroundColor:
//                               selectedHistory === item
//                                 ? "rgba(15,23,42,0.8)"
//                                 : "transparent",
//                           }}
//                           onClick={() => setSelectedHistory(item)}
//                         >
//                           <div style={styles.historyName}>{item.name}</div>
//                           <div style={styles.historyMeta}>
//                             {item.points} points · {item.uploadedAt}
//                           </div>
//                         </li>
//                       ))}
//                     </ul>

//                     {selectedHistory && (
//                       <div
//                         style={{
//                           marginTop: 10,
//                           paddingTop: 8,
//                           borderTop: "1px solid rgba(15,23,42,0.9)",
//                           fontSize: 12,
//                           color: "#9ca3af",
//                         }}
//                       >
//                         <div>
//                           Min count:{" "}
//                           {selectedHistory.minCount?.toFixed
//                             ? selectedHistory.minCount.toFixed(2)
//                             : selectedHistory.minCount}
//                         </div>
//                         <div>
//                           Max count:{" "}
//                           {selectedHistory.maxCount?.toFixed
//                             ? selectedHistory.maxCount.toFixed(2)
//                             : selectedHistory.maxCount}
//                         </div>
//                         <div>Total points: {selectedHistory.points}</div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>


//             {/* RIGHT COLUMN: UPLOAD + GRAPHS */}
//             <div style={styles.rightCol}>
//               {/* CSV Upload + Thresholds + Date Filter */}
//               <div style={styles.graphBox}>
//                 <div style={styles.graphTitle}>Upload CSV file</div>
//                 <div style={styles.graphSubtitle}>
//                   Expected format:&nbsp;
//                   <code>date, timestamp_ns, frame_index, count</code>
//                 </div>

//                 <input
//                   type="file"
//                   accept=".csv"
//                   onChange={(e) => setCsvFile(e.target.files[0])}
//                   style={styles.fileInput}
//                 />

//                 <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
//                   <button onClick={handleCSVUpload} style={styles.actionBtn}>
//                     {loading ? "Processing..." : "Upload & Process"}
//                   </button>

//                   <button onClick={resetView} style={styles.resetBtn}>
//                     Clear / Refresh
//                   </button>
//                 </div>

//                 {csvFile && (
//                   <div style={styles.selectedFile}>
//                     Selected file: {csvFile.name}
//                   </div>
//                 )}

//                 {/* Threshold controls */}
//                 <div style={styles.thresholdRow}>
//                   <span>Thresholds:</span>
//                   <span>Min (safe start)</span>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={minThreshold}
//                     onChange={(e) => setMinThreshold(e.target.value)}
//                     style={styles.thresholdInput}
//                     placeholder="e.g. 100"
//                   />
//                   <span>Max (alert)</span>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={maxThreshold}
//                     onChange={(e) => setMaxThreshold(e.target.value)}
//                     style={styles.thresholdInput}
//                     placeholder="e.g. 150"
//                   />
//                 </div>

//                 {/* Date filter */}
//                 {availableDates.length > 0 && (
//                   <div style={styles.thresholdRow}>
//                     <span>Filter by date:</span>
//                     <select
//                       value={selectedDate}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         setSelectedDate(value);
//                         applyDateFilter(
//                           value,
//                           rawGraphData,
//                           rawPerSecondData,
//                           rawFrameSeries
//                         );
//                       }}
//                       style={styles.dateSelect}
//                     >
//                       <option value="">All Month</option>
//                       {availableDates.map((d) => (
//                         <option key={d} value={d}>
//                           {d}
//                         </option>
//                       ))}
//                     </select>
//                     <button
//                       style={styles.filterBtn}
//                       onClick={() =>
//                         applyDateFilter(
//                           selectedDate,
//                           rawGraphData,
//                           rawPerSecondData,
//                           rawFrameSeries
//                         )
//                       }
//                     >
//                       FILTER
//                     </button>
//                   </div>
//                 )}

//                 {summary && (
//                   <div style={styles.summaryRow}>
//                     <span style={styles.summaryChip}>
//                       Min count: {summary.min_count.toFixed(2)}
//                     </span>
//                     <span style={styles.summaryChip}>
//                       Max count: {summary.max_count.toFixed(2)}
//                     </span>
//                     <span style={styles.summaryChip}>
//                       Mean count: {summary.mean_count.toFixed(2)}
//                     </span>
//                     <span style={styles.summaryChip}>
//                       Points: {summary.num_points}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* GRAPH 1: Time-series trend */}
//               <div style={styles.graphBox}>
//                 <div style={styles.graphTitle}>
//                   Crowd trends (time-series)
//                 </div>
//                 <div style={styles.graphSubtitle}>
//                   time_sec vs count – green = within safe range, red = above
//                   alert threshold.
//                 </div>

//                 <button
//                   style={styles.detailBtn}
//                   onClick={() => setShowTimeDetails((prev) => !prev)}
//                 >
//                   {showTimeDetails ? "Hide details" : "Show details"}
//                 </button>

//                 <div style={styles.graphArea}>
//                   {graphData.length === 0 ? (
//                     <div style={styles.graphPlaceholder}>
//                       Upload a CSV file to render the time–series chart.
//                     </div>
//                   ) : (
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={graphData}>
//                         <XAxis
//                           dataKey="timestamp"
//                           tick={{ fill: "#93c5fd", fontSize: 11 }}
//                           label={{
//                             value: "Time (sec)",
//                             position: "insideBottom",
//                             offset: -4,
//                             fill: "#6b7280",
//                             fontSize: 11,
//                           }}
//                         />
//                         <YAxis
//                           tick={{ fill: "#93c5fd", fontSize: 11 }}
//                           label={{
//                             value: "Count",
//                             angle: -90,
//                             position: "insideLeft",
//                             fill: "#6b7280",
//                             fontSize: 11,
//                           }}
//                         />
//                         <Tooltip
//                           contentStyle={{
//                             backgroundColor: "#020617",
//                             border: "1px solid #1e293b",
//                             borderRadius: 8,
//                             fontSize: 11,
//                           }}
//                           labelStyle={{ color: "#e5e7eb" }}
//                         />
//                         {thresholdsActive && (
//                           <>
//                             <ReferenceLine
//                               y={parsedMin}
//                               stroke={GREEN}
//                               strokeDasharray="3 3"
//                               label={{
//                                 value: "Min safe",
//                                 fill: GREEN,
//                                 fontSize: 10,
//                               }}
//                             />
//                             <ReferenceLine
//                               y={parsedMax}
//                               stroke={RED}
//                               strokeDasharray="3 3"
//                               label={{
//                                 value: "Max alert",
//                                 fill: RED,
//                                 fontSize: 10,
//                               }}
//                             />
//                           </>
//                         )}
//                         <Line
//                           type="monotone"
//                           dataKey="count"
//                           stroke={BLUE}
//                           strokeWidth={2}
//                           dot={(props) => renderColoredDot(props)}
//                           activeDot={{ r: 5 }}
//                         />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   )}
//                 </div>

//                 {showTimeDetails && thresholdsActive && (
//                   <div style={styles.detailPanel}>
//                     <div style={styles.detailSectionTitle}>
//                       Alert points (count &gt; max)
//                     </div>
//                     {getTimeAlerts().length === 0 ? (
//                       <div>No alert points.</div>
//                     ) : (
//                       getTimeAlerts().map((p, idx) => (
//                         <div key={`ta-${idx}`}>
//                           date = {p.date}, t = {p.timestamp}, count ={" "}
//                           {p.count.toFixed(3)}
//                         </div>
//                       ))
//                     )}
//                     <div style={styles.detailSectionTitle}>
//                       Safe points (between min &amp; max)
//                     </div>
//                     {getTimeSafe().length === 0 ? (
//                       <div>No safe points based on current thresholds.</div>
//                     ) : (
//                       getTimeSafe().map((p, idx) => (
//                         <div key={`ts-${idx}`}>
//                           date = {p.date}, t = {p.timestamp}, count ={" "}
//                           {p.count.toFixed(3)}
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* GRAPH 2: Per-second average (bar chart) */}
//               <div style={styles.graphBox}>
//                 <div style={styles.graphTitle}>
//                   Per-second average crowd level
//                 </div>
//                 <div style={styles.graphSubtitle}>
//                   Bars show average count per whole second – green safe, red
//                   alert.
//                 </div>

//                 <button
//                   style={styles.detailBtn}
//                   onClick={() =>
//                     setShowPerSecondDetails((prev) => !prev)
//                   }
//                 >
//                   {showPerSecondDetails ? "Hide details" : "Show details"}
//                 </button>

//                 <div style={styles.graphArea}>
//                   {perSecondData.length === 0 ? (
//                     <div style={styles.graphPlaceholder}>
//                       Upload a CSV to see per-second averages.
//                     </div>
//                   ) : (
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={perSecondData}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis
//                           dataKey="second"
//                           tick={{ fill: "#93c5fd", fontSize: 11 }}
//                           label={{
//                             value: "Second",
//                             position: "insideBottom",
//                             offset: -4,
//                             fill: "#6b7280",
//                             fontSize: 11,
//                           }}
//                         />
//                         <YAxis
//                           tick={{ fill: "#93c5fd", fontSize: 11 }}
//                           label={{
//                             value: "Avg Count",
//                             angle: -90,
//                             position: "insideLeft",
//                             fill: "#6b7280",
//                             fontSize: 11,
//                           }}
//                         />
//                         <Tooltip
//                           contentStyle={{
//                             backgroundColor: "#020617",
//                             border: "1px solid #1e293b",
//                             borderRadius: 8,
//                             fontSize: 11,
//                           }}
//                           labelStyle={{ color: "#e5e7eb" }}
//                         />
//                         <Legend />
//                         <Bar dataKey="avg_count" name="Avg count">
//                           {perSecondData.map((entry, index) => {
//                             const v = entry.avg_count;
//                             let fillColor = "#60a5fa";
//                             if (thresholdsActive) {
//                               if (v > parsedMax) fillColor = RED;
//                               else if (v >= parsedMin && v <= parsedMax)
//                                 fillColor = GREEN;
//                               else fillColor = AMBER;
//                             }
//                             return (
//                               <Cell key={`cell-${index}`} fill={fillColor} />
//                             );
//                           })}
//                         </Bar>
//                         {thresholdsActive && (
//                           <>
//                             <ReferenceLine
//                               y={parsedMin}
//                               stroke={GREEN}
//                               strokeDasharray="3 3"
//                             />
//                             <ReferenceLine
//                               y={parsedMax}
//                               stroke={RED}
//                               strokeDasharray="3 3"
//                             />
//                           </>
//                         )}
//                       </BarChart>
//                     </ResponsiveContainer>
//                   )}
//                 </div>

//                 {showPerSecondDetails && thresholdsActive && (
//                   <div style={styles.detailPanel}>
//                     <div style={styles.detailSectionTitle}>
//                       Alert seconds (avg &gt; max)
//                     </div>
//                     {getPerSecondAlerts().length === 0 ? (
//                       <div>No alert seconds.</div>
//                     ) : (
//                       getPerSecondAlerts().map((p, idx) => (
//                         <div key={`pa-${idx}`}>
//                           date = {p.date}, second = {p.second}, avg ={" "}
//                           {p.avg_count.toFixed(3)}
//                         </div>
//                       ))
//                     )}
//                     <div style={styles.detailSectionTitle}>
//                       Safe seconds (between min &amp; max)
//                     </div>
//                     {getPerSecondSafe().length === 0 ? (
//                       <div>No safe seconds for current thresholds.</div>
//                     ) : (
//                       getPerSecondSafe().map((p, idx) => (
//                         <div key={`ps-${idx}`}>
//                           date = {p.date}, second = {p.second}, avg ={" "}
//                           {p.avg_count.toFixed(3)}
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* GRAPH 3: Frame index vs count */}
//               <div style={styles.graphBox}>
//                 <div style={styles.graphTitle}>
//                   Frame index vs crowd count
//                 </div>
//                 <div style={styles.graphSubtitle}>
//                   Helps you see how model behaves as frames progress.
//                 </div>

//                 <button
//                   style={styles.detailBtn}
//                   onClick={() => setShowFrameDetails((prev) => !prev)}
//                 >
//                   {showFrameDetails ? "Hide details" : "Show details"}
//                 </button>

//                 <div style={styles.graphArea}>
//                   {frameSeries.length === 0 ? (
//                     <div style={styles.graphPlaceholder}>
//                       Upload a CSV to see frame-based trend.
//                     </div>
//                   ) : (
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={frameSeries}>
//                         <XAxis
//                           dataKey="frame_index"
//                           tick={{ fill: "#93c5fd", fontSize: 11 }}
//                           label={{
//                             value: "Frame index",
//                             position: "insideBottom",
//                             offset: -4,
//                             fill: "#6b7280",
//                             fontSize: 11,
//                           }}
//                         />
//                         <YAxis
//                           tick={{ fill: "#93c5fd", fontSize: 11 }}
//                           label={{
//                             value: "Count",
//                             angle: -90,
//                             position: "insideLeft",
//                             fill: "#6b7280",
//                             fontSize: 11,
//                           }}
//                         />
//                         <Tooltip
//                           contentStyle={{
//                             backgroundColor: "#020617",
//                             border: "1px solid #1e293b",
//                             borderRadius: 8,
//                             fontSize: 11,
//                           }}
//                           labelStyle={{ color: "#e5e7eb" }}
//                         />
//                         {thresholdsActive && (
//                           <>
//                             <ReferenceLine
//                               y={parsedMin}
//                               stroke={GREEN}
//                               strokeDasharray="3 3"
//                             />
//                             <ReferenceLine
//                               y={parsedMax}
//                               stroke={RED}
//                               strokeDasharray="3 3"
//                             />
//                           </>
//                         )}
//                         <Line
//                           type="monotone"
//                           dataKey="count"
//                           stroke={CYAN}
//                           strokeWidth={2}
//                           dot={(props) => renderColoredDot(props)}
//                           activeDot={{ r: 5 }}
//                         />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   )}
//                 </div>

//                 {showFrameDetails && thresholdsActive && (
//                   <div style={styles.detailPanel}>
//                     <div style={styles.detailSectionTitle}>
//                       Alert frames (count &gt; max)
//                     </div>
//                     {getFrameAlerts().length === 0 ? (
//                       <div>No alert frames.</div>
//                     ) : (
//                       getFrameAlerts().map((p, idx) => (
//                         <div key={`fa-${idx}`}>
//                           date = {p.date}, frame = {p.frame_index}, count ={" "}
//                           {p.count.toFixed(3)}
//                         </div>
//                       ))
//                     )}
//                     <div style={styles.detailSectionTitle}>
//                       Safe frames (between min &amp; max)
//                     </div>
//                     {getFrameSafe().length === 0 ? (
//                       <div>No safe frames for current thresholds.</div>
//                     ) : (
//                       getFrameSafe().map((p, idx) => (
//                         <div key={`fs-${idx}`}>
//                           date = {p.date}, frame = {p.frame_index}, count ={" "}
//                           {p.count.toFixed(3)}
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;
