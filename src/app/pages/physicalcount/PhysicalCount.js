import React from "react";
import { Route, Switch } from "react-router-dom";
import { PhysicalCountUIProvider } from "./context/PhysicalCountUIContext";
import { HomePageCard } from "./components/HomePageCard";
import { NewPhysicalCount } from "./components/module/NewPhysicalCount";
import { ViewPhysicalCount } from "./components/module/ViewPhysicalCount";
import { EditPhysicalCount } from "./components/module/EditPhysicalCount";
import { AddPartForm } from "./components/forms/AddPartModal";
import {  NewPartForm } from "./components/forms/NewPartForm";

const PhysicalCount = ({dispatch, history}) => {
    const physicalscountUIEvents = {
        newPhysicalCountForm: () => {
          history.push("/physicalcount/new");
        },
        editPhysicalCountForm: (id) => {
          history.push(`/physicalcount/${id}/edit`);
        },
    }
    

  return (
    <PhysicalCountUIProvider physicalscountUIEvents={physicalscountUIEvents}>
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
        <AddPartForm />
        <NewPartForm />
    </PhysicalCountUIProvider>
  );
}

export default PhysicalCount;