import { createContext, useContext, useState, useEffect } from "react"
// interface
const IAuth = {
  isLoaded: false,
  isAuthed: false,
  user: { username: "wael" },
  SignIn: () => { },
}

// context
const AuthContext = createContext(IAuth)

// usecontext
const useAuth = () => useContext(AuthContext)

// context provider
const AuthContextProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser ] = useState({ username: "wael" })
  useEffect(() => { preLoad() }, []);

  const preLoad = () => {
    setTimeout(() => {
      setIsLoaded(true)
      setIsAuthed(false)
    }, 1000);
  }

  const SignIn = async (email, password) => {
    return new Promise((r, _) => {
      setTimeout(() => {
        setIsAuthed(true);
        //  r("wrong email or password.")
      }, 2000);
    })
  }

  return (
    <AuthContext.Provider value={{
      isLoaded,
      isAuthed,
      user,
      SignIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}
// export
export { AuthContext, AuthContextProvider, useAuth }