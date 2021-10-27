// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { useUIContext } from "../context/UIContext";
import { Input} from "reactstrap";
import { ReactTable } from "../../custom_widgets/table/ReactTable";
import { Link } from "react-router-dom";

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
    (state) => ({ currentState: state.salesorder }),
    shallowEqual
  );
  const { salesorderList } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchSalesOrderList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersUIProps.queryParams, dispatch]);
  
  const columns = [
    {
        Header: "Barcode",
        Footer: "Barcode",
        accessor: "barcode",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Desc",
        Footer: "Desc",
        accessor: "desc",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    
    {
        Header: "Lot #",
        Footer: "Lot #",
        accessor: "lot_no",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Expiry",
        Footer: "Expiry",
        accessor: "expiry",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Supplier",
        Footer: "Supplier",
        accessor: "supplier",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Notes",
        Footer: "Notes",
        accessor: "notes",
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
              <Link href="#salesorder-edit" to={`/salesorder/${value}/edit`} >
                <i class="fas fa-pencil-alt text-success"></i>
              </Link>
              <Link href="#salesorder-edit" to={`/salesorder/${value}/view`} >
                <i class="fas fa-eye text-primary ml-3"></i>
              </Link>
          </>)
        }
    },
];

  return (
    <>
      {salesorderList && <ReactTable tableColumns={columns} tableData={salesorderList} />}
    </>
  );
}
