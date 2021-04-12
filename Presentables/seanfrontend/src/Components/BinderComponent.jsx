import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ListRecordsComponent from "./ListRecordsComponent";
import AddRecordsComponent from "./AddRecordsComponent";

import Grid from "@material-ui/core/Grid";

const BinderComponent = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <ListRecordsComponent />
      </div>
    )
  );
};

export default BinderComponent;
