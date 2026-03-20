/*
 * AssetForm.tsx - Create or edit an asset
 *
 * In Canvas Apps, this is like an Edit Form control. It shows fields
 * for each column and has Save / Cancel buttons.
 *
 * During Module 03, you'll wire this up to write data back to Dataverse.
 */

import * as React from "react";
import { Asset } from "./App";

interface AssetFormProps {
  asset: Asset | null; // null = creating a new asset
  onSave: (asset: Asset) => void;
  onCancel: () => void;
}

// Default values for a new asset - like the Default property on a Form in Canvas Apps
const emptyAsset: Asset = {
  id: "",
  name: "",
  category: "Laptop",
  assignedTo: "",
  status: "Available",
  serialNumber: "",
  purchaseDate: "",
  notes: "",
};

const categories = ["Laptop", "Monitor", "Keyboard", "Mouse", "Headset", "Dock", "Accessory", "Other"];
const statuses = ["Available", "In Use", "Under Repair", "Retired"];

const AssetForm: React.FC<AssetFormProps> = ({ asset, onSave, onCancel }) => {
  // Start with either the existing asset's values or blank defaults
  const [formData, setFormData] = React.useState<Asset>(asset || emptyAsset);

  // Update a single field - like Patch() for one column in Canvas Apps
  const handleChange = (
    field: keyof Asset,
    value: string
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Basic validation - like IsBlank() checks in Canvas Apps
    if (!formData.name.trim()) {
      alert("Please enter an asset name.");
      return;
    }
    onSave(formData);
  };

  return (
    <div style={styles.form}>
      <h2 style={styles.heading}>
        {asset ? "Edit Asset" : "New Asset"}
      </h2>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Asset Name *</label>
        <input
          style={styles.input}
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g. Dell Latitude 5540"
        />
      </div>

      <div style={styles.row}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Category</label>
          <select
            style={styles.input}
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Status</label>
          <select
            style={styles.input}
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Assigned To</label>
        <input
          style={styles.input}
          value={formData.assignedTo}
          onChange={(e) => handleChange("assignedTo", e.target.value)}
          placeholder="e.g. Jane Smith"
        />
      </div>

      <div style={styles.row}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Serial Number</label>
          <input
            style={styles.input}
            value={formData.serialNumber}
            onChange={(e) => handleChange("serialNumber", e.target.value)}
            placeholder="e.g. SN-2026-00123"
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Purchase Date</label>
          <input
            style={styles.input}
            type="date"
            value={formData.purchaseDate}
            onChange={(e) => handleChange("purchaseDate", e.target.value)}
          />
        </div>
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Notes</label>
        <textarea
          style={{ ...styles.input, minHeight: 80 }}
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Any extra details about this asset..."
        />
      </div>

      <div style={styles.buttons}>
        <button style={styles.saveButton} onClick={handleSubmit}>
          Save
        </button>
        <button style={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: {
    maxWidth: 600,
  },
  heading: {
    fontSize: 20,
    color: "#333",
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 16,
    flex: 1,
  },
  row: {
    display: "flex",
    gap: 16,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    fontSize: 14,
    border: "1px solid #ccc",
    borderRadius: 4,
    boxSizing: "border-box" as const,
  },
  buttons: {
    display: "flex",
    gap: 12,
    marginTop: 24,
  },
  saveButton: {
    backgroundColor: "#0078d4",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: 4,
    fontSize: 14,
    cursor: "pointer",
    fontWeight: 600,
  },
  cancelButton: {
    backgroundColor: "#fff",
    color: "#333",
    border: "1px solid #ccc",
    padding: "10px 24px",
    borderRadius: 4,
    fontSize: 14,
    cursor: "pointer",
  },
};

export { AssetForm };
