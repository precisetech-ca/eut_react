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

  const deleteProduct = (id) => {
    dispatch(actions.deleteProduct(id));
  }

  const columns = [
    {
        Header: "Receiving #",
        Footer: "Receiving #",
        accessor: "receiving",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Receiving Date",
        Footer: "Receiving Date",
        accessor: "receiving_date",
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
        Header: "Supplier Invoice",
        Footer: "Supplier Invoice",
        accessor: "supplier_invoice",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Complete",
        Footer: "Complete",
        accessor: "complete",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "PO Number",
        Footer: "PO Number",
        accessor: "po_number",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Completed Date",
        Footer: "Completed Date",
        accessor: "completed_date",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
      Header: "RFP Date",
      Footer: "RFP Date",
      accessor: "rfp_date",
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
        accessor: "action",
        disableSortBy: true,
        disableFilters: true,
        Cell: () => {
            return (
              <>
                <i class="fas fa-pencil-alt text-primary"></i>
                <i class="fas fa-trash text-danger ml-3"></i>
            </>)
        }
    },
];

  return (
    <>
      {purchaseList && <ReactTable tableColumns={columns} tableData={purchaseList} deleteProduct={deleteProduct}/>}
    </>
  );
}
