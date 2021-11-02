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
        {/*end::1 Level*/}

        {/* Applications */}
        
        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">SALES</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* end:: section */}
        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item menu-item-submenu  ${getMenuItemActive(
            "/e-commerce",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/e-commerce">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")} />
            </span>
            <span className="menu-text">Sales</span>
          </NavLink>
            <i className="menu-arrow" />
          <div className="menu-submenu">
            <ul className="menu-subnav"> 
            {/*begin::4 Level*/}
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
            {/* </ul>
          </div>
        </li> */}

        {/*end::1 Level*/}

        <li className="menu-section ">
          <h4 className="menu-text">STOCK</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* <li
          className={`menu-item menu-item-submenu  ${getMenuItemActive(
            "/e-commerce",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/e-commerce">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")} />
            </span>
            <span className="menu-text">Purchase</span>
          </NavLink>
          <div className="menu-submenu">
            <i className="menu-arrow" />
            <ul className="menu-subnav"> */}
              
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
               {/* </ul>
              </div>
            </li>  */}

            <li className="menu-section ">
              <h4 className="menu-text">STOCK</h4>
              <i className="menu-icon flaticon-more-v2"></i>
            </li>
            {/* <li
              className={`menu-item menu-item-submenu  ${getMenuItemActive(
                "/e-commerce",
                true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <NavLink className="menu-link menu-toggle" to="/e-commerce">
                <span className="svg-icon menu-icon">
                  <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")} />
                </span>
                <span className="menu-text">Stock</span>
              </NavLink>
              <div className="menu-submenu">
                <i className="menu-arrow" />
                <ul className="menu-subnav"> */}
                  
                <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/customers"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/product">
                      {/* <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i> */}
                      <span className="menu-text">Product</span>
                    </NavLink>
                  </li>
                    {/*begin::3 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/customers"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/stockcount">
                      {/* <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i> */}
                      <span className="menu-text">Stock Count</span>
                    </NavLink>
                  </li>
                
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/customers"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/adjustment">
                      {/* <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i> */}
                      <span className="menu-text">Adjustment</span>
                    </NavLink>
                  </li>
                    <li
                      className={`menu-item ${getMenuItemActive(
                        "/e-commerce/customers"
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink className="menu-link" to="/transaction">
                        {/* <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i> */}
                        <span className="menu-text">Transaction</span>
                      </NavLink>
                    </li>
                  {/* </ul>
                  </div>
                </li>  */}


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
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
