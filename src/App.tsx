import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Movies from "./containers/Movies";
import Rentals from "./components/Rentals";
import Customers from "./components/Customers";
import MovieForm from "./components/MovieForm";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";

const App: React.FC = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="container">
        <Switch>
          <Route exact path="/">
            <Movies />
          </Route>
          <Route exact path="/movies">
            <Movies />
          </Route>
          <Route exact path="/customers">
            <Customers />
          </Route>
          <Route exact path="/rentals">
            <Rentals />
          </Route>
          <Route exact path="/movies/:id" component={MovieForm} />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/not-found">
            <NotFound />
          </Route>
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
};

export default App;
