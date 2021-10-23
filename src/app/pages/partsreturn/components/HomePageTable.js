// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { usePartsReturnUIContext } from "../context/PartsReturnUIContext";
import {Button, Input, Row, Col} from "reactstrap";
import { Summary } from "./supplier/Summary";
import { ReactTable } from "../../custom_widgets/table/ReactTable";
import DateTimePicker from 'react-datetime-picker';
import { Link } from "react-router-dom";
import { AlertModal } from "../../utils/AlertModal";

export function HomePageTable() {
  // Customers UI Context
  const PartsReturnUIContext = usePartsReturnUIContext();
  const [value, onChange] = useState(new Date());
  const customersUIProps = useMemo(() => {
    return {
      queryParams: PartsReturnUIContext.queryParams,
    };
  }, [PartsReturnUIContext]);

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.partsreturn }),
    shallowEqual
  );
  const { partsreturnList } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchPartsReturnList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersUIProps.queryParams, dispatch]);
  
  const columns = [
    {
        Header: "Retrun Part #",
        Footer: "Retrun Part #",
        accessor: "barcode",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Parts Return Listing",
        Footer: "Parts Return Listing",
        accessor: "desc",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    
    {
        Header: "Supplier",
        Footer: "Supplier",
        accessor: "lot_no",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Inventory",
        Footer: "Inventory",
        accessor: "expiry",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Return Complete",
        Footer: "Return Complete",
        accessor: "supplier",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Credit Note",
        Footer: "Credit Note",
        accessor: "notes",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Void",
        Footer: "Void",
        accessor: "void",
        disableSortBy: true,
        disableFilters: true,
        Cell: ({value}) => <Input type="checkbox" checked={value} disabled={true} value={value}/>,
    },
    {
        Header: "Action",
        accessor: "id",
        disableSortBy: true,
        disableFilters: true,
        Cell: ({value}) => {
          return (
            <>
              <Link href="#partsreturn-edit" to={`/partsreturn/${value}/edit`} >
                <i class="fas fa-pencil-alt text-success"></i>
              </Link>
              <Link href="#partsreturn-edit" to={`/partsreturn/${value}/view`} >
                <i class="fas fa-eye text-primary ml-3"></i>
              </Link>
          </>)
        }
    },
];

  return (
    <>
      {partsreturnList && <ReactTable tableColumns={columns} tableData={partsreturnList} />}
    </>
  );
}
