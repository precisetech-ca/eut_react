// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { useUIContext } from "../context/UIContext";
import {Input} from "reactstrap";
import { ReactTable } from "../../custom_widgets/table/ReactTable";
import { Link } from "react-router-dom";

export function HomePageTable() {
  const UIContext = useUIContext();
  const dispatch = useDispatch();

  const { currentState, userData } = useSelector(
    (state) => ({ currentState: state.purchase, userData: state.auth?.user }),
    shallowEqual
  );

  const {purchaseList} = currentState;

  useEffect(() => {
    dispatch(actions.fetchPurchaseList());
  }, []);
  
  const columns = [
    {
      Header: "PO Number",
      Footer: "PO Number",
      accessor: "PO_NUMBER",
      disableFilters: true,
      Cell: ({value}) => value,
    },
    {
      Header: "Supplier",
      Footer: "Supplier",
      accessor: "SUPPLIER",
      disableFilters: true,
      Cell: ({value}) => value,
    },
    {
      Header: "Inventory",
      Footer: "Inventory",
      accessor: "INVENTORY",
      disableFilters: true,
      Cell: ({value}) => value,
    },
    {
      Header: "Void",
      Footer: "Void",
      accessor: "VOID",
      disableSortBy: true,
      disableFilters: true,
      Cell: ({value}) => <Input type="checkbox" checked={value === 'Y' ? true: false} disabled={true} value={value}/>,
    },
    {
      Header: "Action",
      accessor: "PURORD_ID",
      disableSortBy: true,
      disableFilters: true,
      Cell: ({value}) => {
        return (
          <>
            <Link href="#purchase-edit" onClick={() => UIContext?.editOrView(value)} >
              <i class="fas fa-pencil-alt text-success"></i>
            </Link>
            <Link href="#purchase-view" onClick={() => UIContext?.editOrView(value, 'view')} >
              <i class="fas fa-eye text-primary ml-3"></i>
            </Link>
        </>)
      }
    },
];

  return (
    <>
      {purchaseList && <ReactTable tableColumns={columns} tableData={purchaseList} />}
    </>
  );
}
