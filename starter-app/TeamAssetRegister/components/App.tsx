/*
 * App.tsx — The main container for your Code App
 *
 * In Canvas Apps, this would be like your App object — it holds all
 * your screens and manages navigation between them.
 *
 * Right now it just shows a welcome message. During the workshop,
 * you'll add the asset list, forms, and navigation.
 */

import * as React from "react";
import { AssetList } from "./AssetList";
import { AssetForm } from "./AssetForm";
import { Header } from "./Header";

// This is the shape of an asset record — like defining columns in a Canvas App data source
export interface Asset {
  id: string;
  name: string;
  category: string; // e.g. "Laptop", "Monitor", "Accessory"
  assignedTo: string; // Person the item is assigned to
  status: string; // "Available", "In Use", "Under Repair", "Retired"
  serialNumber: string;
  purchaseDate: string;
  notes: string;
}

interface AppProps {
  context: ComponentFramework.Context<any>;
}

const App: React.FC<AppProps> = ({ context }) => {
  // ---------------------------------------------------------------
  // STATE — like Set() and UpdateContext() in Canvas Apps
  // ---------------------------------------------------------------

  // The list of assets (starts empty — you'll fetch from Dataverse in Module 03)
  const [assets, setAssets] = React.useState<Asset[]>([]);

  // Which view is showing: "list" or "form" (like Navigate() in Canvas Apps)
  const [currentView, setCurrentView] = React.useState<"list" | "form">("list");

  // The asset being edited (null means we're creating a new one)
  const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(null);

  // Loading state (like a spinner you'd show in Canvas Apps)
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // ---------------------------------------------------------------
  // EVENT HANDLERS — like OnSelect actions in Canvas Apps
  // ---------------------------------------------------------------

  const handleAddNew = () => {
    setSelectedAsset(null);
    setCurrentView("form");
  };

  const handleEdit = (asset: Asset) => {
    setSelectedAsset(asset);
    setCurrentView("form");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedAsset(null);
  };

  const handleSave = (asset: Asset) => {
    // TODO (Module 03): Save to Dataverse instead of local state
    if (selectedAsset) {
      // Update existing asset
      setAssets(assets.map((a) => (a.id === asset.id ? asset : a)));
    } else {
      // Add new asset
      setAssets([...assets, { ...asset, id: Date.now().toString() }]);
    }
    setCurrentView("list");
    setSelectedAsset(null);
  };

  // ---------------------------------------------------------------
  // RENDER — this is like the screen layout in Canvas Apps
  // ---------------------------------------------------------------

  return (
    <div style={styles.container}>
      <Header onAddNew={handleAddNew} />

      {isLoading ? (
        <div style={styles.loading}>Loading assets...</div>
      ) : currentView === "list" ? (
        <AssetList assets={assets} onEdit={handleEdit} />
      ) : (
        <AssetForm
          asset={selectedAsset}
          onSave={handleSave}
          onCancel={handleBackToList}
        />
      )}
    </div>
  );
};

// ---------------------------------------------------------------
// STYLES — like setting properties on controls in Canvas Apps
// ---------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: 960,
    margin: "0 auto",
    padding: 24,
  },
  loading: {
    textAlign: "center" as const,
    padding: 40,
    color: "#666",
    fontSize: 16,
  },
};

export { App };
