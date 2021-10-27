import React from "react";
import { Route, Switch } from "react-router-dom";
import { PhysicalCountUIProvider } from "./context/PhysicalCountUIContext";
import { HomePageCard } from "./components/HomePageCard";

import { NewPhysicalCount } from "./components/module/NewPhysicalCount";
import { ViewPhysicalCount } from "./components/module/ViewPhysicalCount";
import { EditPhysicalCount } from "./components/module/EditPhysicalCount";

import { SupplierForm } from "./components/forms/SupplierForm";
import { AddPartForm } from "./components/forms/AddPartModal";
import {  NewPartForm } from "./components/forms/NewPartForm";

const PhysicalCount = ({dispatch, history}) => {
    const physicalcountUIEvents = {
        newPartsReturnForm: () => {
          history.push("/physicalcount/new");
        },
        editPartsReturnForm: (id) => {
          history.push(`/physicalcount/${id}/edit`);
        },
    }
    

  return (
    <PhysicalCountUIProvider physicalcountUIEvents={physicalcountUIEvents}>
      <Switch>
        <Route exact path="/physicalcount/new">
          {({ history, match }) => (
            <NewPhysicalCount />
          )}
        </Route>
        <Route exact path="/physicalcount/:id/edit">
          {({ history, match }) => (
            <EditPhysicalCount /> 
          )}
        </Route>
        <Route exact path="/physicalcount/:id/view">
          {({ history, match }) => (
            <ViewPhysicalCount />
          )}
        </Route>
        <Route exact path="/physicalcount">
          {({ history, match }) => (
            <HomePageCard />
          )}
        </Route>
      </Switch>
        <SupplierForm />
        <AddPartForm />
        <NewPartForm />
    </PhysicalCountUIProvider>
  );
}

export default PhysicalCount;