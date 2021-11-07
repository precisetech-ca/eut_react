import { callGenericAsync } from "app/generic/actions";
import React, {createContext, useContext, useState} from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";
import * as actions from "../_redux/actions";

const InventoryUIContext = createContext();

export function useIinventoryUIContext() {
  return useContext(InventoryUIContext);
}

export const InventoryUIConsumer = InventoryUIContext.Consumer;

export function InventoryUIProvider({customersUIEvents, children}) {
  const dispatch = useDispatch()
  const [tempData, setTempData] = useState({});
  const [ids, setIds] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isViewable, setIsViewable] = useState(false);
  const [itemMasterModal, setItemMasterModal] = useState(false);
  const itemMasterToggle = () => {
    setItemMasterModal(!itemMasterModal);
  }

  const setEditHandler = (value) => {
    setEdit(value);
  }

  
  const { currentState, userData } = useSelector(
    (state) => ({ 
      currentState: state.inventory,
      userData: state.auth.user,
    }),
    shallowEqual
  );
  const {  supplier, uom, warehouses } = currentState;
  const warehouseMockData = warehouses;
  const {USE_ID} = userData;

  const prefferedSupplier = supplier;

  const weightMockProps = [
    {value: "ml", label: "ml"},
    {value: "g", label: "g"},
    {value: "oz", label: "oz"},
  ];

  const setEditData = (id) => {
    const editPayload = {
      "data":
      {  
        "PAR_ID"   		: id,
        "SEARCH"   		: ""
      }, 
      "action": "ITEMMASTER",
      "method": "GetPartAttachments",
      "username": "admin",
      "password": "admin",
      "type": "rpc",
      "tid": "144"
    };

    dispatch(callGenericAsync(editPayload, "/itemmaster/GetPartDetails", "post", (res) => {
      if (res?.CODE === "SUCCESS") {
        setTempData(res?.Result[0]);
      }
    }))

  }

  const submitFormHandler = ({payload}) => {
    const itemMasterPayload = {
      data: {
        "CODE": payload?.sku,
        "BARCODE_NUMBER": payload?.barcode,
        "DESCRIPTION": payload?.description,
        "UOM_ID": payload?.uom,
        "PARGRO_ID": "",
        "MARGRO_ID": "",
        "MARKUP_BASED_ON": "STD",
        "AVERAGE_COST": Number (payload?.price),
        "STANDARD_COST": Number (payload?.cost),
        "LAST_PURCHASE_COST": "",
        "ENABLE_ITEM_LEVEL_CHARGE": "N",
        "ITEM_LEVEL_CHARGE": "",
        "NOTES"   : payload?.notes,
        "FUEL_FLAG": "N",
        "STOCK_ITEM_FLAG"   : payload?.allow_negative_oh === true ? "Y" : "N",
        "GLACC_ID_ASSET": "",
        "GLACC_ID_REVENUE": "",
        "GLACC_ID_COGS": "",
        "ACTIVE_FLAG": payload?.status === true ? "Y" : "N",
        "USE_ID": USE_ID,
        "VMRSYS_ID": "",
        "VMRASS_ID": "",
        "VMRCOM_ID": "",
        "VEN_ID"   : payload?.preferred_supply,
        "PARWAR_ID" : Number( payload?.warehouse ),
        "CONVERSION_TO_STOCKING_UOM"   : String ( payload?.conversion_uom ),
        "WARRANTY": "",
        "PAR_ID_SUPERCEDES": "",
        "UOM_ID_REORDERING"   : String ( payload?.re_ordering_uom ),
        "ALLOW_NEGATIVE_FLAG"   : payload?.allow_negative_oh === true ? "Y" : "N",
        "ITEM_LEVEL_CHRG_EXP_DATE": "",
        "REFERENCE_NUMBER": "",
        "SHOSUP_FLAG": "N",
        "ALLOW_FRACTION_QTY": "N",
        "ALLOW_NEG_RO_COMP_FLAG": "N",
        "SKU": "1234",
        "LOT_NUMBER": "",
        "BATCH_EXPIRY": "",
        "QUARANTINE": "",
        "DimensionL"   : payload?.dimensionLength,
        "DimensionH"   : payload?.height,
        "DimensionW"   : payload?.width,
        "Weight"   : String ( payload?.weight ), 
        "ALLOW_TAX_FLAG": "Y"
      },
      "action": "ItemMaster",
      "method": "PostPartDetails",
      "username": "admin",
      "password": "admin",
      "type": "rpc",
      "tid": "144"
    }

    if (payload?.par_id) {
      itemMasterPayload.data.PAR_ID = payload?.par_id;
    }

    dispatch(callGenericAsync(itemMasterPayload, "/ItemMaster/PostPartDetails", 'post', (res) => {
      if (res?.CODE === 'SUCCESS') {
        dispatch(actions.inventoryItemsFetched());
        setItemMasterModal(false);
      }
    }))
  }

  const inventoryTabs = [
    {key: "details", title: "Details"},
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
    warehouseMockData,
    prefferedSupplier,
    weightMockProps,
    inventoryTabs,
    setEditHandler,
    uom,
    itemMasterToggle,
    itemMasterModal,
    editState: edit,
    setEditData,
    isViewable,
    setIsViewable,
    tempData,
    setTempData,
  };

  return <InventoryUIContext.Provider value={value}>{children}</InventoryUIContext.Provider>;
}