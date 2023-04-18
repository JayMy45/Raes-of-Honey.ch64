import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Employee.css"


export const EmployeeDetails = () => {

    const { employeeId } = useParams()
    const [employee, setEmployees] = useState([])

    useEffect(() => {
        // code to execute on mount and when employees is updated
        fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
            .then(response => response.json())
            .then(data => {
                const singleEmployee = data[0]
                setEmployees(singleEmployee)
            })

    }, [employeeId]);


    return <>
        <h2>Employee Details</h2>
        <section className="employee__details">
            <header className="employee__header">{employee?.user?.fullName}</header>
            <div>Email: {employee?.user?.email}</div>
            <div>Specialty: {employee.specialty}</div>
            <div>Rate: {employee.rate}</div>

            <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} ticket(s)</footer>

        </section>
    </>
}