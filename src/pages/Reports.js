// src/pages/WebsiteReportPage.js

import React from "react";





const Report = () => {
  const [hovered, setHovered] = React.useState(null);
  return (
    <div style={styles.page}>
      {/* Header / Hero */}
      <header style={styles.hero}>
        <div>
          <div style={styles.badgeRow}>
            <span style={styles.badgePrimary}>VigilNet</span>
            <span style={styles.badgeOutline}>Advanced Crowd Management Platform</span>
          </div>
          <h1 style={styles.title}>Crowd Management System – Web Platform Report</h1>
          <p style={styles.subtitle}>
            This page documents how the VigilNet web platform works end to end –
            from live video analytics and camera hindrance detection to CSV-based
            dashboards and alert visualization – in a format suitable for an
            engineering project, research demo, or hackathon evaluation.
          </p>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.heroStatCard}>
            <div style={styles.heroStatLabel}>Core Web Modules</div>
            <div style={styles.heroStatValue}>4</div>
            <div style={styles.heroStatFoot}>Home · Photo · Live · Dashboard</div>
          </div>
          <div style={styles.heroStatCard}>
            <div style={styles.heroStatLabel}>Backend Services</div>
            <div style={styles.heroStatValue}>3</div>
            <div style={styles.heroStatFoot}>Video · Image · CSV Analytics</div>
          </div>
        </div>
      </header>

      {/* Optional Architecture Image */}
      <section style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>1. System Snapshot & Architecture Overview</h2>
        <p style={styles.sectionText}>
          VigilNet is a real-time crowd monitoring and analytics platform. It connects
          computer vision models with a modern web interface to provide live crowd
          counts, safety alerts, and historical analysis using CSV data. The UI is
          intentionally minimal, data-focused, and suitable for technical presentations
          and academic reviews.
        </p>

        {/* Architecture Diagram Placeholder */}
        {/* <div style={styles.imageWrapper_architecture}> */}
        <div style={{
          ...styles.imageWrapper_architecture,
          ...(hovered === 'arch' && styles.imageWrapper_architectureHover)
        }}
          onMouseEnter={() => setHovered('arch')}
          onMouseLeave={() => setHovered(null)}
        >
          <img
            src="/vigilnet_architecture_1.png"
            alt="VigilNet Architecture"
            // 
            style={styles.imageZoom}

          />
          <div style={styles.imageCaptionSmall}>
            Figure 1: VigilNet System Architecture
          </div>
        </div>

        <div style={styles.summaryGrid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Purpose</h3>
            <p style={styles.cardText}>
              Monitor crowd density in real time, detect camera hindrance
              (frozen feed, lens covered, low contrast), and raise alerts to
              help prevent stampedes and dangerous congestion at high-density
              locations such as stations, events, and public gatherings.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Key Capabilities</h3>
            <ul style={styles.list}>
              <li>Live stream analysis with per-frame crowd count</li>
              <li>Photo-based crowd counting for still images</li>
              <li>CSV-driven analytics with multiple graphs and histograms</li>
              <li>Camera hindrance and capacity alerts with time-stamped logs</li>
            </ul>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Technology Stack</h3>
            <ul style={styles.list}>
              <li>Frontend: React, Recharts, custom responsive layout</li>
              <li>Backend: FastAPI, PyTorch (MC-CNN), OpenCV</li>
              <li>Data: In-memory CSV buffers via <code>StringIO</code></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Architecture Details */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>2. Website Architecture & Modules</h2>
        <p style={styles.sectionText}>
          The platform is structured as a set of focused pages in the frontend,
          backed by lightweight micro-services. Each major feature has a dedicated
          API, but the user experiences it as one integrated web application.
        </p>

        <div style={styles.archGrid}>
          <div style={styles.archColumn}>
            <h3 style={styles.cardTitle}>Frontend Modules</h3>
            <ul style={styles.list}>
              <li>
                <strong>Home / Main Page</strong> – Introduces VigilNet, explains
                the problem statement, and provides navigation to the Live Monitor,
                Photo Crowd Count, Analytics Dashboard, and this Report page.
              </li>
              <li>
                <strong>Photo Crowd Count Page</strong> – Upload a single image and
                get an estimated crowd count backed by the MC-CNN density model.
              </li>
              <li>
                <strong>Live Stream & Alerts Page</strong> – Connects to a video
                analysis session identified by a <code>run_id</code>, displays
                live counts and shows a real-time text log panel on the right.
              </li>
              <li>
                <strong>Analytics Dashboard Page</strong> – Uploads CSV files,
                parses timestamp, count and alert labels, and renders graphs for
                detailed analysis.
              </li>
            </ul>
          </div>

          <div style={styles.archColumn}>
            <h3 style={styles.cardTitle}>Backend Services</h3>
            <ul style={styles.list}>
              <li>
                <strong>Video Analysis Service</strong> – Reads frames from video
                or camera, runs the MC-CNN model, and continuously appends results
                into an in-memory CSV buffer (timestamp, frame index, count,
                alert). The frontend polls this via a <code>run_id</code>-based API.
              </li>
              <li>
                <strong>Image Analysis Service</strong> – Accepts a single uploaded
                crowd image and returns a predicted count and textual summary
                (safe / heavy / critical).
              </li>
              <li>
                <strong>CSV Analytics Service</strong> – Accepts CSV uploads from
                the live system or offline experiments, computes derived series
                (per-second averages, distributions), and returns them as JSON
                for chart rendering.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Website Modules – Detailed */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>3. Web Pages – Detailed Description</h2>

        {/* Home Page */}
        <div style={styles.moduleCard}>
          <div style={styles.moduleHeader}>
            <span style={styles.moduleBadge}>Module 1</span>
            <h3 style={styles.moduleTitle}>Home / Main Page</h3>
          </div>
          <p style={styles.cardText}>
            The main page acts as an entry point and explanation layer. It follows
            a simple navigation bar + hero layout, with concise text describing:
          </p>
          <ul style={styles.list}>
            <li>Problem statement: unmanaged crowds and safety risks</li>
            <li>Solution: real-time crowd analytics with automated alerts</li>
            <li>Quick cards for each feature (Live, Photo, Dashboard, Report)</li>
          </ul>
          <p style={styles.cardText}>
            Small status cards can show sample metrics, such as total frames
            analyzed, number of alerts detected, and time of last processed video,
            using either live backend data or demo JSON.
          </p>
        </div>

        {/* Photo Page + Screenshot */}
        <div style={styles.moduleCard}>
          <div style={styles.moduleHeader}>
            <span style={styles.moduleBadge}>Module 2</span>
            <h3 style={styles.moduleTitle}>Photo Crowd Count Page</h3>
          </div>
          <p style={styles.cardText}>
            This page is used to demonstrate single-image crowd counting. Users
            upload a still image (such as an aerial view of a crowd), and the
            frontend sends it to the image analysis API. The response provides:
          </p>
          <ul style={styles.list}>
            <li>Estimated crowd size based on density integration</li>
            <li>Short interpretation (e.g., normal, heavy, critical)</li>
            <li>Option to show or download a small textual summary</li>
          </ul>

          {/* <div style={styles.imageWrapper_photo_module}> */}
          <div style={{
          ...styles.imageWrapper_photo_module,
          ...(hovered === 'arch' && styles.imageWrapper_photo_moduleHover)
        }}
          onMouseEnter={() => setHovered('arch')}
          onMouseLeave={() => setHovered(null)}
        >
            <img
              src="/photo_module_screenshot.png"
              alt="Photo Crowd Count Page"
              style={styles.imageMedium}
            />
            <div style={styles.imageCaptionSmall}>
              Figure 2: Photo-based Crowd Count Module
            </div>
          </div>
        </div>

        {/* Live Stream Page + Screenshot */}
        <div style={styles.moduleCard}>
          <div style={styles.moduleHeader}>
            <span style={styles.moduleBadge}>Module 3</span>
            <h3 style={styles.moduleTitle}>Live Stream & Real-Time Alerts Page</h3>
          </div>
          <p style={styles.cardText}>
            The live module is designed to mimic an operations dashboard. When a
            video analysis run starts, a unique <code>run_id</code> is registered.
            The backend processes frames, stores results in an in-memory CSV, and
            the frontend periodically fetches the latest lines.
          </p>
          <ul style={styles.list}>
            <li>Left area: live or simulated video feed window</li>
            <li>
              Center / bottom area: current crowd count and short safety status
            </li>
            <li>
              Right panel: running text log showing recent CSV entries, including
              time, frame index, count and alert label
            </li>
          </ul>
          <p style={styles.cardText}>
            Alert labels include camera and crowd indicators such as:
            <code>camera_frozen</code>, <code>obstructed_or_low_edge_density</code>,{" "}
            <code>low_contrast</code>, and{" "}
            <code>lens_covered_or_extremely_dark</code>. These are displayed with
            different color codes (for example, green for safe, yellow for warning,
            red for critical).
          </p>

          {/* <div style={styles.imageWrapper_live_module}> */}
          <div style={{
          ...styles.imageWrapper_live_module,
          ...(hovered === 'arch' && styles.imageWrapper_live_moduleHover)
        }}
          onMouseEnter={() => setHovered('arch')}
          onMouseLeave={() => setHovered(null)}
        >
            <img
              src="/live_module_screenshot.png"
              alt="Live Stream Monitoring"
              style={styles.imageMedium}
            />
            <div style={styles.imageCaptionSmall}>
              Figure 3: Live Stream with Real-Time Alerts
            </div>
          </div>
        </div>

        {/* Dashboard Page + Screenshot */}
        {/* ------------------- DASHBOARD MODULE (UPDATED WITH 4 IMAGES) ------------------- */}
        <div style={styles.moduleCard}>
          <div style={styles.moduleHeader}>
            <span style={styles.moduleBadge}>Module 4</span>
            <h3 style={styles.moduleTitle}>Analytics Dashboard Page</h3>
          </div>

          <p style={styles.cardText}>
            The Analytics Dashboard provides a detailed view of CSV-based analysis,
            enabling time-series visualization, crowd rate estimation, and alert
            mapping. It is designed for data interpretation and presentation purposes.
          </p>

          <p style={styles.cardText}>Expected CSV format:</p>

          <pre style={styles.codeBlock}>
            {`date,timestamp_ns,count,alert
2025-12-03,00:00:000,150.11,SAFE
2025-12-05,0.0,299.642,Threshold_Exceeded
2025-12-05,5.417,133.802,SAFE
2025-12-05,5.833,0.000,Lens_Covered_or_Extremely_Dark
2025-12-05,7.083,0.000,Camera_Frozen
...`}
          </pre>

          <p style={styles.cardText}>The dashboard visualizes:</p>

         <ul style={styles.list}>
  <li>
    <strong>CSV Upload & Filtering</strong> — Import system-generated CSV data 
    and apply filters such as day-wise, month-wise, and year-wise to refine 
    analysis results.
  </li>

  <li>
    <strong>Day-wise Crowd Trends</strong> — Visualize time-series graphs 
    showing how crowd levels change throughout a selected day.
  </li>

  <li>
    <strong>Daily Status Distribution</strong> — Analyze how frequently 
    the system detected different crowd states (Safe, Warning, Critical) 
    during the selected day.
  </li>

  <li>
    <strong>Count Distribution Histogram</strong> — View a histogram representing 
    how often specific crowd count ranges occurred during that day.
  </li>
</ul>


          {/* ----- 4-IMAGE GALLERY FOR DASHBOARD ----- */}
          <div style={styles.imageGrid4}>
            {/* <div style={styles.imageWrapperSmall}> */}
            <div style={{
          ...styles.imageWrapperSmall,
          ...(hovered === 'img1' && styles.imageWrapperSmallHover)
        }}
          onMouseEnter={() => setHovered('img1')}
          onMouseLeave={() => setHovered(null)}
        >
              <img
                src="dashboard_screenshot1.png"
                alt="CSV Upload & Filtering"
                style={styles.imageSmall}
              />
              <div style={styles.imageCaption}>Figure A: Upload CSV file  & Filtering</div>
            </div>

            {/* <div style={styles.imageWrapperSmall}> */}
            <div style={{
          ...styles.imageWrapperSmall,
          ...(hovered === 'img2' && styles.imageWrapperSmallHover)
        }}
          onMouseEnter={() => setHovered('img2')}
          onMouseLeave={() => setHovered(null)}
        >
              <img
                src="/dashboard_screenshot2.png"
                alt="Day-wise Crowd Trends"
                style={styles.imageSmall}
              />
              <div style={styles.imageCaption}>Figure B: Crowd trends (time-series, per day)</div>
            </div>

            {/* <div style={styles.imageWrapperSmall}> */}
            <div style={{
          ...styles.imageWrapperSmall,
          ...(hovered === 'img3' && styles.imageWrapperSmallHover)
        }}
          onMouseEnter={() => setHovered('img3')}
          onMouseLeave={() => setHovered(null)}
        >
              <img
                src="/dashboard_screenshot3.png"
                alt="Daily Status Distribution"
                style={styles.imageSmall}
              />
              <div style={styles.imageCaption}>Figure C: Crowd status distribution (selected day)</div>
            </div>

            {/* <div style={styles.imageWrapperSmall}> */}
            <div style={{
          ...styles.imageWrapperSmall,
          ...(hovered === 'img4' && styles.imageWrapperSmallHover)
        }}
          onMouseEnter={() => setHovered('img4')}
          onMouseLeave={() => setHovered(null)}
        >
              <img
                src="dashboard_screenshot4.png"
                alt="Count Distribution Histogram"
                style={styles.imageSmall}
              />
              <div style={styles.imageCaption}>Figure D: Count distribution histogram (selected day)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Flow & Alerts */}
      <section style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>4. Data Flow & Alert Logic</h2>
        <div style={styles.summaryGrid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Data Flow</h3>
            <ol style={styles.list}>
              <li>Frames are read from video or live camera using OpenCV.</li>
              <li>Frames are resized and normalized for the MC-CNN model.</li>
              <li>The model generates a density map that is integrated to get a crowd count.</li>
              <li>
                Each processed frame is logged with timestamp, frame index, count
                and alert label into an in-memory CSV buffer.
              </li>
              <li>
                The frontend fetches updated CSV chunks and refreshes graphs and
                text logs without writing files to disk.
              </li>
            </ol>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Alert Logic (High Level)</h3>
            <ul style={styles.list}>
              <li>
                Capacity thresholds (for example, &gt; 85% and &gt; 95% of assumed
                venue capacity) mark warning and critical states.
              </li>
              <li>
                Camera health checks detect frozen frames, low edge density, very
                dark frames or covered lenses.
              </li>
              <li>
                Alert events are written into CSV and displayed immediately on
                the web interface for operator awareness.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Presentation & Evaluation */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>5. Presentation & Evaluation Readiness</h2>
        <p style={styles.sectionText}>
          The design of the VigilNet web interface focuses on clarity and
          technical depth rather than decoration. The layout, typography and
          dark theme are chosen to look appropriate in a lab, classroom or
          evaluation setting.
        </p>
        <ul style={styles.list}>
          <li>Neutral dark background with subtle gradients for better focus.</li>
          <li>Clear visual hierarchy between headings, cards and code blocks.</li>
          <li>Dedicated sections for architecture, modules, data flow and alerts.</li>
          <li>
            Explicit mention of models, APIs, CSV formats and limitations to
            support technical Q&A during viva or review.
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerRight}>
          <span style={styles.footerChip}>FastAPI · PyTorch · React</span>
          <span style={styles.footerChip}>Real-time crowd analytics platform</span>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px 40px 48px",
    background: "linear-gradient(180deg,#0f172a 0%,#020617 40%,#020617 100%)",
    color: "#e5e7eb",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    gap: "32px",
    marginBottom: "32px",
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  badgeRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "12px",
    flexWrap: "wrap",
  },
  badgePrimary: {
    background: "rgba(59,130,246,0.15)",
    border: "1px solid rgba(59,130,246,0.7)",
    color: "#bfdbfe",
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "999px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  badgeOutline: {
    border: "1px solid rgba(148,163,184,0.6)",
    color: "#cbd5f5",
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "999px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "8px",
    color: "#e5e7eb",
  },
  subtitle: {
    fontSize: "14px",
    color: "#9ca3af",
    maxWidth: "640px",
    lineHeight: 1.6,
  },
  heroRight: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: "220px",
  },
  heroStatCard: {
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.3), transparent 55%), rgba(15,23,42,0.9)",
    borderRadius: "16px",
    padding: "12px 16px",
    border: "1px solid rgba(148,163,184,0.4)",
    boxShadow: "0 18px 45px rgba(15,23,42,0.7)",
  },
  heroStatLabel: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: "#9ca3af",
    marginBottom: "6px",
  },
  heroStatValue: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#f9fafb",
  },
  heroStatFoot: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "4px",
  },
  section: {
    marginTop: "32px",
    marginBottom: "24px",
  },
  sectionAlt: {
    marginTop: "32px",
    marginBottom: "24px",
    padding: "20px 20px 16px",
    borderRadius: "20px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.6))",
    border: "1px solid rgba(55,65,81,0.8)",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: 600,
    marginBottom: "8px",
    color: "#e5e7eb",
  },
  sectionText: {
    fontSize: "14px",
    color: "#9ca3af",
    maxWidth: "900px",
    lineHeight: 1.7,
    marginBottom: "16px",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "16px",
    marginTop: "8px",
  },
  card: {
    background: "rgba(15,23,42,0.85)",
    borderRadius: "18px",
    padding: "14px 16px",
    border: "1px solid rgba(31,41,55,0.9)",
    boxShadow: "0 20px 40px rgba(15,23,42,0.9)",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: 600,
    marginBottom: "6px",
    color: "#e5e7eb",
  },
  cardText: {
    fontSize: "13px",
    color: "#9ca3af",
    lineHeight: 1.6,
  },
  list: {
    fontSize: "13px",
    color: "#9ca3af",
    paddingLeft: "18px",
    margin: 0,
    marginTop: "4px",
    lineHeight: 1.7,
  },
  archGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "20px",
    marginTop: "12px",
  },
  archColumn: {
    background: "rgba(15,23,42,0.9)",
    borderRadius: "18px",
    padding: "14px 16px",
    border: "1px solid rgba(31,41,55,0.9)",
  },
  moduleCard: {
    background: "rgba(15,23,42,0.95)",
    borderRadius: "18px",
    padding: "14px 16px",
    border: "1px solid rgba(31,41,55,0.9)",
    marginBottom: "12px",
  },
  moduleHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "6px",
  },
  moduleBadge: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    padding: "2px 8px",
    borderRadius: "999px",
    border: "1px solid rgba(59,130,246,0.7)",
    color: "#bfdbfe",
  },
  moduleTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#e5e7eb",
  },
  codeBlock: {
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "12px",
    background: "rgba(15,23,42,0.9)",
    borderRadius: "10px",
    padding: "10px 12px",
    border: "1px solid rgba(31,41,55,0.9)",
    color: "#e5e7eb",
    marginTop: "8px",
    marginBottom: "8px",
    overflowX: "auto",
    whiteSpace: "pre",
  },
  imageWrapper: {
    marginTop: "14px",
    marginBottom: "10px",
    borderRadius: "18px",
    border: "1px solid rgba(31,41,55,0.9)",
    overflow: "hidden",
    background: "rgba(15,23,42,0.9)",
  },
  image: {
    display: "block",
    width: "100%",
    maxHeight: "360px",
    objectFit: "cover",
  },
  imageCaption: {
    fontSize: "11px",
    padding: "6px 10px 8px",
    color: "#9ca3af",
    borderTop: "1px solid rgba(31,41,55,0.9)",
  },
  imageGrid4: {
    marginTop: "14px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
    gap: "16px",
  },

  imageWrapperSmall: {
    borderRadius: "14px",
    border: "1px solid rgba(31,41,55,0.9)",
    overflow: "hidden",
    background: "rgba(15,23,42,0.9)",
  },

  imageSmall: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    display: "block",
  },

  imageCaption: {
    fontSize: "11px",
    padding: "6px 10px 8px",
    color: "#9ca3af",
    borderTop: "1px solid rgba(31,41,55,0.9)",
  },
  imageWrapper_architecture: {
    width: "45%",                     // smaller than full width
    margin: "20px auto",              // center align
    borderRadius: "16px",
    border: "1px solid rgba(31,41,55,0.8)",
    overflow: "hidden",
    background: "rgba(15,23,42,0.9)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
  },
  imageWrapper_photo_module: {
    width: "40%",                     // smaller than full width
    margin: "20px auto",              // center align
    borderRadius: "16px",
    border: "1px solid rgba(31,41,55,0.8)",
    overflow: "hidden",
    background: "rgba(15,23,42,0.9)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
  },
  imageWrapper_live_module: {
    width: "73%",                     // smaller than full width
    margin: "20px auto",              // center align
    borderRadius: "16px",
    border: "1px solid rgba(31,41,55,0.8)",
    overflow: "hidden",
    background: "rgba(15,23,42,0.9)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
  },

  imageMedium: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    display: "block",
    backgroundColor: "#0f172a",
  },

  imageCaptionSmall: {
    fontSize: "11px",
    textAlign: "center",
    padding: "6px 10px 8px",
    color: "#9ca3af",
    borderTop: "1px solid rgba(31,41,55,0.85)",
  },


  footer: {
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid rgba(31,41,55,0.9)",
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    fontSize: "12px",
    color: "#6b7280",
    flexWrap: "wrap",
  },
  footerRight: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  footerChip: {
    borderRadius: "999px",
    border: "1px solid rgba(55,65,81,0.9)",
    padding: "3px 10px",
  },

  imageZoom: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    display: "block",
    backgroundColor: "#0f172a",
    transition: "transform 0.35s ease-out",   // smooth animation
  },

  imageWrapper_architectureHover: {
    transform: "scale(1.02)",
  },
  imageWrapper_live_moduleHover: {
    transform: "scale(1.02)",
  },
  imageWrapper_photo_moduleHover: {
    transform: "scale(1.02)",
  },
  imageWrapperSmallHover: {
    transform: "scale(1.5)",
  },
};


export default Report;
