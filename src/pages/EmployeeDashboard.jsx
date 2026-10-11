import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployees, getDepartments } from '../utils/storage'
import { getCurrentEmployeeId } from '../utils/auth'
import { fullName } from '../utils/helpers'

function EmployeeDashboard() {
  const navigate = useNavigate()

  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])

  const [employeeSearch, setEmployeeSearch] = useState('')
  const [departmentSearch, setDepartmentSearch] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  useEffect(() => {
    const loadedEmployees = getEmployees()

    const employee = loadedEmployees.find(
      (item) => item.employeeId === getCurrentEmployeeId()
    )

    if (!employee) {
      window.alert('Employee information could not be found.')
      navigate('/')
      return
    }

    setCurrentEmployee(employee)
    setEmployees(loadedEmployees)
    setDepartments(getDepartments())
  }, [navigate])

  if (!currentEmployee) {
    return null
  }

  const employeeSearchTerm = employeeSearch.toLowerCase().trim()

  const employeeResults =
    employeeSearchTerm === ''
      ? []
      : employees.filter((employee) => {
          const employeeId = (employee.employeeId || '').toLowerCase()
          const email = (employee.email || '').toLowerCase()
          const name = fullName(employee).toLowerCase()

          return (
            employeeId.includes(employeeSearchTerm) ||
            email.includes(employeeSearchTerm) ||
            name.includes(employeeSearchTerm)
          )
        })

  const departmentSearchTerm = departmentSearch.toLowerCase().trim()

  const departmentResults =
    departmentSearchTerm === ''
      ? []
      : departments.filter((department) =>
          (department.departmentName || '').toLowerCase().includes(departmentSearchTerm)
        )

  const welcomeName = fullName(currentEmployee) || currentEmployee.employeeId

  return (
    <>
      <h2>Welcome, {welcomeName}</h2>
      <p>Welcome to your employee dashboard.</p>

      <div className="employee-dashboard-card">
        <h2>My Employment Information</h2>

        <div className="employee-info-grid">
          <div className="employee-info-item">
            <span>Employee ID</span>
            <strong>{currentEmployee.employeeId}</strong>
          </div>

          <div className="employee-info-item">
            <span>Company Email</span>
            <strong>{currentEmployee.email || '-'}</strong>
          </div>

          <div className="employee-info-item">
            <span>Department</span>
            <strong>{currentEmployee.department || '-'}</strong>
          </div>

          <div className="employee-info-item">
            <span>Manager</span>
            <strong>{currentEmployee.manager || '-'}</strong>
          </div>

          <div className="employee-info-item">
            <span>Designation</span>
            <strong>{currentEmployee.designation || '-'}</strong>
          </div>

          <div className="employee-info-item">
            <span>Joining Date</span>
            <strong>{currentEmployee.joiningDate || '-'}</strong>
          </div>

          <div className="employee-info-item">
            <span>Status</span>
            <strong>{currentEmployee.status || '-'}</strong>
          </div>
        </div>
      </div>

      <div className="employee-dashboard-card" id="employeeSearchSection">
        <h2>Search Employees</h2>
        <p>Search for an employee to view their basic information.</p>

        <div className="employee-dashboard-search">
          <input
            type="text"
            placeholder="Search by name, Employee ID or email"
            value={employeeSearch}
            onChange={(event) => {
              setEmployeeSearch(event.target.value)
              setSelectedEmployee(null)
            }}
          />
        </div>

        {employeeSearchTerm !== '' && (
          <div>
            {employeeResults.length === 0 && (
              <div className="employee-search-result">No employee found.</div>
            )}

            {employeeResults.map((employee) => (
              <div
                key={employee.employeeId}
                className="employee-search-result"
                onClick={() => setSelectedEmployee(employee)}
              >
                <strong>{fullName(employee) || employee.employeeId}</strong>
                <span>{employee.employeeId}</span>
              </div>
            ))}
          </div>
        )}

        {selectedEmployee && (
          <div className="selected-employee">
            <h3>{fullName(selectedEmployee) || selectedEmployee.employeeId}</h3>
            <p>
              <strong>Department:</strong> {selectedEmployee.department || '-'}
            </p>
            <p>
              <strong>Manager:</strong> {selectedEmployee.manager || '-'}
            </p>
            <p>
              <strong>Designation:</strong> {selectedEmployee.designation || '-'}
            </p>
          </div>
        )}
      </div>

      <div className="employee-dashboard-card" id="departmentSearchSection">
        <h2>Search Departments</h2>
        <p>Search for a department to view its basic information.</p>

        <div className="employee-dashboard-search">
          <input
            type="text"
            placeholder="Search department"
            value={departmentSearch}
            onChange={(event) => setDepartmentSearch(event.target.value)}
          />
        </div>

        {departmentSearchTerm !== '' && (
          <div>
            {departmentResults.length === 0 && (
              <div className="department-search-result">No department found.</div>
            )}

            {departmentResults.map((department) => (
              <div key={department.departmentId} className="department-search-result">
                <strong>{department.departmentName}</strong>
                <span>Manager: {department.manager}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default EmployeeDashboard
