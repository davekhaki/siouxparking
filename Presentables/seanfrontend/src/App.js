import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import ListRecordsComponent from "./Components/ListRecordsComponent";
import HeaderComponent from "./Components/HeaderComponent";
import FooterComponent from "./Components/FooterComponent";
import AddRecordsComponent from "./Components/AddRecordsComponent";
import UpdateRecordsComponent from "./Components/UpdateRecordsCompnent";

import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@material-ui/core/Grid";
import VisitHistoryComponent from "./Components/VisitHistoryComponent";

function App() {
  return (
   
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Switch>
            {/*<Route path="/" component={App}></Route>*/}
            <Route path="/" exact component={ListRecordsComponent}></Route>
            <Route path="/records" component={ListRecordsComponent}></Route>
            <Route path="/add-record" component={AddRecordsComponent}></Route>
            <Route path="/update-record/:id" component={UpdateRecordsComponent}></Route>
            <Route path="/visit-history" component={VisitHistoryComponent}></Route>
            <Grid container>
              <Grid item xs={7}>
                <div>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
