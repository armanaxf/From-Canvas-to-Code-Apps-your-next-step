/*
 * AssetList.tsx — Displays all assets in a table
 *
 * In Canvas Apps, this is like a Gallery control bound to your data source.
 * Each row shows one asset with its key details.
 *
 * During Module 03, you'll connect this to live Dataverse data.
 */

import * as React from "react";
import { Asset } from "./App";

interface AssetListProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
}

const AssetList: React.FC<AssetListProps> = ({ assets, onEdit }) => {
  if (assets.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>No assets yet.</p>
        <p style={styles.emptyHint}>
          Click <strong>+ Add Asset</strong> to register your first item.
        </p>
      </div>
    );
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Category</th>
          <th style={styles.th}>Assigned To</th>
          <th style={styles.th}>Status</th>
          <th style={styles.th}>Serial Number</th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => (
          <tr key={asset.id} style={styles.tr}>
            <td style={styles.td}>{asset.name}</td>
            <td style={styles.td}>{asset.category}</td>
            <td style={styles.td}>{asset.assignedTo}</td>
            <td style={styles.td}>
              <span style={getStatusStyle(asset.status)}>{asset.status}</span>
            </td>
            <td style={styles.td}>{asset.serialNumber}</td>
            <td style={styles.td}>
              <button style={styles.editButton} onClick={() => onEdit(asset)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Status badge colours — like conditional formatting in Canvas Apps
function getStatusStyle(status: string): React.CSSProperties {
  const colours: Record<string, string> = {
    Available: "#107c10",
    "In Use": "#0078d4",
    "Under Repair": "#d83b01",
    Retired: "#666",
  };

  return {
    backgroundColor: colours[status] || "#666",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
  };
}

const styles: Record<string, React.CSSProperties> = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left" as const,
    padding: "10px 12px",
    borderBottom: "2px solid #e1e1e1",
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
  },
  tr: {
    borderBottom: "1px solid #f0f0f0",
  },
  td: {
    padding: "10px 12px",
    fontSize: 14,
  },
  editButton: {
    backgroundColor: "transparent",
    border: "1px solid #0078d4",
    color: "#0078d4",
    padding: "4px 12px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 13,
  },
  empty: {
    textAlign: "center" as const,
    padding: 60,
  },
  emptyText: {
    fontSize: 18,
    color: "#333",
    margin: 0,
  },
  emptyHint: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
};

export { AssetList };
