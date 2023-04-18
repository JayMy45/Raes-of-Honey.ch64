import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Employee.css"


export const EmployeeList = () => {

     const [employees, setEmployees] = useState([])
     const [loading, setLoading] = useState(true)

     useEffect(() => {
          // code to execute on mount and when employees is updated
          fetch('http://localhost:8088/users?isStaff=true')
               .then(response => response.json())
               .then(data => {
                    setLoading(false)
                    setEmployees(data)
               })
               .catch(error => {
                    console.error(error)
                    setLoading(false) // change to false to display the error message 
               })
     }, []);

     return (
          <article className="employees">
               {loading ? (
                    <div>Loading...</div>
               ) : (
                    employees.map(emp => {
                         return <section className="employee__list" key={`employee--${emp.id}`}>
                              <div>Name: <Link to={`/employees/${emp.id}`}>{emp.fullName}</Link></div>
                              <div>Email: {emp.email}</div>
                         </section>
                    })
               )}
          </article>
     )
}
