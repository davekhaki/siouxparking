import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import ListRecordsComponent from "./Components/ListRecordsComponent";
import HeaderComponent from "./Components/HeaderComponent";
import FooterComponent from "./Components/FooterComponent";
import AddRecordsComponent from "./Components/AddRecordsComponent";
import UpdateRecordsComponent from "./Components/UpdateRecordsCompnent";

// import BinderComponent from "./Components/BinderComponent";

import "bootstrap/dist/css/bootstrap.min.css";
// import Grid from "@material-ui/core/Grid";
import VisitHistoryComponent from "./Components/VisitHistoryComponent";
import HomeComponent from "./Components/HomeComponent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={HomeComponent}></Route>
            <Route
              path="/records"
              exact
              component={ListRecordsComponent}
            ></Route>
            <Route path="/add-record" component={AddRecordsComponent}></Route>
            <Route
              path="/update-record/:id"
              component={UpdateRecordsComponent}
            ></Route>
            <Route
              path="/visit-history"
              component={VisitHistoryComponent}
            ></Route>
          </Switch>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
