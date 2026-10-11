import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployees, getDepartments, saveEmployee, setEmployeePassword } from '../utils/storage'
import { fullName } from '../utils/helpers'

function AddEmployee() {
  const navigate = useNavigate()

  const [departments, setDepartments] = useState([])
  const [managers, setManagers] = useState([])

  const [form, setForm] = useState({
    employeeId: '',
    email: '',
    department: '',
    manager: '',
    designation: '',
    joiningDate: '',
    status: 'Active',
  })

  useEffect(() => {
    setDepartments(getDepartments())

    // Managers are existing employees
    setManagers(
      getEmployees()
        .map((employee) => fullName(employee))
        .filter((name) => name !== '')
    )
  }, [])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const employeeId = form.employeeId.trim()
    const email = form.email.trim()

    // ---------- Validation ----------

    if (
      employeeId === '' ||
      email === '' ||
      form.department === '' ||
      form.manager === '' ||
      form.designation.trim() === '' ||
      form.joiningDate === ''
    ) {
      window.alert('Please fill in all the required fields.')
      return
    }

    const employees = getEmployees()

    const employeeIdExists = employees.some(
      (employee) =>
        employee.employeeId &&
        employee.employeeId.toLowerCase() === employeeId.toLowerCase()
    )

    if (employeeIdExists) {
      window.alert('This Employee ID already exists.')
      return
    }

    const emailExists = employees.some(
      (employee) =>
        employee.email && employee.email.toLowerCase() === email.toLowerCase()
    )

    if (emailExists) {
      window.alert('This email address is already registered.')
      return
    }

    // ---------- Create employee ----------

    const newEmployee = {
      employeeId,
      email,
      department: form.department,
      manager: form.manager,
      designation: form.designation.trim(),
      joiningDate: form.joiningDate,
      status: form.status,
      role: 'Employee',
      firstLogin: true,
    }

    saveEmployee(newEmployee)

    // Default password for the new employee
    setEmployeePassword(employeeId, 'employee123')

    window.alert('Employee added successfully!\n\nDefault password: employee123')

    navigate('/admin/employees')
  }

  return (
    <>
      <h2>Add Employee</h2>
      <p>Add a new employee to the Employee Management System.</p>

      <div className="employee-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="employeeId">Employee ID</label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              placeholder="Enter Employee ID"
              value={form.employeeId}
              onChange={handleChange}
              required
            />
            <small>Employee ID is allocated by the administrator.</small>
          </div>

          <div className="form-group">
            <label htmlFor="email">Company Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="employee@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
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
            <select
              id="manager"
              name="manager"
              value={form.manager}
              onChange={handleChange}
              required
            >
              <option value="">Select Manager</option>
              {managers.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              id="designation"
              name="designation"
              placeholder="Enter designation"
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
            <button type="submit">Add Employee</button>
            <a href="#" onClick={(event) => { event.preventDefault(); navigate('/admin/employees') }}>
              Cancel
            </a>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddEmployee
