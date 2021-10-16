import { callGenericAsync } from "app/generic/actions";
import React, {createContext, useContext, useState} from "react";
import { useDispatch } from "react-redux";
import * as actions from "../_redux/actions";

const InventoryUIContext = createContext();

export function useIinventoryUIContext() {
  return useContext(InventoryUIContext);
}

export const InventoryUIConsumer = InventoryUIContext.Consumer;

export function InventoryUIProvider({customersUIEvents, children}) {
  const dispatch = useDispatch()
  const [ids, setIds] = useState([]);
  const [edit, setEdit] = useState(false);

  const setEditHandler = (value) => {
    setEdit(value);
  }
  const warehouseMockData = [
    {value: "1", label: "King PIN 5th Wheel"},
    {value: "2", label: "Alloy Rims"}
  ];

  const prefferedSupplier = [
    {value: "1", label: "Vancouver Fire Prevention"},
  ];

  const weightMockProps = [
    {value: "ml", label: "ml"},
    {value: "g", label: "g"},
    {value: "oz", label: "oz"},
  ];

  const submitFormHandler = ({payload}) => {
    const itemMasterPayload = {
      "PAR_ID"   : payload?.sku,
      "CODE"   : "abc",
      "BARCODE_NUMBER"   : payload?.barcode,
      "DESCRIPTION"   : payload?.description,
      "UOM_ID"   : payload?.uom,
      "PARWAR_ID"   : "",
      "VEN_ID"   : "",
      "PARGRO_ID"   : "",
      "MARGRO_ID"   : "",
      "MARKUP_BASED_ON"   : "",
      "AVERAGE_COST"   : payload?.average_cost,
      "STANDARD_COST"   : payload?.standard_cost,
      "LAST_PURCHASE_COST"   : "",
      "ENABLE_ITEM_LEVEL_CHARGE"   : "",
      "ITEM_LEVEL_CHARGE"   : "",
      "NOTES"   : payload?.notes,
      "FUEL_FLAG"   : "",
      "STOCK_ITEM_FLAG"   : "",
      "GLACC_ID_ASSET"   : "",
      "GLACC_ID_REVENUE"   : "",
      "GLACC_ID_COGS"   : "",
      "ACTIVE_FLAG"   : "",
      "USE_ID"   : "",
      "VMRSYS_ID"   : "",
      "VMRASS_ID"   : "",
      "VMRCOM_ID"   : "",
      "CONVERSION_TO_STOCKING_UOM"   : "",
      "WARRANTY"   : "",
      "PAR_ID_SUPERCEDES"   : "",
      "UOM_ID_REORDERING"   : "",
      "ALLOW_NEGATIVE_FLAG"   : payload?.allow_negative_oh,
      "ITEM_LEVEL_CHRG_EXP_DATE"   : "",
      "REFERENCE_NUMBER"   : "",
      "SHOSUP_FLAG"   : "",
      "ALLOW_FRACTION_QTY"   : "",
      "ALLOW_NEG_RO_COMP_FLAG"   : payload?.allow_negative_oh,
      "SKU"   : payload?.sku,
      "LOT_NUMBER"   : "",
      "BATCH_EXPIRY"   : "",
      "QUARANTINE"   : "",
      "DimensionL"   : payload?.length,
      "DimensionH"   : payload?.height,
      "DimensionW"   : payload?.width,
      "Weight"   : payload?.weight,
    }
    dispatch(callGenericAsync(itemMasterPayload, "/", 'post', (res) => {
      if (res) {
        console.log(res);
        dispatch(actions.inventoryItemsFetched());
      }
    }))
  }

  const inventoryTabs = [
    {key: "details", title: "Details", Component: () => <h1>hello</h1>},
    {key: "override_amount", title: "Override Amount"},
    {key: "price_list", title: "Price List"},
    {key: "catalog", title: "Catalog"},
    {key: "override_supplier_by_inventory", title: "Override Supplier By Inventory"},
    {key: "attachments", title: "Attachments"},
    {key: "stock_availability", title: "Stock Availability"},
    {key: "history", title: "History"},
    {key: "part_interchange", title: "Part Interchange"},
    {key: "audit_log", title: "Audit Log"},
  ];

  const value = {
    ids,
    setIds,
    submitFormHandler,
    newCustomerButtonClick: customersUIEvents.newCustomerButtonClick,
    openEditCustomerDialog: customersUIEvents.openEditCustomerDialog,
    openDeleteCustomerDialog: customersUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: customersUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: customersUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: customersUIEvents.openUpdateCustomersStatusDialog,
    warehouseMockData,
    prefferedSupplier,
    weightMockProps,
    inventoryTabs,
    setEditHandler,
    editState: edit,
  };

  return <InventoryUIContext.Provider value={value}>{children}</InventoryUIContext.Provider>;
}