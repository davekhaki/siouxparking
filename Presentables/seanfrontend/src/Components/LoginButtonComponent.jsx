import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButtonComponent = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="btn btn-success" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginButtonComponent;
