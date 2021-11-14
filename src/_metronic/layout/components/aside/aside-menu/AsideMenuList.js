/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li className="menu-section ">
          <h4 className="menu-text">APPLICATION</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        <li className="menu-section ">
          <h4 className="menu-text">SALES</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/customers"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link " to="/salesorder">
            <span className="menu-text">Sales Orders</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/customers"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/salesreturn">
            <span className="menu-text">Sales Returns</span>
          </NavLink>
        </li>
        {/*end::4 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/customers"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/partsreturn">
            <span className="menu-text">Parts Return</span>
          </NavLink>
        </li>
        {/*end::4 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/customers"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/physicalcount">
            <span className="menu-text">Physical Count</span>
          </NavLink>
        </li>
        <li className="menu-section ">
          <h4 className="menu-text">Purchase</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/customers"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/purchase">
            {/* <i className="menu-bullet menu-bullet-dot">
              <span />
            </i> */}
            <span className="menu-text">Purchase</span>
          </NavLink>
        </li>
          {/*begin::3 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/customers"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/receiving">
            {/* <i className="menu-bullet menu-bullet-dot">
              <span />
            </i> */}
            <span className="menu-text">Receiving </span>
          </NavLink>
        </li>
        
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/customers"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/inventory">
            {/* <i className="menu-bullet menu-bullet-dot">
              <span />
            </i> */}
            <span className="menu-text">Item Master</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/customers"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/supplierreturns">
            {/* <i className="menu-bullet menu-bullet-dot">
              <span />
            </i> */}
            <span className="menu-text">Supplier Returns</span>
          </NavLink>
        </li>
        <li className="menu-section ">
          <h4 className="menu-text">INVOICE</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        <li
            className={`menu-item ${getMenuItemActive(
              "/e-commerce/customers"
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/invoice">
              {/* <i className="menu-bullet menu-bullet-dot">
                <span />
              </i> */}
              <span className="menu-text">invoice</span>
            </NavLink>
        </li> 
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/customers"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/purchasegroup">
            {/* <i className="menu-bullet menu-bullet-dot">
              <span />
            </i> */}
            <span className="menu-text">Purchase Group</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
}
