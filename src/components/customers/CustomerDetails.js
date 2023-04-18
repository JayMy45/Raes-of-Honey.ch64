import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Customer.css"

export const CustomerDetails = () => {

    const { customerId } = useParams()
    const [customer, setCustomers] = useState([])

    useEffect(() => {
        // code to execute on mount and when customers is updated
        fetch(`http://localhost:8088/customers?_expand=user&_embed=employeeTickets&userId=${customerId}`)
            .then(response => response.json())
            .then(data => {
                const singleCustomer = data[0]
                setCustomers(singleCustomer)
            })

    }, [customerId]);


    return <>
        <h2>Customer Details</h2>
        <section className="customer__details">
            <header className="customer__header">{customer?.user?.fullName}</header>
            <div>Email: {customer?.user?.email}</div>
            <div>Phone: {customer.phoneNumber}</div>

            <footer className="customer__footer">Address: {customer.address}</footer>

        </section>
    </>
}
