/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState ,  useEffect, useMemo } from "react";
// import SVG from "react-inlinesvg";
import { Nav, Tab } from "react-bootstrap";
// import { toAbsoluteUrl } from "../../../_helpers";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../app/pages/inventory/_redux/actions";
import { useIinventoryUIContext } from "../../../../app/pages/inventory/context/InventoryUIContext";
import { ReactTable } from "../../../../app/pages/custom_widgets/table/ReactTable";
import {Input} from 'reactstrap';
import { Link } from "react-router-dom";

export function AdvanceTablesWidget7({ className }) {
  const [key, setKey] = useState("Month");

  // Customers UI Context
 
  const inventoryUIContext = useIinventoryUIContext();

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.inventory }),
    shallowEqual
  );
  const { inventoryItems } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.inventoryItemsFetched());
    dispatch(actions.getPartsUom());
    dispatch(actions.getSupplier());
    dispatch(actions.getWarehouses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const columns = [
    {
        Header: "Sku",
        Footer: "Sku",
        accessor: "PAR_CODE",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "*",
        Footer: "*",
        accessor: "DESCRIPTION",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
        Header: "Preffered Supplier",
        Footer: "Preffered Supplier",
        accessor: "SUPPLIER",
        disableFilters: true,
        Cell: ({value}) => value,
    },
    {
      Header: "Stock Qty",
      Footer: "Stock Qty",
      accessor: "WARRANTY",
      disableFilters: true,
      Cell: ({value}) => value,
    },
    {
      Header: "Cost",
      Footer: "Cost",
      accessor: "STANDARD_COST",
      disableFilters: true,
      Cell: ({value}) => value,
    },
    {
      Header: "Active Flag",
      Footer: "Active Flag",
      accessor: "ACTIVE_FLAG",
      disableFilters: true,
      Cell: ({value}) => <Input type="checkbox" value={value === 'Y' ? true : false} disabled={true} />,
    },
    {
        Header: "Action",
        accessor: "PAR_ID",
        disableSortBy: true,
        disableFilters: true,
        Cell: ({value}) => {
          return (
            <>
              <Link href="#inventory-edit" onClick={() => {
                inventoryUIContext.setEditHandler(true);
                inventoryUIContext.itemMasterToggle();
                inventoryUIContext.setEditData(value);
                inventoryUIContext.setIsViewable(false);
              }} >
                <i class="fas fa-pencil-alt text-success"></i>
              </Link>
              <Link href="#inventory-edit" onClick={() => {
                inventoryUIContext.itemMasterToggle();
                inventoryUIContext.setEditData(value);
                inventoryUIContext.setIsViewable(true);
                inventoryUIContext.setEditHandler(false);
              }} >
                <i class="fas fa-eye text-primary ml-3"></i>
              </Link>
          </>)
        }
    },
  ];

  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Inventory List
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            More than 400+ new members
          </span>
        </h3>
        <div className="card-toolbar">
          <Tab.Container defaultActiveKey={key}>
            <Nav
              as="ul"
              onSelect={(_key) => setKey(_key)}
              className="nav nav-pills nav-pills-sm nav-dark-75"
            >
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="Month"
                  className={`nav-link py-2 px-4 ${
                    key === "Month" ? "active" : ""
                  }`}
                >
                  Month
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="Week"
                  className={`nav-link py-2 px-4 ${
                    key === "Week" ? "active" : ""
                  }`}
                >
                  Week
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="Day"
                  className={`nav-link py-2 px-4 ${
                    key === "Day" ? "active" : ""
                  }`}
                >
                  Day
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
        </div>
      </div>
      {/* Body */}
      <div className="card-body pt-0 pb-3">
      <div className="table-responsive">
          {inventoryItems && <ReactTable tableColumns={columns} tableData={inventoryItems} /> }
      </div>
      </div>
    </div>
  );
}
