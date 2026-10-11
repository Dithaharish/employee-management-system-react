export function getRole() {
  return localStorage.getItem('loggedInRole')
}

export function login(role) {
  localStorage.setItem('loggedInRole', role)
}

export function logout() {
  localStorage.removeItem('loggedInRole')
  localStorage.removeItem('currentEmployeeId')
}

export function getCurrentEmployeeId() {
  return localStorage.getItem('currentEmployeeId')
}

export function setCurrentEmployeeId(employeeId) {
  localStorage.setItem('currentEmployeeId', employeeId)
}
