import React, { lazy, Suspense } from "react";
import Header from "./components/common/Header";
import PageNotFound from "./components/PageNotFound";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import SignInPage from "./components/login/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import Spinner from "./components/common/Spinner";

//Using React.lazy & suspense
const DashboardPage = lazy(() => import("./components/dashboard/DashBoard"));
const ManagePassengerPage = lazy(() =>
  import("./components/passenger/managePassengerPage")
);
const AncillaryServicePage = lazy(() =>
  import("./components/passenger/ancillaryServicePage")
);
const CheckInPassengerPage = lazy(() =>
  import("./components/passenger/checkInPassengerPage")
);
const InFlightPage = lazy(() => import("./components/passenger/inflightpage"));

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container className="container">
        <Switch>
          <Route path="/signin" component={SignInPage} />
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute exact path="/" component={DashboardPage} />
            <ProtectedRoute path="/dashboard" component={DashboardPage} />
            <ProtectedRoute path="/passenger" component={ManagePassengerPage} />
            <ProtectedRoute
              path="/ancillary"
              component={AncillaryServicePage}
            />
            <ProtectedRoute path="/checking" component={CheckInPassengerPage} />
            <ProtectedRoute path="/inflight" component={InFlightPage} />
          </Suspense>
          <Route path="*" component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </Container>
    </React.Fragment>
  );
};
export default App;
