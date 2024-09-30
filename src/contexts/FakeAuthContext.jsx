import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type:"login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <AuthContext.Provider value={{login, logout, user, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthProvider");
  }
  return context
}

export { AuthProvider, useAuth };
