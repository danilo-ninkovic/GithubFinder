import React from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";

const Repos = ({ repos }) => {
  //repos[] iz App.js =>preko <User/> => <Repo/> => repo => <RepoItem/> onda return(div) => <User/> tako što će <Repo/> ići import u <User/>
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
