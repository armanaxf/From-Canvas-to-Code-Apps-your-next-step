/*
 * Header.tsx - The top bar of your app
 *
 * In Canvas Apps, this is like having a header label and an "Add" button
 * at the top of your screen.
 */

import * as React from "react";

interface HeaderProps {
  onAddNew: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddNew }) => {
  return (
    <div style={styles.header}>
      <div>
        <h1 style={styles.title}>Team Asset Register</h1>
        <p style={styles.subtitle}>
          Track equipment, assign to people, manage status
        </p>
      </div>
      <button style={styles.addButton} onClick={onAddNew}>
        + Add Asset
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: "2px solid #0078d4",
  },
  title: {
    margin: 0,
    fontSize: 24,
    color: "#0078d4",
  },
  subtitle: {
    margin: "4px 0 0",
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#0078d4",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 4,
    fontSize: 14,
    cursor: "pointer",
  },
};

export { Header };
