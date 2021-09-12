import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormField } from "./Form";

const Auth: React.FC = ({ children }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  if (!authToken) {
    return (
      <main className="container p-4 mx-auto max-w-screen-sm">
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post("/api/auth", credentials)
                .then((response) => {
                  console.log(response);
                  if (response.data?.token) {
                    setAuthToken(response.data.token);
                    sessionStorage.setItem("authToken", response.data?.token);
                  }
                })
                .catch((e) => {
                  console.error(e);
                  setError("Invalid user or password");
                });
            }}
          >
            <p>{error}</p>

            <FormField
              label="email"
              type="email"
              value={credentials.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCredentials((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />

            <FormField
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />

            <button type="submit">Login</button>
          </form>
        </div>
      </main>
    );
  }

  return <>{children}</>;
};

export default Auth;
