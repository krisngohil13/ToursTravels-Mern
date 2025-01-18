import { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user: localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  error: null,
  isAdmin: localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user"))?.role === 'admin' : false
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
        isAdmin: false
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
        isAdmin: action.payload?.role === 'admin'
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
        isAdmin: false
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        user: null,
        loading: false,
        error: null,
        isAdmin: false
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null,
        isAdmin: false
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const expirationTime = parsedUser.tokenExpiration;
      const currentTime = new Date().getTime();
      
      if (expirationTime && currentTime > expirationTime) {
        dispatch({ type: "LOGOUT" });
      } else {
        dispatch({ type: "LOGIN_SUCCESS", payload: parsedUser });
      }
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      const userWithExpiration = {
        ...state.user,
        tokenExpiration: new Date().getTime() + 5 * 60 * 60 * 1000,
      };
      localStorage.setItem("user", JSON.stringify(userWithExpiration));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        isAdmin: state.isAdmin,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
