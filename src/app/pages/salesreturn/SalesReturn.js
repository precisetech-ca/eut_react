import React from "react";
import { Route, Switch } from "react-router-dom";
import { UIProvider } from "./context/UIContext";
import { EditSalesReturn } from "./components/module/EditSalesReturn";
import { HomePageCard } from "./components/HomePageCard";
import { NewSalesReturn } from "./components/module/NewSalesReturn";
import { SupplierForm } from "./components/forms/SupplierForm";
import { ViewSalesReturn } from "./components/module/ViewSalesReturn";

const SalesReturn = ({dispatch, history}) => {
    const salesreturnUIEvents = {
        newSalesReturnForm: () => {
          history.push("/salesreturn/new");
        },
        editSalesOrderForm: (id) => {
          history.push(`/salesreturn/${id}/edit`);
        },
    }
     

  return (
    <UIProvider salesreturnUIEvents={salesreturnUIEvents}>
      <Switch>
        <Route exact path="/salesreturn/new">
          {({ history, match }) => (
            <NewSalesReturn />
          )}
        </Route> 
        <Route exact path="/salesreturn/:id/edit">
          {({ history, match }) => (
            <EditSalesReturn />
          )}
        </Route>
        <Route exact path="/salesreturn/:id/view">
          {({ history, match }) => (
            <ViewSalesReturn />
          )}
        </Route>
        <Route exact path="/salesreturn">
          {({ history, match }) => (
            <HomePageCard />
          )}
        </Route>
      </Switch>
      <SupplierForm />
    </UIProvider>
  );
}

export default SalesReturn;