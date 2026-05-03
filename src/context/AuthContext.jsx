import { createContext, useContext, useState } from 'react'
import { mockUsers } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState('')

  function login(email, password) {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    )

    if (user) {
      setCurrentUser(user)
      setError('')
      return true
    }

    setError('Invalid email or password')
    return false
  }

  function logout() {
    setCurrentUser(null)
    setError('')
  }

  function hasPermission(allowedRoles) {
    if (!currentUser) return false
    return allowedRoles.includes(currentUser.role)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        user: currentUser,
        error,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}