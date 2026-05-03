/* ============================================================
   PROTECTED ROUTE — src/components/auth/ProtectedRoute.jsx
   Wraps any page that requires login.
   If not logged in → redirect to /login
   If wrong role    → redirect to /unauthorized
   ============================================================ */
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useAuth()

  // Not logged in → go to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  // Wrong role → go to unauthorized page
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}