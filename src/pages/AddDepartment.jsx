import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveDepartment } from '../utils/storage'

function AddDepartment() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    departmentId: '',
    departmentName: '',
    manager: '',
    status: 'Active',
  })

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const departmentId = form.departmentId.trim()
    const departmentName = form.departmentName.trim()
    const manager = form.manager.trim()

    if (departmentId === '' || departmentName === '' || manager === '') {
      window.alert('Please fill in all the required fields.')
      return
    }

    const newDepartment = {
      departmentId,
      departmentName,
      manager,
      status: form.status,
    }

    saveDepartment(newDepartment)

    window.alert('Department added successfully!')

    navigate('/admin/departments')
  }

  return (
    <>
      <h2>Add Department</h2>
      <p>Enter the department details below.</p>

      <div className="department-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="departmentId">Department ID</label>
            <input
              type="text"
              id="departmentId"
              name="departmentId"
              placeholder="Example: D005"
              value={form.departmentId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="departmentName">Department Name</label>
            <input
              type="text"
              id="departmentName"
              name="departmentName"
              placeholder="Example: Research & Development"
              value={form.departmentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="manager">Department Manager</label>
            <input
              type="text"
              id="manager"
              name="manager"
              placeholder="Enter manager name"
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
            <button type="submit">Add Department</button>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                navigate('/admin/departments')
              }}
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddDepartment
