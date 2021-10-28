import React from "react";
import { Route, Switch } from "react-router-dom";
import { PartsReturnUIProvider } from "./context/PartsReturnUIContext";
import { EditPartsReturn } from "./components/module/EditPartsReturn";
import { HomePageCard } from "./components/HomePageCard";
import { NewPartsReturn } from "./components/module/NewPartsReturn";
import { SupplierForm } from "./components/forms/SupplierForm";
import { AddPartForm } from "./components/forms/AddPartModal";
import { ViewPartsReturn } from "./components/module/ViewPartsReturn";
import {  NewPartForm } from "./components/forms/NewPartForm";

const PartsReturn = ({dispatch, history}) => {
    const partsreturnUIEvents = {
        newPartsReturnForm: () => {
          history.push("/partsreturn/new");
        },
        editPartsReturnForm: (id) => {
          history.push(`/partsreturn/${id}/edit`);
        },
    }
    

  return (
    <PartsReturnUIProvider partsreturnUIEvents={partsreturnUIEvents}>
      <Switch>
        <Route exact path="/partsreturn/new">
          {({ history, match }) => (
            <NewPartsReturn />
          )}
        </Route>
        <Route exact path="/partsreturn/:id/edit">
          {({ history, match }) => (
            <EditPartsReturn /> 
          )}
        </Route>
        <Route exact path="/partsreturn/:id/view">
          {({ history, match }) => (
            <ViewPartsReturn />
          )}
        </Route>
        <Route exact path="/partsreturn">
          {({ history, match }) => (
            <HomePageCard />
          )}
        </Route>
      </Switch>
      <SupplierForm />
      <AddPartForm />
      <NewPartForm />
    </PartsReturnUIProvider>
  );
}

export default PartsReturn;