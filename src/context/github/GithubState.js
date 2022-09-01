// osnovni state i actions (search i requestions from gGithub) preneseno iz App.js-a
//koristit će se Type-s iz types.js
import React, { useReducer } from "react"; //useReducer hook
import axios from "axios"; // axios za request-e
import GithubContext from "./githubContext"; // inicijalizacije za createContext
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types"; // funkcije koje su bile u App.js-u sad su kao type-s

const GithubState = (props) => {
  const initialState = {
    // global state (sa poč. vrijednostima) iz App.js (osim alerta)
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  /*initialState je sad "state", pomoću dispatch-a šalje "zahtjev prema GithubReducer.js"
  gdje će će se odrediti pomoću parametra "type"
  koja funkcija će se povući pomoću switch-a iz GithubReducer.js
  payload je vrijednost parametra funkcije
*/

  // --------------Search svi Users (pretraga na osnovu unesenog texta)
  const searchInApp = async (text) => {
    setLoading(); //funkcija za pokretanje spinera -- dispatch({ type: SET_LOADING }) je ispod
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: SEARCH_USERS, // u githubReducer.js-u je changing state
      payload: res.data.items, //u GithubReducer.js vrijednost payloada postaje vrijednost za "users"
    });
  };

  //--------------------Get pojedinačni User(na click )
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      //"username" je u stvari login od objekta user
      `https://api.github.com/users/${username}?
        &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // --------------------Get Repos od user-a

  //----------------------Clear Users (brisanje pretrage)
  const clearUsers = () => dispatch({ type: CLEAR_USERS }); //setState-a na početne vrijednosti

  //----------------------------Set loading (to true) za spinner
  const setLoading = () => dispatch({ type: SET_LOADING });

  //sav return unutar App.js biti obuhvaćena unutar <GithubState>
  // kojem je return  <GithubContext.Provider>
  return (
    <GithubContext.Provider
      value={{
        //ovi parametri (value) iz state-a kao i actions(metode) će biti dostupni čitavoj aplikaciji
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchInApp,
        clearUsers,
        getUser,
      }}
    >
      {props.children} {/* children je ustvari return App.js-a  */}
    </GithubContext.Provider>
  );
};

export default GithubState;
