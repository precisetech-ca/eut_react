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
  // Customers UI Context
  const UIContext = useUIContext();
  const customersUIProps = useMemo(() => {
    return {
      queryParams: UIContext.queryParams,
      ids: UIContext.ids,
      newReceivingForm: UIContext.newReceivingForm,
    };
  }, [UIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.receiving }),
    shallowEqual
  );
  const { receivingList } = currentState;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchReceivingList());
  }, [dispatch]);

  const columns = [
    {
        Header: "Receiving #",
        Footer: "Receiving #",
        accessor: "receiving_no",
        disableFilters: true,
        Cell: (props) => {
          return props.value
        },
    },
    {
        Header: "Receiving Date",
        Footer: "Receiving Date",
        accessor: "receiving_date",
        disableFilters: true,
        Cell: (props) => {
          return props.value
        },
    },
    
    {
        Header: "Supplier",
        Footer: "Supplier",
        accessor: "supplier",
        disableFilters: true,
        Cell: (props) => {
          return props.value
        },
    },
    {
        Header: "Supplier Invoice",
        Footer: "Supplier Invoice",
        accessor: "supplier_invoice",
        disableFilters: true,
        Cell: (props) => {
          return props.value
        },
    },
    {
        Header: "Complete",
        Footer: "Complete",
        accessor: "complete",
        disableFilters: true,
        Cell: (props) => {
          return props.value
        },
    },
    {
        Header: "PO Number",
        Footer: "PO Number",
        accessor: "po_number",
        disableFilters: true,
        Cell: (props) => {
          return props.value
        },
    },
    {
        Header: "Completed Date",
        Footer: "Completed Date",
        accessor: "completed_date",
        disableFilters: true,
        Cell: (props) => {
          return props.value
        },
    },
    {
        Header: "RFP Date",
        Footer: "RFP Date",
        accessor: "rfp_date",
        disableSortBy: true,
        disableFilters: true,
        Cell: (props) => {
          return props.value
        },
    },
    {
      Header: "Void",
      Footer: "Void",
      accessor: "void",
      disableSortBy: true,
      disableFilters: true,
      Cell: (props) => <Input type="checkbox" checked={props?.value} disabled={true} value={props?.value}/>,
  },
    {
        Header: "Action",
        accessor: "id",
        disableSortBy: true,
        disableFilters: true,
        Cell: ({value}) => {
            return (
              <>
              <Link href="#receiving-edit" to={`/receiving/${value}/edit`} >
                <i class="fas fa-pencil-alt text-success"></i>
              </Link>
              <Link href="#receiving-edit" to={`/receiving/${value}/view`} >
                <i class="fas fa-eye text-primary ml-3"></i>
              </Link>
          </>)
        }
    },
];

  return (
    <>
      {receivingList && <ReactTable tableColumns={columns} tableData={receivingList} />}
    </>
  );
}
