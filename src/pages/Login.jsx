import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, setCurrentEmployeeId } from '../utils/auth'
import { getEmployees, getAdminPassword, getEmployeePassword } from '../utils/storage'

const ADMIN_EMAIL = 'admin@company.com'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('')

    const enteredEmail = email.trim()
    const enteredPassword = password

    // ---------- Validation ----------

    if (!enteredEmail) {
      setMessage('Enter a valid work email address.')
      return
    }

    if (!enteredPassword) {
      setMessage('Enter your password.')
      return
    }

    // ---------- Admin login ----------

    if (
      enteredEmail.toLowerCase() === ADMIN_EMAIL &&
      enteredPassword === getAdminPassword()
    ) {
      login('admin')
      navigate('/admin/dashboard')
      return
    }

    // ---------- Employee login ----------

    const employee = getEmployees().find(
      (item) =>
        item.email && item.email.toLowerCase() === enteredEmail.toLowerCase()
    )

    if (!employee) {
      setMessage('Invalid email or password.')
      return
    }

    const employeePassword =
      getEmployeePassword(employee.employeeId) ||
      employee.password ||
      'employee123'

    if (enteredPassword !== employeePassword) {
      setMessage('Invalid email or password.')
      return
    }

    setCurrentEmployeeId(employee.employeeId)
    login('employee')

    // First login employees complete their profile first
    if (employee.firstLogin === true) {
      navigate('/employee/profile')
    } else {
      navigate('/employee/dashboard')
    }
  }

  return (
    <div className="login-page">
      <main className="card">
        <section className="intro" aria-label="Employee portal">
          <div className="brand">
            <span className="logo" aria-hidden="true">
              &#10023;
            </span>
            PeopleDesk
          </div>

          <div className="intro-copy">
            <p className="kicker">Employee management</p>
            <h1>Connecting People and Work</h1>
            <p>Stay connected.</p>
          </div>

          <div className="tagline">A simpler way to work together.</div>
        </section>

        <section className="login" aria-labelledby="login-title">
          <div className="content">
            <h2 id="login-title">Welcome back</h2>
            <p className="sub">Enter your account details to sign in.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="email">Work email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  placeholder="name@peopledesk.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="password-wrap">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <button
                    className="show"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="options">
                <label className="remember">
                  <input type="checkbox" name="remember" />
                  Remember me
                </label>

                <a href="mailto:it-support@example.com?subject=Password%20reset">
                  Forgot password?
                </a>
              </div>

              <button className="submit" type="submit">
                Sign in
              </button>

              <p className="message">{message}</p>
            </form>

            <p className="help">Need help? Contact your company administrator.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Login
