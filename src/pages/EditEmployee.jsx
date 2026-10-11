import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getEmployees, getDepartments, saveEmployee } from '../utils/storage'

function EditEmployee() {
  const [searchParams] = useSearchParams()

  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [search, setSearch] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [form, setForm] = useState({
    department: '',
    manager: '',
    designation: '',
    joiningDate: '',
    status: 'Active',
  })

  const openEditForm = (employee) => {
    setSelectedEmployee(employee)
    setForm({
      department: employee.department || '',
      manager: employee.manager || '',
      designation: employee.designation || '',
      joiningDate: employee.joiningDate || '',
      status: employee.status || 'Active',
    })
  }

  const closeEditForm = () => {
    setSelectedEmployee(null)
  }

  useEffect(() => {
    const loadedEmployees = getEmployees()
    setEmployees(loadedEmployees)
    setDepartments(getDepartments())

    // Open the edit form directly when coming from the Employees page
    const employeeId = searchParams.get('id')

    if (employeeId) {
      const employee = loadedEmployees.find(
        (item) => item.employeeId.toLowerCase() === employeeId.toLowerCase()
      )

      if (employee) {
        openEditForm(employee)
      }
    }
  }, [searchParams])

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'department') {
      // Manager comes from the selected department
      const department = departments.find((item) => item.departmentName === value)

      setForm({
        ...form,
        department: value,
        manager: department ? department.manager : '',
      })

      return
    }

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!selectedEmployee) {
      window.alert('Please select an employee first.')
      return
    }

    // Personal information of the employee is kept unchanged
    const updatedEmployee = {
      ...selectedEmployee,
      department: form.department,
      manager: form.manager,
      designation: form.designation.trim(),
      joiningDate: form.joiningDate,
      status: form.status,
    }

    saveEmployee(updatedEmployee)

    setEmployees(
      employees.map((employee) =>
        employee.employeeId === updatedEmployee.employeeId ? updatedEmployee : employee
      )
    )

    window.alert('Employee updated successfully!')

    closeEditForm()
  }

  const searchTerm = search.toLowerCase().trim()

  const filteredEmployees = employees.filter((employee) => {
    const employeeId = (employee.employeeId || '').toLowerCase()
    const email = (employee.email || '').toLowerCase()

    return employeeId.includes(searchTerm) || email.includes(searchTerm)
  })

  return (
    <>
      <h2>Edit Employee</h2>
      <p>Search for an employee and select Edit to update their details.</p>

      <div className="edit-employee-search">
        <label htmlFor="employeeSearch">Search Employee:</label>
        <input
          type="text"
          id="employeeSearch"
          placeholder="Search by Employee ID or Email"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="employee-table-container">
        <h2>Employee List</h2>

        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Email</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Joining Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  No employees found.
                </td>
              </tr>
            )}

            {filteredEmployees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>{employee.email || '-'}</td>
                <td>{employee.department || '-'}</td>
                <td>{employee.designation || '-'}</td>
                <td>{employee.joiningDate || '-'}</td>
                <td>{employee.status || '-'}</td>
                <td>
                  <button className="edit-button" onClick={() => openEditForm(employee)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEmployee && (
        <div className="employee-edit-form show">
          <h2>Update Employee</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="employeeId">Employee ID</label>
              <input type="text" id="employeeId" value={selectedEmployee.employeeId} readOnly />
            </div>

            <div className="form-group">
              <label htmlFor="email">Company Email</label>
              <input type="email" id="email" value={selectedEmployee.email || ''} readOnly />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select id="department" name="department" value={form.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.departmentId} value={department.departmentName}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="manager">Manager</label>
              <select id="manager" name="manager" value={form.manager} onChange={handleChange} required>
                <option value="">Select Manager</option>
                {form.manager && <option value={form.manager}>{form.manager}</option>}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="designation">Designation</label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="joiningDate">Joining Date</label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                value={form.joiningDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Employment Status</label>
              <select id="status" name="status" value={form.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit">Update Employee</button>
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

export default EditEmployee
