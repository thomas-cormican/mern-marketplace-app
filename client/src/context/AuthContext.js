import { createContext, useReducer, useEffect } from "react";
import { AuthReducer } from "./AuthReducer";
import Cookies from "js-cookie";
import axios from "axios";

const INITIAL_STATE = {
  user: null,
  fetching: true,
  error: false,
  notification: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const login = async (withCookie = false, usernameOrEmail, password) => {
    dispatch({ type: "LOGIN_START" });
    try {
      let response;
      if (withCookie) {
        response = await axios.post("/auth/verify");
      } else {
        response = await axios.post("/auth/login", {
          usernameOrEmail,
          password,
        });
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: response.data.user },
      });
    } catch (err) {
      if (withCookie) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { error: err, notification: null },
        });
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: {
            error: err,
            notification: "Incorrect username or password",
          },
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  useEffect(() => {
    const cookies = Cookies.get();
    const autoLogin = async () => {
      if (cookies.user) {
        login(true);
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { error: "Invalid cookie" },
        });
      }
    };

    autoLogin();
  }, []);

  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      dispatch({ type: "LOGOUT" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
      //send some sort of logged out message
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
