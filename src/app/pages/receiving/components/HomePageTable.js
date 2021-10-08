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
      ids: UIContext.ids,
      newReceivingForm: UIContext.newReceivingForm,
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
        accessor: "action",
        disableSortBy: true,
        disableFilters: true,
        Cell: () => {
            return (
              <>
                <i class="fas fa-pencil-alt text-primary"
                style={{cursor:'pointer'}}
                onClick={() => {
                        customersUIProps.newReceivingForm();
                    }}
                />
                <i 
                style={{cursor:'pointer'}}
                class="fas fa-trash text-danger ml-3" />
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
