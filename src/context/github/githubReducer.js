/*
funkcije koje su bile u App.js-u sad su kao type-s
i one će se aktivirati pomoću switch-a koji će se aktivirati preko "dispatch-a"
unutar GithubState a u dispatch-u je type koji aktivira ovde određenu funkciju i daje joj 
vrijednos "payload" 
Sve ove funkcije se mogu pozvati bilo gdje, samo treba importovati GithubContext.js
i funkciju pozvati npr. githubContext.searchInApp(text);
funkcija searchInApp() je deklarisana u GithubState.js i preko dispatch()
šalje type(importovani ispod) i payload
*/

import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

export default (state, action) => {
  //state je vrijednost trenutnih state-a od initialState a action.type su ovi tipovi iznad
  //type je jedna od gore importovanih funkcija
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload, //payload je res.data.items od axios request-a u GithubState.js
        loading: false, //prekida spinner
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state, //all curent state (initialState)
        loading: true, // a loading prebacuje sa false na true, nema payload-a da ubaci nešto samo sa false na true a u ostalim će biti ponovo false
      };
    default:
      return state;
  }
};
