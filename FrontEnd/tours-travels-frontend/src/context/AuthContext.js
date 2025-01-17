import { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user: localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload, // Make sure _id is part of the payload
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  // Check if the token has expired every time the user data changes
  useEffect(() => {
    // Retrieve the user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Check if the token has expired (e.g., 5 hours expiration)
      const expirationTime = parsedUser.tokenExpiration;
      const currentTime = new Date().getTime();
      
      if (expirationTime && currentTime > expirationTime) {
        dispatch({ type: "LOGOUT" }); // Logout if the token has expired
      } else {
        // Otherwise, set user to state
        dispatch({ type: "LOGIN_SUCCESS", payload: parsedUser });
      }
    }
  }, []);

  // Whenever the user data changes, save it to localStorage along with an expiration time (5 hours)
  useEffect(() => {
    if (state.user) {
      const userWithExpiration = {
        ...state.user,
        tokenExpiration: new Date().getTime() + 5 * 60 * 60 * 1000, // Expire in 5 hours
      };
      localStorage.setItem("user", JSON.stringify(userWithExpiration)); // Store user and expiration time
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
