import { Navigate } from 'react-router-dom'
import { getRole } from '../utils/auth'

function ProtectedRoute({ role, children }) {
  if (getRole() !== role) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
