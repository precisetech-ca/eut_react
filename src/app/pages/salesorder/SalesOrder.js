import React from "react";
import { Route, Switch } from "react-router-dom";
import { UIProvider } from "./context/UIContext";
import { EditSalesOrder } from "./components/module/EditSalesOrder";
import { HomePageCard } from "./components/HomePageCard";
import { NewSalesOrder } from "./components/module/NewSalesOrder";
import { SupplierForm } from "./components/forms/SupplierForm";
import { ViewSalesOrder } from "./components/module/ViewSalesOrder";

const SalesOrder = ({dispatch, history}) => {
    const salesorderUIEvents = {
        newSalesOrderForm: () => {
          history.push("/salesorder/new");
        },
        editSalesOrderForm: (id) => {
          history.push(`/salesorder/${id}/edit`);
        },
        openDeleteCustomerDialog: (id) => {
          history.push(`/e-commerce/customers/${id}/delete`);
        },
        openDeleteCustomersDialog: () => {
          history.push(`/e-commerce/customers/deleteCustomers`);
        },
        openFetchCustomersDialog: () => {
          history.push(`/e-commerce/customers/fetch`);
        },
        openUpdateCustomersStatusDialog: () => {
          history.push("/e-commerce/customers/updateStatus");
        }
    }
    

  return (
    <UIProvider salesorderUIEvents={salesorderUIEvents}>
      <Switch>
        <Route exact path="/salesorder/new">
          {({ history, match }) => (
            <NewSalesOrder />
          )}
        </Route>
        <Route exact path="/salesorder/:id/edit">
          {({ history, match }) => (
            <EditSalesOrder />
          )}
        </Route>
        <Route exact path="/salesorder/:id/view">
          {({ history, match }) => (
            <ViewSalesOrder />
          )}
        </Route>
        <Route exact path="/salesorder">
          {({ history, match }) => (
            <HomePageCard />
          )}
        </Route>
      </Switch>
      <SupplierForm />
    </UIProvider>
  );
}

export default SalesOrder;