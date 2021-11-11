/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useState , useEffect, useMemo} from "react";
import { Nav, Tab } from "react-bootstrap";
// import SVG from "react-inlinesvg";
// import {toAbsoluteUrl} from "../../../_helpers";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../app/pages/purchase/_redux/actions";
import { useUIContext } from "../../../../app/pages/purchase/context/UIContext";
import {Input} from "reactstrap";
import { ReactTable } from "../../../../app/pages/custom_widgets/table/ReactTable";
import { Link } from "react-router-dom";



export function AdvanceTablesWidget2({ className }) {
  const [key, setKey] = useState("Month");
  const UIContext = useUIContext();
  const dispatch = useDispatch();

  const { currentState, userData } = useSelector(
    (state) => ({ currentState: state.purchase, userData: state.auth?.user }),
    shallowEqual
  );

  const {purchaseList} = currentState;

  useEffect(() => {
    dispatch(actions.fetchPurchaseList());
  }, []);
  
  const columns = [
    {
      Header: "PO#",
      Footer: "PO#",
      accessor: "PO_NUMBER",
      disableFilters: true,
      Cell: (props) => {
        return props?.value
      },
    },
    {
      Header: "PO Date",
      Footer: "PO Date",
      accessor: "PO_DATE",
      disableFilters: true,
       Cell: (props) => {
          return props?.value
        },
    },
    {
      Header: "Lead Time",
      Footer: "Lead Time",
      accessor: "FINALIZED_DATE",
      disableFilters: true,
       Cell: (props) => {
          return props?.value
        },
    },
    {
      Header: "Supplier",
      Footer: "Supplier",
      accessor: "SUPPLIER",
      disableFilters: true,
       Cell: (props) => {
          return props?.value
        },
    },
    {
      Header: "Warehouse",
      Footer: "Warehouse",
      accessor: "INVENTORY",
      disableFilters: true,
       Cell: (props) => {
          return props?.value
        },
    },
    // {
    //   Header: "Completion Date",
    //   Footer: "Completion Date",
    //   accessor: "",
    //   disableFilters: true,
    //    Cell: (props) => {
    //       return props?.value
    //     },
    // },
    {
      Header: "Void",
      Footer: "Void",
      accessor: "VOID",
      disableSortBy: true,
      disableFilters: true,
      Cell: ({props}) => <Input type="checkbox" checked={props?.value === 'Y' ? true: false} disabled={true} value={props?.value}/>,
    },
    {
      Header: "Action",
      accessor: "PURORD_ID",
      disableSortBy: true,
      disableFilters: true,
      Cell: ({value}) => {
        return (
          <>
            <Link href="#purchase-edit" onClick={() => UIContext?.editOrView(value)} >
              <i class="fas fa-pencil-alt text-success"></i>
            </Link>
            <Link href="#purchase-view" onClick={() => UIContext?.editOrView(value, 'view')} >
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
            Purchase Order Listing
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            More than 400+ new members
          </span>
        </h3>
        <div className="card-toolbar">
          <Tab.Container defaultActiveKey={key}>
            <Nav
              as="ul"
              onSelect={_key => setKey(_key)}
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
      {purchaseList && <ReactTable tableColumns={columns} tableData={purchaseList} />}
    </div>
    </div>
    </div>
  );
}
