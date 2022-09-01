import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layot/Navbar";
import Alert from "./components/layot/Alert";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import User from "./components/users/User";
import About from "./components/pages/About";
import GithubState from "./context/github/GithubState";
import axios from "axios";
import "./App.css"; //zbog dohvatanja  css-a ispod u render()

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //get user repos

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      //"username" je u stvari login od objekta user
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
        &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  // Alert pri praznom unosu
  const showAlert = (msg, type) => {
    setAlert({ msg, type }); //alert postaje {} sa msg i type
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <GithubState>
      <Router>
        <div>
          <nav className='navbar bg-primary'>
            <Navbar />
          </nav>
          <div className='container'>
            <Alert alert={alert} />{" "}
            {/** <Alert/> će biti renderovan ako je alert objekat a ne null */}
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              {/* kao komponentu će na ovom route-u prikazati <About/> to je moguće saamo ako komponenta nema props  */}
              <Route
                exact
                path='/user/:login' // ovaj URL se linkuje sa buttona u <userItem /> login je u stvari  "username" od user-a
                render={(props) => (
                  <User
                    {...props}
                    getUserRepos={getUserRepos} //funkcija će se pozvati iz <User/> komponente
                    repos={repos} //repos state
                    loading={loading}
                  />
                )}
              />
            </Switch>
            {/* unutar Switcha mijenjamo stranice pomoću <Route/>  a sav return() mora biti u </Router> - u */}
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
