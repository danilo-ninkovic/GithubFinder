import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";

const Search = ({ setAlert }) => {
  const githubContext = useContext(GithubContext); //props za Search su uvezene preko GithubContext-a
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("molimo upišite nešto", "light");
    } else {
      githubContext.searchInApp(text); //funkc će biti pozvana preko githubContext.js iz GithubState.js a preko githubReducer.js-a
      setText("");
    }
  };
  //komponent state može ostati u komponenti ali globalne state postavljati u App.js
  //{ [e.target.name]: e.target.value } je univerzalan update za sve input-e
  //znači može se koristiti jedan OnChange() za update state-a od više inputa

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search users ...'
          value={text}
          onChange={onChange}
          autoComplete='off'
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>

      {githubContext.users.length > 0 && ( //&& OPERATOR
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers} //funkcija cleanUsers se šalje kao props komponente unutar App.js
        >
          Nazad
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default Search;
