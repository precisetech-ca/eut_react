import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import SalesReturn from "./pages/salesreturn/SalesReturn";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const InventoryPage = lazy(() =>
  import("./pages/inventory/Inventory")
);
const PurchasePage = lazy(() =>
  import("./pages/purchase/Purchase")
);
const PartsReturnPage = lazy(() =>
  import("./pages/partsreturn/PartsReturn")
);
const PhysicalCountPage = lazy(() =>
  import("./pages/physicalcount/PhysicalCount")
);
const ReceivingPage= lazy(() => 
  import("./pages/receiving/Receiving")
)
const Salesorder= lazy(() => 
  import('./pages/salesorder/SalesOrder')
)
const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/builder"   component={BuilderPage} />
        <ContentRoute path="/my-page"   component={MyPage} />
        <Route path="/google-material"  component={GoogleMaterialPage} />
        <Route path="/react-bootstrap"  component={ReactBootstrapPage} />
        <Route path="/inventory"        component={InventoryPage} />
        <Route path="/purchase"         component={PurchasePage} />
        <Route path="/partsreturn"      component={PartsReturnPage} />
        <Route path='/physicalcount'    component={PhysicalCountPage} />
        <Route path="/receiving"        component={ReceivingPage} />
        <Route path="/salesorder"       component={Salesorder} />
        <Route path="/salesreturn"      component={SalesReturn} />
        <Route path="/user-profile"     component={UserProfilepage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
