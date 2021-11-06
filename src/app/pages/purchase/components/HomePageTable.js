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
      Header: "PO#",
      Footer: "PO#",
      accessor: "PO_NUMBER",
      disableFilters: true,
      Cell: (props) => {
        return props?.value
      },
    },
    {
      Header: "PO Date",
      Footer: "PO Date",
      accessor: "PO_DATE",
      disableFilters: true,
       Cell: (props) => {
          return props?.value
        },
    },
    {
      Header: "Lead Time",
      Footer: "Lead Time",
      accessor: "FINALIZED_DATE",
      disableFilters: true,
       Cell: (props) => {
          return props?.value
        },
    },
    {
      Header: "Supplier",
      Footer: "Supplier",
      accessor: "SUPPLIER",
      disableFilters: true,
       Cell: (props) => {
          return props?.value
        },
    },
    {
      Header: "Warehouse",
      Footer: "Warehouse",
      accessor: "INVENTORY",
      disableFilters: true,
       Cell: (props) => {
          return props?.value
        },
    },
    // {
    //   Header: "Completion Date",
    //   Footer: "Completion Date",
    //   accessor: "",
    //   disableFilters: true,
    //    Cell: (props) => {
    //       return props?.value
    //     },
    // },
    {
      Header: "Void",
      Footer: "Void",
      accessor: "VOID",
      disableSortBy: true,
      disableFilters: true,
      Cell: ({props}) => <Input type="checkbox" checked={props?.value === 'Y' ? true: false} disabled={true} value={props?.value}/>,
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
