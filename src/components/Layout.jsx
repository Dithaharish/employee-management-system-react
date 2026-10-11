import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getRole, logout } from '../utils/auth'
import { getAdminProfile, getEmployees } from '../utils/storage'
import { displayName } from '../utils/helpers'

function Layout({ children }) {
  const navigate = useNavigate()
  const role = getRole()

  const [name, setName] = useState(role === 'admin' ? 'Admin' : 'Employee')

  useEffect(() => {
    if (role === 'admin') {
      const admin = getAdminProfile()
      setName(`${admin.firstName} ${admin.lastName}`.trim() || 'Admin')
    } else {
      const employeeId = localStorage.getItem('currentEmployeeId')
      const employee = getEmployees().find((item) => item.employeeId === employeeId)
      setName(employee ? displayName(employee) : 'Employee')
    }
  }, [role])

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/')
    }
  }

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/employees', label: 'Employees' },
    { to: '/admin/departments', label: 'Departments' },
    { to: '/admin/profile', label: 'My Profile' },
    { to: '/admin/change-password', label: 'Change Password' },
  ]

  const employeeLinks = [
    { to: '/employee/dashboard', label: 'Dashboard' },
    { to: '/employee/profile', label: 'My Profile' },
    { to: '/employee/change-password', label: 'Change Password' },
  ]

  const links = role === 'admin' ? adminLinks : employeeLinks

  return (
    <>
      <header>
        <h1>Employee Management System</h1>

        <div>
          <span>{name}</span>

          {role === 'admin' ? (
            <>
              <Link to="/admin/profile">Profile</Link>
              <Link to="/admin/change-password">Change Password</Link>
            </>
          ) : (
            <Link to="/employee/profile">Profile</Link>
          )}

          <a
            href="#"
            onClick={(event) => {
              event.preventDefault()
              handleLogout()
            }}
          >
            Logout
          </a>
        </div>
      </header>

      <main>
        <aside>
          <nav>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section>{children}</section>
      </main>

      <footer>Employee Management System</footer>
    </>
  )
}

export default Layout
