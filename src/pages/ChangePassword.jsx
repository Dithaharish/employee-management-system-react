import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployeePassword, setEmployeePassword } from '../utils/storage'
import { getCurrentEmployeeId } from '../utils/auth'

function ChangePassword() {
  const navigate = useNavigate()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const employeeId = getCurrentEmployeeId()

    if (!employeeId) {
      navigate('/')
      return
    }

    const existingPassword = getEmployeePassword(employeeId) || 'employee123'

    if (currentPassword !== existingPassword) {
      window.alert('Current password is incorrect.')
      return
    }

    if (newPassword.length < 8) {
      window.alert('Password must contain at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      window.alert('New password and confirm password do not match.')
      return
    }

    if (newPassword === currentPassword) {
      window.alert('New password must be different from the current password.')
      return
    }

    setEmployeePassword(employeeId, newPassword)

    window.alert('Password changed successfully!')

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <>
      <h2>Change Password</h2>
      <p>Update your employee account password.</p>

      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            minLength="8"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            minLength="8"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit">Change Password</button>
          <a
            href="#"
            className="cancel-button"
            onClick={(event) => {
              event.preventDefault()
              navigate('/employee/dashboard')
            }}
          >
            Cancel
          </a>
        </div>
      </form>
    </>
  )
}

export default ChangePassword
