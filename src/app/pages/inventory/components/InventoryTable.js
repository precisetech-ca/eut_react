// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { useIinventoryUIContext } from "../context/InventoryUIContext";
import { ReactTable } from "../../custom_widgets/table/ReactTable";
import {Input} from 'reactstrap';
import { Link } from "react-router-dom";

export function InventoryTable() {
  // Customers UI Context
 
  const inventoryUIContext = useIinventoryUIContext();

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.inventory }),
    shallowEqual
  );
  const { inventoryItems } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.inventoryItemsFetched());
    dispatch(actions.getPartsUom());
    dispatch(actions.getSupplier());
    dispatch(actions.getWarehouses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const columns = [
    {
        Header: "Sku",
        Footer: "Sku",
        accessor: "PAR_CODE",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "*",
        Footer: "*",
        accessor: "DESCRIPTION",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Preffered Supplier",
        Footer: "Preffered Supplier",
        accessor: "SUPPLIER",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
      Header: "Stock Qty",
      Footer: "Stock Qty",
      accessor: "WARRANTY",
      disableFilters: true,
      Cell: ({value}) => value,
    },
    {
      Header: "Cost",
      Footer: "Cost",
      accessor: "STANDARD_COST",
      disableFilters: true,
      Cell: ({value}) => value,
    },
    {
      Header: "Active Flag",
      Footer: "Active Flag",
      accessor: "ACTIVE_FLAG",
      disableFilters: true,
      Cell: ({value}) => <Input type="checkbox" value={value === 'Y' ? true : false} disabled={true} />,
    },
    {
        Header: "Action",
        accessor: "PAR_ID",
        disableSortBy: true,
        disableFilters: true,
        Cell: ({value}) => {
          return (
            <>
              <Link href="#inventory-edit" onClick={() => {
                inventoryUIContext.setEditHandler(true);
                inventoryUIContext.itemMasterToggle();
                inventoryUIContext.setEditData(value);
                inventoryUIContext.setIsViewable(false);
              }} >
                <i class="fas fa-pencil-alt text-success"></i>
              </Link>
              <Link href="#inventory-edit" onClick={() => {
                inventoryUIContext.itemMasterToggle();
                inventoryUIContext.setEditData(value);
                inventoryUIContext.setIsViewable(true);
                inventoryUIContext.setEditHandler(false);
              }} >
                <i class="fas fa-eye text-primary ml-3"></i>
              </Link>
          </>)
        }
    },
  ];
  
  return (
    <>
      {inventoryItems && <ReactTable tableColumns={columns} tableData={inventoryItems} /> }
    </>
  );
}
