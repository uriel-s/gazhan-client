import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  function getId(){
    return auth.currentUser.uid
  }

  
  
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  

  function updateEmail(email) {
    console.log("call update firebase eamil , " ,email)
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    console.log("call update firebase password , " ,password)
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    getId,
    login,
    signup,
    logout,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}