import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ListRecordsComponent from "./Components/ListRecordsComponent";
import HeaderComponent from "./Components/HeaderComponent";
import FooterComponent from "./Components/FooterComponent";
import AddRecordsComponent from "./Components/AddRecordsComponent";
import UpdateRecordsComponent from "./Components/UpdateRecordsCompnent";

import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@material-ui/core/Grid";
import LoginButtonComponent from "./Components/LoginButtonComponent";
import LogoutButtonComponent from "./Components/LoginButtonComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            {" "}
            {/*<Route path="/" component={App}></Route>*/}
            <Route path="/records" component={ListRecordsComponent}></Route>
            <Route path="/add-record" component={AddRecordsComponent}></Route>
            <Route
              path="/update-record/:id"
              component={UpdateRecordsComponent}
            ></Route>
            <Grid container>
              <Grid item xs={7}>
                <div>
                  <LoginButtonComponent />
                  <LogoutButtonComponent />
                  <ListRecordsComponent />
                </div>
              </Grid>
              <Grid item xs={5}>
                <div>
                  <AddRecordsComponent />
                </div>
              </Grid>
            </Grid>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
