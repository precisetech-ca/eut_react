// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { useUIContext } from "../context/UIContext";
import {Button, Input, Row, Col} from "reactstrap";
import { Summary } from "./supplier/Summary";
import { ReactTable } from "../../custom_widgets/table/ReactTable";
import DateTimePicker from 'react-datetime-picker';
import { Link } from "react-router-dom";
import { AlertModal } from "../../utils/AlertModal";

export function HomePageTable() {
  // Customers UI Context
  const UIContext = useUIContext();
  const [value, onChange] = useState(new Date());
  const customersUIProps = useMemo(() => {
    return {
      queryParams: UIContext.queryParams,
    };
  }, [UIContext]);

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.purchase }),
    shallowEqual
  );
  const { purchaseList } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchPurchaseList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersUIProps.queryParams, dispatch]);
  
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
              <Link href="#purchase-edit" to={`/purchase/${value}/edit`} >
                <i class="fas fa-pencil-alt text-success"></i>
              </Link>
              <Link href="#purchase-edit" to={`/purchase/${value}/view`} >
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
