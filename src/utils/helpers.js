export function fullName(person) {
  return `${person.firstName || ''} ${person.lastName || ''}`.trim()
}

export function displayName(person) {
  return fullName(person) || person.employeeId
}
