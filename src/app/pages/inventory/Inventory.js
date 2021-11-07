import React from "react";
import { InventoryUIProvider } from "./context/InventoryUIContext";
import { InventoryCard } from "./components/InventoryCard";
import { InventoryEditDialog } from "./components/EditInventoryDialog";

const Inventory = ({history}) => {

  return (
    <InventoryUIProvider>
      <InventoryEditDialog/>
      <InventoryCard />
    </InventoryUIProvider>
  );
}

export default Inventory;