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
        currentState: state.receiving, 
        auditLogs: state.receiving.auditLogs 
    }),
    shallowEqual
  );
  const { auditLogs } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.auditLogDataAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersUIProps.queryParams, dispatch]);

  const deleteProduct = (id) => {
    dispatch(actions.deleteProduct(id));
  }

  const columns = [
    {
        Header: "Date Time",
        disableSortBy: true,
        disableFilters: true,
        accessor: "date_time",
        Cell: ({value}) => value
    },
    {
        Header: "Message",
        disableSortBy: true,
        disableFilters: true,
        accessor: "message",
        Cell: ({value}) => value
    },
    {
        Header: "User",
        disableSortBy: true,
        disableFilters: true,
        accessor: "user",
        Cell: ({value}) => value
    },
];

  return (
    <>
      {auditLogs && <ReactTable tableColumns={columns} tableData={auditLogs} deleteProduct={deleteProduct}/>}
    </>
  );
}
