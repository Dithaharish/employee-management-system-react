import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Employees from './pages/Employees'
import AddEmployee from './pages/AddEmployee'
import EditEmployee from './pages/EditEmployee'
import Departments from './pages/Departments'
import AddDepartment from './pages/AddDepartment'
import AdminProfile from './pages/AdminProfile'
import AdminChangePassword from './pages/AdminChangePassword'
import EmployeeDashboard from './pages/EmployeeDashboard'
import EmployeeProfile from './pages/EmployeeProfile'
import CompleteProfile from './pages/CompleteProfile'
import ChangePassword from './pages/ChangePassword'

function AdminPage({ children }) {
  return (
    <ProtectedRoute role="admin">
      <Layout>{children}</Layout>
    </ProtectedRoute>
  )
}

function EmployeePage({ children }) {
  return (
    <ProtectedRoute role="employee">
      <Layout>{children}</Layout>
    </ProtectedRoute>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/admin/dashboard"
        element={
          <AdminPage>
            <AdminDashboard />
          </AdminPage>
        }
      />
      <Route
        path="/admin/employees"
        element={
          <AdminPage>
            <Employees />
          </AdminPage>
        }
      />
      <Route
        path="/admin/employees/add"
        element={
          <AdminPage>
            <AddEmployee />
          </AdminPage>
        }
      />
      <Route
        path="/admin/employees/edit"
        element={
          <AdminPage>
            <EditEmployee />
          </AdminPage>
        }
      />
      <Route
        path="/admin/departments"
        element={
          <AdminPage>
            <Departments />
          </AdminPage>
        }
      />
      <Route
        path="/admin/departments/add"
        element={
          <AdminPage>
            <AddDepartment />
          </AdminPage>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <AdminPage>
            <AdminProfile />
          </AdminPage>
        }
      />
      <Route
        path="/admin/change-password"
        element={
          <AdminPage>
            <AdminChangePassword />
          </AdminPage>
        }
      />

      <Route
        path="/employee/dashboard"
        element={
          <EmployeePage>
            <EmployeeDashboard />
          </EmployeePage>
        }
      />
      <Route
        path="/employee/profile"
        element={
          <EmployeePage>
            <EmployeeProfile />
          </EmployeePage>
        }
      />
      <Route
        path="/employee/complete-profile"
        element={
          <ProtectedRoute role="employee">
            <CompleteProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/change-password"
        element={
          <EmployeePage>
            <ChangePassword />
          </EmployeePage>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
