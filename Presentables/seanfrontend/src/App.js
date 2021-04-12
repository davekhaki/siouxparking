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
import LogoutButtonComponent from "./Components/LogoutButtonComponent";
import Profile from "./Components/BinderComponent";

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
              <Grid item xs={12}>
                <div>
                  <LoginButtonComponent />
                  <LogoutButtonComponent />
                  <Profile />
                </div>
              </Grid>
            </Grid>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
