import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getEmployees } from '../utils/storage'
import { fullName } from '../utils/helpers'

function Employees() {
  const navigate = useNavigate()

  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setEmployees(getEmployees())
  }, [])

  const searchTerm = search.toLowerCase()

  const filteredEmployees = employees.filter((employee) => {
    const employeeId = (employee.employeeId || '').toLowerCase()
    const email = (employee.email || '').toLowerCase()
    const name = fullName(employee).toLowerCase()

    return (
      employeeId.includes(searchTerm) ||
      email.includes(searchTerm) ||
      name.includes(searchTerm)
    )
  })

  return (
    <>
      <h2>Employee Management</h2>
      <p>Manage all employees in the organization.</p>

      <div className="employee-page-actions">
        <Link to="/admin/employees/add" className="add-employee">
          Add Employee
        </Link>

        <Link to="/admin/employees/edit" className="edit-employee">
          Edit Employee
        </Link>
      </div>

      <div className="employee-page-search">
        <label htmlFor="employeeSearch">Search Employee</label>
        <input
          type="search"
          id="employeeSearch"
          placeholder="Search by name or employee ID"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="employee-table-container">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
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
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  No employees found.
                </td>
              </tr>
            )}

            {filteredEmployees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>{fullName(employee) || '-'}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.designation || '-'}</td>
                <td>{employee.joiningDate}</td>
                <td>{employee.status}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() =>
                      navigate(`/admin/employees/edit?id=${employee.employeeId}`)
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Employees
