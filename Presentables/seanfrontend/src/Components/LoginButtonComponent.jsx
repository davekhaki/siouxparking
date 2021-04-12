import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButtonComponent = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button
        style={{
          margin: "0",
          position: "absolute",
          top: "25%",
          left: "35%",
          height: "500px",
          width: "500px",
          fontSize: "150px",
        }}
        className="btn btn-success"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    )
  );
};

export default LoginButtonComponent;
