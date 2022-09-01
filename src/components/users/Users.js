import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layot/Spinner"; // za if-else
import GithubContext from "../../context/github/githubContext";

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { users, loading } = githubContext;

  // unutar App.js komponenta <Users /> od state-a uzima "users array i loading"
  if (loading) {
    //ako je u App.js u componentDidMount() loading -true
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {" "}
        {users.map((user) => (
          <UserItem key={user.id} user={user} /> // user unutar <UserItem /> je user iz map()
        ))}{" "}
      </div>
    );
  }
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};
export default Users;
