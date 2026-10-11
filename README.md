# Employee Management System (React)

React version of the Employee Management System that was built with Bootstrap.

## How to run

1. Open a terminal in this folder.
2. Install the dependencies (only needed the first time):

```
npm install
```

3. Start the development server:

```
npm run dev
```

4. Open the link shown in the terminal (usually http://localhost:5173).

## Login details

- Admin: admin@company.com / admin123
- Employee: rahul.sharma@company.com / employee123

(All employees from data use the default password `employee123`.)

## Project structure

```
src/
  main.jsx                  App entry, router and styles
  App.jsx                   All routes of the app
  style.css                 Styles for the app pages
  login.css                 Styles for the login page
  data/
    employees.json          Seed employee data
    departments.json        Seed department data
  utils/
    storage.js              localStorage data (employees, departments, passwords)
    auth.js                 Login / logout helpers
    helpers.js              Small helper functions
  components/
    Layout.jsx              Header, sidebar and footer
    ProtectedRoute.jsx      Blocks pages when the user is not logged in
  pages/
    Login.jsx               PeopleDesk login page
    AdminDashboard.jsx      Dashboard with counts, search and employee list
    Employees.jsx           Employee list with search
    AddEmployee.jsx         Add employee form
    EditEmployee.jsx        Edit employee form
    Departments.jsx         Department list with search and edit
    AddDepartment.jsx       Add department form
    AdminProfile.jsx        Admin profile form
    AdminChangePassword.jsx Change admin password
    EmployeeDashboard.jsx   Employee dashboard
    EmployeeProfile.jsx     Employee profile form
    CompleteProfile.jsx     First login profile completion
    ChangePassword.jsx      Change employee password
```

## Pages and URLs

| Page                | URL                          |
| ------------------- | ---------------------------- |
| Login               | /                            |
| Admin Dashboard     | /admin/dashboard             |
| Employees           | /admin/employees             |
| Add Employee        | /admin/employees/add         |
| Edit Employee       | /admin/employees/edit        |
| Departments         | /admin/departments           |
| Add Department      | /admin/departments/add       |
| Admin Profile       | /admin/profile               |
| Admin Password      | /admin/change-password       |
| Employee Dashboard  | /employee/dashboard          |
| Employee Profile    | /employee/profile            |
| Complete Profile    | /employee/complete-profile   |
| Employee Password   | /employee/change-password    |

## Other commands

```
npm run build     Create a production build in the dist folder
npm run preview   Preview the production build
```
