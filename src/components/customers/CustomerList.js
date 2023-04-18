import { useEffect, useState } from "react";
import "./Customer.css"
import { Link } from "react-router-dom";


export const CustomerList = () => {

    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // code to execute on mount and when customers is updated
        fetch('http://localhost:8088/users?isStaff=false')
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                setCustomers(data)
            })
            .catch(error => {
                console.error(error)
                setLoading(false) // change to false to display the error message 
            })
    }, []);

    return (
        <article className="customers">
            {loading ? (
                <div>Loading...</div>
            ) : (
                customers.map(customer => {
                    return <section className="customer__list" key={`customer--${customer.id}`}>
                        <div>Name: <Link to={`/customers/${customer.id}`}>{customer.fullName}</Link></div>
                        <div>Email: {customer.email}</div>
                    </section>
                })
            )}
        </article>
    )
}
