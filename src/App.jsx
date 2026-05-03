import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout      from './components/Layout/Layout'
import LoginPage   from './pages/LoginPage'
import Unauthorized from './pages/Unauthorized'
import Dashboard   from './pages/Dashboard'
import Students    from './pages/Students'
import Teachers    from './pages/Teachers'
import Classes     from './pages/Classes'
import Attendance  from './pages/Attendance'

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login"        element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes — all wrapped in Layout */}
          <Route path="/" element={
            <ProtectedRoute allowedRoles={['owner','branch_admin','finance','teacher','student','parent']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />

            <Route path="students" element={
              <ProtectedRoute allowedRoles={['owner','branch_admin','finance','teacher']}>
                <Students />
              </ProtectedRoute>
            } />

            <Route path="teachers" element={
              <ProtectedRoute allowedRoles={['owner','branch_admin','finance']}>
                <Teachers />
              </ProtectedRoute>
            } />

            <Route path="classes" element={
              <ProtectedRoute allowedRoles={['owner','branch_admin','teacher']}>
                <Classes />
              </ProtectedRoute>
            } />

            <Route path="attendance" element={
              <ProtectedRoute allowedRoles={['owner','branch_admin','teacher']}>
                <Attendance />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </AuthProvider>
  )
}