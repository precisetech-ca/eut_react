/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState ,  useEffect, useMemo } from "react";
import SVG from "react-inlinesvg";
import { Nav, Tab } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../_helpers";

export function AdvanceTablesWidget7({ className }) {
  const [key, setKey] = useState("Month");



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
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive">
          <table className="table table-borderless table-vertical-center">
            <thead>
              <tr>
                <th className="p-0" style={{ width: "100px" }} >Receiving #</th>
                <th className="p-0" style={{ minWidth: "100px" }} > Receiving Date</th>
                <th className="p-0" style={{ minWidth: "100px" }} > Supplier</th>
                <th className="p-0" style={{ minWidth: "100px" }} > Supplier Invoice</th>
                <th className="p-0" style={{ minWidth: "100px" }} > PO Number</th>
                <th className="p-0" style={{ minWidth: "100px" }} > Completed Date</th>
                <th className="p-0" style={{ minWidth: "100px" }} > RFP Date</th>


              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light mr-1">
                  REC000211
                  </div>
                </td>
                <td className="pl-0">
                  <div>
                  1998-01-11T00:00:00-08:00
                  </div>
                </td>
                <td className="pl-0">
                <div>
                  MARGARET YANISH	
                  </div>
                </td>
                <td className="">
                  <span className="text-muted font-weight-500">
                  23
                  </span>
                </td>
                <td className="">
                  <span className="label label-lg label-light-primary label-inline">
                  PO000008 
                  </span>
                </td>
               
              </tr>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                  REC000211
                  </div>
                </td>
                <td className="pl-0">
                <div>
                 1998-01-11T00:00:00-08:00
                  </div>
                </td>
                <td className="pl-0">
                <div>
                  MARGARET YANISH	
                  </div>
                </td>
                <td className="">
                  <span className="text-muted font-weight-500">
                  23
                  </span>
                </td>
                <td className="">
                  <span className="label label-lg label-light-warning label-inline">
                  PO000008 
                  </span>
                </td>
                
              </tr>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                  REC000211
                  </div>
                </td>
                <td className="pl-0">
                <div>
                 1998-01-11T00:00:00-08:00
                  </div>
                </td>
                <td className="pl-0">
                <div>
                  MARGARET YANISH	
                  </div>
                </td>
                <td className="">
                  <span className="text-muted font-weight-500">
                  23
                  </span>
                </td>
                <td className="">
                  <span className="label label-lg label-light-success label-inline">
                  PO000008 
                  </span>
                </td>
              
              </tr>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                  REC000211
                  </div>
                </td>
                <td className="pl-0">
                <div>
                 1998-01-11T00:00:00-08:00
                  </div>
                </td>
                <td className="pl-0">
                <div>
                  MARGARET YANISH	
                  </div>
                </td>
                <td className="">
                  <span className="text-muted font-weight-bold">
                  23
                  </span>
                </td>
                <td className="">
                  <span className="label label-lg label-light-danger label-inline">
                  PO000008
                  </span>
                </td>
                
              </tr>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                  REC000211
                  </div>
                </td>
                <td className="pl-0">
                <div>
                 1998-01-11T00:00:00-08:00
                  </div>
                </td>
                <td className="pl-0">
                <div>
                  MARGARET YANISH	
                  </div>
                </td>
                <td className="">
                  <span className="text-muted font-weight-500">
                  23
                  </span>
                </td>
                <td className="">
                  <span className="label label-lg label-light-warning label-inline">
                  PO000008 
                  </span>
                </td>
               
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
