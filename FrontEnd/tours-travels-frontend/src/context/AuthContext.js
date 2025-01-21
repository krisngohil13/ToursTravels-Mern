import { createContext, useEffect, useReducer } from "react";

const getStoredUser = () => {
  try {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") {
      return null;
    }
    const userData = JSON.parse(storedUser);
    
    // Verify minimum required data using 'id' instead of '_id'
    if (!userData.token || !userData.id || !userData.email) {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      return null;
    }
    return userData;
  } catch (error) {
    console.error("Error parsing stored user:", error);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    return null;
  }
};

const initial_state = {
  user: getStoredUser(),
  loading: false,
  error: null,
  isAdmin: getStoredUser()?.role === 'admin'
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
      try {
        if (!action.payload || !action.payload.token || !action.payload.id) {
          throw new Error("Invalid or incomplete user data");
        }
        const userData = {
          ...action.payload,
          tokenExpiration: new Date().getTime() + 5 * 60 * 60 * 1000
        };
        sessionStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.setItem("token", userData.token);
        return {
          user: userData,
          loading: false,
          error: null,
          isAdmin: userData.role === 'admin'
        };
      } catch (error) {
        console.error("Error in LOGIN_SUCCESS:", error);
        return {
          ...state,
          error: error.message,
          loading: false
        };
      }
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
        isAdmin: false
      };
    case "LOGOUT":
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
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
    const storedUser = getStoredUser();
    if (storedUser) {
      const expirationTime = storedUser.tokenExpiration;
      const currentTime = new Date().getTime();
      
      if (expirationTime && currentTime > expirationTime) {
        dispatch({ type: "LOGOUT" });
      } else {
        dispatch({ type: "LOGIN_SUCCESS", payload: storedUser });
      }
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      const userWithExpiration = {
        ...state.user,
        tokenExpiration: new Date().getTime() + 5 * 60 * 60 * 1000, // 5 hours
      };
      try {
        sessionStorage.setItem("user", JSON.stringify(userWithExpiration));
      } catch (error) {
        console.error("Error updating user data:", error);
      }
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
