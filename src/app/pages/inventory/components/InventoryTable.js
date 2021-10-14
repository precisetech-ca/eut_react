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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);


  console.log(inventoryItems);
  
  const columns = [
    {
        Header: "po_number",
        Footer: "po_number",
        accessor: "po_number",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "po_date",
        Footer: "po_date",
        accessor: "po_date",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    
    {
        Header: "Lead Time",
        Footer: "Lead Time",
        accessor: "lead_time",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "supplier",
        Footer: "supplier",
        accessor: "supplier",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "warehouse",
        Footer: "warehouse",
        accessor: "warehouse",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "PO Finalized Date",
        Footer: "PO Finalized Date",
        accessor: "po_finalized_date",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Void",
        Footer: "Void",
        accessor: "void",
        disableSortBy: true,
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Action",
        accessor: "id",
        disableSortBy: true,
        disableFilters: true,
        Cell: ({value}) => {
          return (
            <>
              <Link href="#inventory-edit" to={`/inventory/${value}/edit`} >
                <i class="fas fa-pencil-alt text-success"></i>
              </Link>
              <Link href="#inventory-edit" to={`/inventory/${value}/view`} >
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
