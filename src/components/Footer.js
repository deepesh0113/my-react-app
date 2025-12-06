import React from 'react';


function Footer() {

  const styles = {
    footer: {
      marginTop: "16px",
      paddingTop: "16px",
      borderTop: "1px solid rgba(31,41,55,0.9)",
      display: "flex",
      justifyContent: "space-between",
      gap: "12px",
      fontSize: "15px",
      color: "#6b7280",
      flexWrap: "wrap",
    },
  };
  return (
    <footer style={styles.footer}>
      <div>© {new Date().getFullYear()} VigilNet – Crowd Management System</div>
    </footer>
  );
}

export default Footer;
