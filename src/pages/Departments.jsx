import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDepartments, saveDepartment } from '../utils/storage'

function Departments() {
  const [departments, setDepartments] = useState([])
  const [search, setSearch] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [form, setForm] = useState({ manager: '', status: 'Active' })

  const openDepartmentEdit = (department) => {
    setSelectedDepartment(department)
    setForm({
      manager: department.manager || '',
      status: department.status || 'Active',
    })
  }

  const closeEditForm = () => {
    setSelectedDepartment(null)
  }

  useEffect(() => {
    setDepartments(getDepartments())
  }, [])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!selectedDepartment) {
      window.alert('Please select a department first.')
      return
    }

    const updatedDepartment = {
      ...selectedDepartment,
      manager: form.manager.trim(),
      status: form.status,
    }

    saveDepartment(updatedDepartment)

    setDepartments(
      departments.map((department) =>
        department.departmentId === updatedDepartment.departmentId
          ? updatedDepartment
          : department
      )
    )

    window.alert('Department updated successfully!')

    closeEditForm()
  }

  const searchTerm = search.toLowerCase().trim()

  const filteredDepartments = departments.filter((department) =>
    (department.departmentName || '').toLowerCase().includes(searchTerm)
  )

  return (
    <>
      <h2>Department Management</h2>
      <p>View, search and manage company departments.</p>

      <div className="department-actions">
        <Link to="/admin/departments/add" className="add-department">
          Add Department
        </Link>
      </div>

      <div className="department-search">
        <label htmlFor="searchDepartment">Search Department:</label>
        <input
          type="text"
          id="searchDepartment"
          placeholder="Search by department name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="department-table-container">
        <table>
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Department Name</th>
              <th>Manager</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredDepartments.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  No departments found.
                </td>
              </tr>
            )}

            {filteredDepartments.map((department) => (
              <tr key={department.departmentId}>
                <td>{department.departmentId}</td>
                <td>{department.departmentName}</td>
                <td>{department.manager}</td>
                <td>{department.status}</td>
                <td>
                  <button className="edit-button" onClick={() => openDepartmentEdit(department)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDepartment && (
        <div className="department-edit-form show">
          <h2>Update Department</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="departmentId">Department ID</label>
              <input type="text" id="departmentId" value={selectedDepartment.departmentId} readOnly />
            </div>

            <div className="form-group">
              <label htmlFor="departmentName">Department Name</label>
              <input type="text" id="departmentName" value={selectedDepartment.departmentName} readOnly />
            </div>

            <div className="form-group">
              <label htmlFor="manager">Department Manager</label>
              <input
                type="text"
                id="manager"
                name="manager"
                value={form.manager}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={form.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit">Update Department</button>
              <button type="button" className="cancel-button" onClick={closeEditForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Departments
