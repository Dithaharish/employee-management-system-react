import seedEmployees from '../data/employees.json'
import seedDepartments from '../data/departments.json'

const EMPLOYEES_KEY = 'employees'
const DEPARTMENTS_KEY = 'departments'
const ADMIN_PROFILE_KEY = 'adminProfile'
const ADMIN_PASSWORD_KEY = 'adminPassword'
const EMPLOYEE_PASSWORDS_KEY = 'employeePasswords'

// Merge the seed JSON records with records saved in localStorage
function mergeWithSeed(seed, saved, idKey) {
  const map = new Map()

  seed.forEach((item) => map.set(item[idKey], item))

  saved.forEach((item) => {
    map.set(item[idKey], { ...map.get(item[idKey]), ...item })
  })

  return Array.from(map.values())
}

// ---------- Employees ----------

export function getEmployees() {
  const saved = JSON.parse(localStorage.getItem(EMPLOYEES_KEY) || '[]')
  return mergeWithSeed(seedEmployees, saved, 'employeeId')
}

export function saveEmployee(employee) {
  const saved = JSON.parse(localStorage.getItem(EMPLOYEES_KEY) || '[]')

  const index = saved.findIndex(
    (item) => item.employeeId === employee.employeeId
  )

  if (index !== -1) {
    saved[index] = employee
  } else {
    saved.push(employee)
  }

  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(saved))
}

// ---------- Departments ----------

export function getDepartments() {
  const saved = JSON.parse(localStorage.getItem(DEPARTMENTS_KEY) || '[]')
  return mergeWithSeed(seedDepartments, saved, 'departmentId')
}

export function saveDepartment(department) {
  const saved = JSON.parse(localStorage.getItem(DEPARTMENTS_KEY) || '[]')

  const index = saved.findIndex(
    (item) => item.departmentId === department.departmentId
  )

  if (index !== -1) {
    saved[index] = department
  } else {
    saved.push(department)
  }

  localStorage.setItem(DEPARTMENTS_KEY, JSON.stringify(saved))
}

// ---------- Admin ----------

export const defaultAdminProfile = {
  employeeId: 'ADM001',
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@company.com',
  role: 'System Administrator',
  department: 'Administration',
  dateOfBirth: '1995-01-15',
  phone: '9876500000',
  bloodGroup: 'O+',
  address: 'UBS Office',
  city: 'Pune',
  state: 'Maharashtra',
  postalCode: '411014',
  emergencyContactName: 'Admin Emergency Contact',
  emergencyContactNumber: '9876500001',
  emergencyContactRelationship: 'Family',
  status: 'Active',
}

export function getAdminProfile() {
  const saved = JSON.parse(localStorage.getItem(ADMIN_PROFILE_KEY) || '{}')
  return { ...defaultAdminProfile, ...saved }
}

export function saveAdminProfile(profile) {
  localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(profile))
}

export function getAdminPassword() {
  const saved = localStorage.getItem(ADMIN_PASSWORD_KEY)
  return saved ? JSON.parse(saved) : 'admin123'
}

export function setAdminPassword(password) {
  localStorage.setItem(ADMIN_PASSWORD_KEY, JSON.stringify(password))
}

// ---------- Passwords ----------

export function getEmployeePasswords() {
  return JSON.parse(localStorage.getItem(EMPLOYEE_PASSWORDS_KEY) || '{}')
}

export function getEmployeePassword(employeeId) {
  const passwords = getEmployeePasswords()
  return passwords[employeeId] || null
}

export function setEmployeePassword(employeeId, password) {
  const passwords = getEmployeePasswords()
  passwords[employeeId] = password
  localStorage.setItem(EMPLOYEE_PASSWORDS_KEY, JSON.stringify(passwords))
}
