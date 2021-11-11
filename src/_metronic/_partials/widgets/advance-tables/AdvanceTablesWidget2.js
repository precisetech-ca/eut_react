/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo } from "react";
import { Nav, Tab } from "react-bootstrap";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_helpers";


export function AdvanceTablesWidget2({ className }) {
  const [key, setKey] = useState("Month");

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
                <th className="p-0" style={{ width: "100px" }} >PO #</th>
                <th className="p-0" style={{ minWidth: "100px" }} > PO Date</th>
                <th className="p-0" style={{ minWidth: "160px" }} > Lead Time</th>
                <th className="p-0" style={{ minWidth: "100px" }} > Supplier</th>
                <th className="p-0" style={{ minWidth: "150px" }} > Warehouse</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light mr-1">
                  PO000180
                  </div>
                </td>
                <td className="pl-0">
                  <div>
                  1900-01-01T00:00:00+00:00
                  </div>
                </td>
                <td className="pl-0">
                 
                </td>
                <td className="">
                  <span className="text-muted font-weight-500">
                  VANCOUVER FIRE PREVENTION
                  </span>
                </td>
                <td className="">
                  <span className="label label-lg label-light-primary label-inline">
                  CORNWALL 
                  </span>
                </td>
                
              </tr>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                  PO000180
                  </div>
                </td>
                <td className="pl-0">
                <div>
                  1900-01-01T00:00:00+00:00
                  </div>
                </td>
                <td className="pl-0">
               
                </td>
                <td className="">
                  <span className="text-muted font-weight-500">
                  VANCOUVER FIRE PREVENTION
                  </span>
                </td>
                <td className="">
                  <span className="label label-lg label-light-warning label-inline">
                  CORNWALL 
                  </span>
                </td>
                
              </tr>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                  PO000180
                  </div>
                </td>
                <td className="pl-0">
                <div>
                  1900-01-01T00:00:00+00:00
                  </div>
                </td>
                <td className="pl-0">
               
                </td>
                <td className="">
                  <span className="text-muted font-weight-500">
                  VANCOUVER FIRE PREVENTION
                  </span>
                </td>
                <td className="">
                  <span className="label label-lg label-light-success label-inline">
                  CORNWALL 
                  </span>
                </td>
                
              </tr>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                  PO000180
                  </div>
                </td>
                <td className="pl-0">
                <div>
                  1900-01-01T00:00:00+00:00
                  </div>
                </td>
                <td className="">
               
                </td>
                <td className="">
                  <span className="text-muted font-weight-bold">
                  VANCOUVER FIRE PREVENTION
                  </span>
                </td>
                <td className="">
                  <span className="label label-lg label-light-danger label-inline">
                  CORNWALL
                  </span>
                </td>
                
              </tr>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                    PO000180
                  </div>
                </td>
                <td className="pl-0">
                <div>
                  1900-01-01T00:00:00+00:00
                  </div>
                </td>
                <td className="pl-0">
               
                </td>
                <td className="">
                  <span className="text-muted font-weight-500">
                  VANCOUVER FIRE PREVENTION
                  </span>
                </td>
                <td className="">
                  <span className="label label-lg label-light-warning label-inline">
                  CORNWALL 
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
