import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/Layout/Layout'
import LoginPage from './pages/LoginPage'
import Unauthorized from './pages/Unauthorized'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import Classes from './pages/Classes'
import Attendance from './pages/Attendance'
import OwnerDashboard from './pages/OwnerDashboard'
import Branches from './pages/Branches'
import Finance from './pages/Finance'
import BranchDetail from './pages/BranchDetail'

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected — all share Layout */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Smart redirect based on role is handled in LoginPage */}
            <Route index element={<Navigate to="/dashboard" replace />} />

            {/* Owner routes */}
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/branches/:id" element={<BranchDetail />} />
            <Route path="/finance" element={<Finance />} />

            {/* Shared routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/attendance" element={<Attendance />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppProvider>
    </AuthProvider>
  )
}