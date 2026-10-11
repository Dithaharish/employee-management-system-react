import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAdminProfile, saveAdminProfile } from '../utils/storage'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

function AdminProfile() {
  const navigate = useNavigate()

  const [admin, setAdmin] = useState(getAdminProfile())

  const handleChange = (event) => {
    setAdmin({ ...admin, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const updatedAdmin = {
      ...admin,
      firstName: admin.firstName.trim(),
      lastName: admin.lastName.trim(),
      phone: admin.phone.trim(),
      address: admin.address.trim(),
      city: admin.city.trim(),
      state: admin.state.trim(),
      postalCode: admin.postalCode.trim(),
      emergencyContactName: admin.emergencyContactName.trim(),
      emergencyContactNumber: admin.emergencyContactNumber.trim(),
      emergencyContactRelationship: admin.emergencyContactRelationship.trim(),
    }

    setAdmin(updatedAdmin)
    saveAdminProfile(updatedAdmin)

    window.alert('Profile updated successfully!')
  }

  return (
    <>
      <h2>My Profile</h2>
      <p>View and update your administrator profile.</p>

      <form onSubmit={handleSubmit} className="employee-form">
        <h3 className="profile-form-heading">Account Information</h3>

        <div className="form-group">
          <label htmlFor="employeeId">Employee ID</label>
          <input type="text" id="employeeId" value={admin.employeeId} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="email">Company Email</label>
          <input type="email" id="email" value={admin.email} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input type="text" id="role" value={admin.role} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input type="text" id="department" value={admin.department} readOnly />
        </div>

        <h3 className="profile-form-heading">Personal Information</h3>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={admin.firstName}
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
            value={admin.lastName}
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
            value={admin.dateOfBirth}
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
            value={admin.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <select id="bloodGroup" name="bloodGroup" value={admin.bloodGroup} onChange={handleChange}>
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
            value={admin.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={admin.city} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input type="text" id="state" name="state" value={admin.state} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={admin.postalCode}
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
            value={admin.emergencyContactName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="emergencyContactNumber">Emergency Contact Number</label>
          <input
            type="tel"
            id="emergencyContactNumber"
            name="emergencyContactNumber"
            value={admin.emergencyContactNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="emergencyContactRelationship">Relationship</label>
          <input
            type="text"
            id="emergencyContactRelationship"
            name="emergencyContactRelationship"
            value={admin.emergencyContactRelationship}
            onChange={handleChange}
          />
        </div>

        <div className="form-buttons">
          <button type="submit">Save Changes</button>
          <a
            href="#"
            className="cancel-button"
            onClick={(event) => {
              event.preventDefault()
              navigate('/admin/dashboard')
            }}
          >
            Cancel
          </a>
        </div>
      </form>
    </>
  )
}

export default AdminProfile
