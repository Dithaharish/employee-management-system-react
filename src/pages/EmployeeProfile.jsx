import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployees, saveEmployee } from '../utils/storage'
import { getCurrentEmployeeId } from '../utils/auth'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const emptyProfile = {
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
}

function EmployeeProfile() {
  const navigate = useNavigate()

  const [employee, setEmployee] = useState(null)
  const [profile, setProfile] = useState(emptyProfile)

  useEffect(() => {
    const currentEmployeeId = getCurrentEmployeeId()

    if (!currentEmployeeId) {
      navigate('/')
      return
    }

    const currentEmployee = getEmployees().find(
      (item) => item.employeeId === currentEmployeeId
    )

    if (!currentEmployee) {
      window.alert('Employee information could not be found.')
      navigate('/')
      return
    }

    setEmployee(currentEmployee)
    setProfile({
      firstName: currentEmployee.firstName || '',
      lastName: currentEmployee.lastName || '',
      dateOfBirth: currentEmployee.dateOfBirth || '',
      phone: currentEmployee.phone || '',
      bloodGroup: currentEmployee.bloodGroup || '',
      address: currentEmployee.address || '',
      city: currentEmployee.city || '',
      state: currentEmployee.state || '',
      postalCode: currentEmployee.postalCode || '',
      emergencyContactName: currentEmployee.emergencyContactName || '',
      emergencyContactNumber: currentEmployee.emergencyContactNumber || '',
      emergencyContactRelationship: currentEmployee.emergencyContactRelationship || '',
    })
  }, [navigate])

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!employee) {
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

  if (!employee) {
    return null
  }

  return (
    <>
      <h2>My Profile</h2>
      <p>View and update your personal information.</p>

      <form onSubmit={handleSubmit} className="employee-form">
        <h3 className="profile-form-heading">Personal Information</h3>

        <div className="form-group">
          <label htmlFor="employeeId">Employee ID</label>
          <input type="text" id="employeeId" value={employee.employeeId} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="email">Company Email</label>
          <input type="email" id="email" value={employee.email} readOnly />
        </div>

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
          />
        </div>

        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <select id="bloodGroup" name="bloodGroup" value={profile.bloodGroup} onChange={handleChange}>
            <option value="">Select Blood Group</option>
            {BLOOD_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <h3 className="profile-form-heading">Address Information</h3>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            rows="4"
            placeholder="Enter your address"
            value={profile.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={profile.city} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input type="text" id="state" name="state" value={profile.state} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={profile.postalCode}
            onChange={handleChange}
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="emergencyContactRelationship">Relationship</label>
          <input
            type="text"
            id="emergencyContactRelationship"
            name="emergencyContactRelationship"
            value={profile.emergencyContactRelationship}
            onChange={handleChange}
          />
        </div>

        <div className="form-buttons">
          <button type="submit">Save Changes</button>
          <a
            href="#"
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

export default EmployeeProfile
