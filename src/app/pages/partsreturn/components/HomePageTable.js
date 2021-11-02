// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { usePartsReturnUIContext } from "../context/PartsReturnUIContext";
import { Input, Row, Col} from "reactstrap";
import { ReactTable } from "../../custom_widgets/table/ReactTable";
import { Link } from "react-router-dom";

export function HomePageTable() {
  // Customers UI Context
  const PartsReturnUIContext = usePartsReturnUIContext();
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(actions.fetchPartsReturnList());
  }, [dispatch]);
  
  const columns = [
    {
        Header: "Barcode",
        Footer: "Barcode",
        accessor: "SALEORD_NUMBER",
        disableFilters: true,
        Cell: (props) => {
          return props.value
        },
    },
    {
        Header: "Desc",
        Footer: "Desc",
        accessor: "SALEORD_DATE",
        disableFilters: true,
        Cell: (props) => {
          return props.value
        },
    },
    {
        Header: "Finalized Date",
        Footer: "Finalized Date",
        accessor: "FINALIZED_DATE",
        disableFilters: true,
        Cell: (props) => {
          return props.value
        },
    },
    {
        Header: "Lot # ",
        Footer: "Lot #",
        accessor: "SALE_ORDER_DATE",
        disableFilters: true,
        Cell: (props) => {
          return props.value
        },
    },
    {
      Header: "Expiry",
      Footer: "Expiry",
      accessor: "ASSIGNED_TO",
      disableFilters: true,
      Cell: (props) => {
        return props.value
      },
    },
    {
      Header: "Supplier",
      Footer: "Supplier",
      accessor: "CUSTOMER_BILL_TO",
      disableFilters: true,
      Cell: (props) => {
        return props.value
      },
    },
    {
      Header: "Notes ",
      Footer: "Notes",
      accessor: "COUNTRY_NAME",
      disableFilters: true,
      Cell: (props) => {
        return props.value
      },
    },
    {
        Header: "Void",
        Footer: "Void",
        accessor: "VOID_DATE",
        disableSortBy: true,
        disableFilters: true,
        Cell: (props) => <Input type="checkbox" checked={props?.value === "Y" ? true : false} disabled={true} value={props?.value}/>,
    },
    {
        Header: "Action",
        accessor: "SALEORD_ID",
        disableSortBy: true,
        disableFilters: true,
        Cell: ({value}) => {
          return (
            <>
              <Link href="#partsreturn-edit" to={`/partsreturn/${value}/edit`} onClick={() => PartsReturnUIContext?.editOrView(value)} >
                <i class="fas fa-pencil-alt text-success"></i>
              </Link>
              <Link href="#partsreturn-edit" to={`/partsreturn/${value}/view`}  onClick={() => PartsReturnUIContext?.editOrView(value , "view")}>
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
