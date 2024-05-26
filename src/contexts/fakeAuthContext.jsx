import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useUser } from "../features/users/useUser";
import Spinner from "../ui/Spinner";

const AuthContext = createContext();

function AuthProvider({ children }) {
  // User juliusomo will always be authenticated as default and available for every component in our app
  const { user, isLoading, error } = useUser(4);
  const isAuthenticated = !!user;

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <AuthContext.Provider value={{ isAuthenticated, userLogged: user }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
