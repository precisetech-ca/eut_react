// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { usePhysicalCountUIContext } from "../context/PhysicalCountUIContext";
import {Input} from "reactstrap";
import { ReactTable } from "../../custom_widgets/table/ReactTable";
import { Link } from "react-router-dom";

export function HomePageTable() {
  // Customers UI Context
  const PhysicalCountUIContext = usePhysicalCountUIContext();
  const [value, onChange] = useState(new Date());
  const customersUIProps = useMemo(() => {
    return {
      queryParams: PhysicalCountUIContext.queryParams,
    };
  }, [PhysicalCountUIContext]);

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.physicalcount }),
    shallowEqual
  );
  const { physicalcountList } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchPhysicalCountList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersUIProps.queryParams, dispatch]);
  
  const columns = [
    {
        Header: "PC #",
        Footer: "PC #",
        accessor: "barcode",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "DESCRIPTION",
        Footer: "DESCRIPTION",
        accessor: "desc",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    
    {
        Header: "PC Date",
        Footer: "PC Date",
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
        Header: "FINAL DATE",
        Footer: "FINAL DATE",
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
              <Link href="#physicalcount-edit" to={`/physicalcount/${value}/edit`} >
                <i class="fas fa-pencil-alt text-success"></i>
              </Link>
              <Link href="#physicalcount-edit" to={`/physicalcount/${value}/view`} >
                <i class="fas fa-eye text-primary ml-3"></i>
              </Link>
          </>)
        }
    },
];

  return (
    <>
      {physicalcountList && <ReactTable tableColumns={columns} tableData={physicalcountList} />}
    </>
  );
}
