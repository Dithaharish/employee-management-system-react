import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEmployees, getDepartments } from '../utils/storage'
import { fullName } from '../utils/helpers'

function AdminDashboard() {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [search, setSearch] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  useEffect(() => {
    setEmployees(getEmployees())
    setDepartments(getDepartments())
  }, [])

  const searchTerm = search.trim().toLowerCase()

  const searchResults =
    searchTerm === ''
      ? []
      : employees.filter((employee) => {
          const name = fullName(employee).toLowerCase()
          return (
            (employee.employeeId || '').toLowerCase().includes(searchTerm) ||
            (employee.email || '').toLowerCase().includes(searchTerm) ||
            name.includes(searchTerm)
          )
        })

  const totalEmployees = employees.length
  const totalDepartments = departments.length
  const activeEmployees = employees.filter((employee) => employee.status === 'Active').length
  const inactiveEmployees = employees.filter((employee) => employee.status === 'Inactive').length

  return (
    <>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the Employee Management System.</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Employees</h3>
          <p>{totalEmployees}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Departments</h3>
          <p>{totalDepartments}</p>
        </div>

        <div className="dashboard-card">
          <h3>Active Employees</h3>
          <p>{activeEmployees}</p>
        </div>

        <div className="dashboard-card">
          <h3>Inactive Employees</h3>
          <p>{inactiveEmployees}</p>
        </div>
      </div>

      <div className="employee-management">
        <h2>Employee Management</h2>

        <div className="employee-buttons">
          <Link to="/admin/employees/add" className="add-employee">
            Add Employee
          </Link>

          <Link to="/admin/employees/edit" className="edit-employee">
            Edit Employee
          </Link>
        </div>

        <div className="search-container">
          <label htmlFor="searchEmployee">Search Employee:</label>
          <input
            type="text"
            id="searchEmployee"
            placeholder="Search by ID, email or name"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {searchTerm !== '' && (
          <div className="search-results">
            {searchResults.length === 0 && (
              <div className="search-result">No employees found.</div>
            )}

            {searchResults.map((employee) => (
              <div
                key={employee.employeeId}
                className="search-result"
                onClick={() => setSelectedEmployee(employee)}
              >
                <strong>{fullName(employee) || employee.employeeId}</strong>
                <span>{employee.employeeId}</span>
              </div>
            ))}
          </div>
        )}

        {selectedEmployee && (
          <div className="employee-details">
            <h2>{fullName(selectedEmployee) || selectedEmployee.employeeId}</h2>

            <p>
              <strong>Employee ID:</strong> {selectedEmployee.employeeId || '-'}
            </p>
            <p>
              <strong>Email:</strong> {selectedEmployee.email || '-'}
            </p>
            <p>
              <strong>Department:</strong> {selectedEmployee.department || '-'}
            </p>
            <p>
              <strong>Manager:</strong> {selectedEmployee.manager || '-'}
            </p>
            <p>
              <strong>Designation:</strong> {selectedEmployee.designation || '-'}
            </p>
            <p>
              <strong>Joining Date:</strong> {selectedEmployee.joiningDate || '-'}
            </p>
            <p>
              <strong>Status:</strong> {selectedEmployee.status || '-'}
            </p>
          </div>
        )}
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
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId || '-'}</td>
                <td>{employee.email || '-'}</td>
                <td>{employee.department || '-'}</td>
                <td>{employee.designation || '-'}</td>
                <td>{employee.joiningDate || '-'}</td>
                <td>{employee.status || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="department-management">
        <h2>Department Management</h2>

        <Link to="/admin/departments">View Departments</Link>
        <Link to="/admin/departments/add">Add Department</Link>
      </div>
    </>
  )
}

export default AdminDashboard
