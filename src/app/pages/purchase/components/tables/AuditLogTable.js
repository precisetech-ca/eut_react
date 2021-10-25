// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/actions";
import { useUIContext } from "../../context/UIContext";

import { ReactTable } from "../../../custom_widgets/table/ReactTable";

export function AuditLogTable() {
  // Customers UI Context
  const UIContext = useUIContext();
  const customersUIProps = useMemo(() => {
    return {
      queryParams: UIContext.queryParams,
    };
  }, [UIContext]);

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ 
        currentState: state.purchase, 
        userData: state.auth?.user,
        auditLogs: state.purchase.auditLogs 
    }),
    shallowEqual
  );
  const { auditLogs, userData } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    const id = window.location.pathname.split('/')[2];
    dispatch(actions.auditLogDataAsync(id, userData?.USE_ID, userData?.USERNAME));
  }, [customersUIProps.queryParams, dispatch]);

  const deleteProduct = (id) => {
    dispatch(actions.deleteProduct(id));
  }

  const columns = [
    {
        Header: "Date Time",
        disableSortBy: true,
        disableFilters: true,
        accessor: "DATES",
        Cell: ({value}) => value
    },
    {
        Header: "Message",
        disableSortBy: true,
        disableFilters: true,
        accessor: "MESSAGE",
        Cell: ({value}) => value
    },
    {
        Header: "User",
        disableSortBy: true,
        disableFilters: true,
        accessor: "USERNAME",
        Cell: ({value}) => value
    },
];

  return (
    <>
      {auditLogs && <ReactTable tableColumns={columns} tableData={auditLogs} deleteProduct={deleteProduct}/>}
    </>
  );
}
