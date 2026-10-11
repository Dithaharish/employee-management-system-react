import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployees, saveEmployee } from '../utils/storage'
import { getCurrentEmployeeId } from '../utils/auth'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

function CompleteProfile() {
  const navigate = useNavigate()

  const [employeeId, setEmployeeId] = useState(null)
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    bloodGroup: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    emergencyContactRelationship: '',
  })

  useEffect(() => {
    const currentEmployeeId = getCurrentEmployeeId()

    if (!currentEmployeeId) {
      navigate('/')
      return
    }

    const employee = getEmployees().find(
      (item) => item.employeeId === currentEmployeeId
    )

    if (!employee) {
      window.alert('Employee account not found.')
      navigate('/')
      return
    }

    setEmployeeId(currentEmployeeId)

    // Pre-fill existing information
    setProfile({
      firstName: employee.firstName || '',
      lastName: employee.lastName || '',
      dateOfBirth: employee.dateOfBirth || '',
      phone: employee.phone || '',
      bloodGroup: employee.bloodGroup || '',
      address: employee.address || '',
      city: employee.city || '',
      state: employee.state || '',
      postalCode: employee.postalCode || '',
      emergencyContactName: employee.emergencyContactName || '',
      emergencyContactNumber: employee.emergencyContactNumber || '',
      emergencyContactRelationship: employee.emergencyContactRelationship || '',
    })
  }, [navigate])

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!employeeId) {
      window.alert('Employee account could not be found.')
      return
    }

    const employee = getEmployees().find(
      (item) => item.employeeId === employeeId
    )

    if (!employee) {
      window.alert('Employee account could not be found.')
      return
    }

    const updatedEmployee = {
      ...employee,
      ...profile,
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      phone: profile.phone.trim(),
      address: profile.address.trim(),
      city: profile.city.trim(),
      state: profile.state.trim(),
      postalCode: profile.postalCode.trim(),
      emergencyContactName: profile.emergencyContactName.trim(),
      emergencyContactNumber: profile.emergencyContactNumber.trim(),
      emergencyContactRelationship: profile.emergencyContactRelationship.trim(),
      firstLogin: false,
    }

    saveEmployee(updatedEmployee)

    window.alert('Profile completed successfully!')

    navigate('/employee/dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('currentEmployeeId')
    navigate('/')
  }

  return (
    <>
      <header>
        <h1>Employee Management System</h1>

        <div>
          <span>New Employee</span>
          <a href="#" onClick={(event) => { event.preventDefault(); handleLogout() }}>
            Logout
          </a>
        </div>
      </header>

      <main>
        <section>
          <h2>Complete Your Profile</h2>
          <p>Please provide your personal information before accessing your dashboard.</p>

          <div className="employee-form">
            <form onSubmit={handleSubmit}>
              <h3 className="profile-form-heading">Personal Information</h3>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Mobile Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter mobile number"
                  value={profile.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bloodGroup">Blood Group</label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={profile.bloodGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Blood Group</option>
                  {BLOOD_GROUPS.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <h3 className="profile-form-heading">Address</h3>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={profile.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={profile.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <h3 className="profile-form-heading">Emergency Contact</h3>

              <div className="form-group">
                <label htmlFor="emergencyContactName">Emergency Contact Name</label>
                <input
                  type="text"
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={profile.emergencyContactName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContactNumber">Emergency Contact Number</label>
                <input
                  type="tel"
                  id="emergencyContactNumber"
                  name="emergencyContactNumber"
                  value={profile.emergencyContactNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContactRelationship">Relationship</label>
                <input
                  type="text"
                  id="emergencyContactRelationship"
                  name="emergencyContactRelationship"
                  placeholder="Example: Father"
                  value={profile.emergencyContactRelationship}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-buttons">
                <button type="submit">Save Profile</button>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    navigate('/')
                  }}
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer>Employee Management System</footer>
    </>
  )
}

export default CompleteProfile
