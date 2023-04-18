import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContianer"
import { EmployeeList } from "../employees/EmployeeList"
import { CustomerList } from "../customers/CustomerList"
import { CustomerDetails } from "../customers/CustomerDetails"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { Profile } from "../profile/Profile"

export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="title--main">Honey Rae Repairs</h1>
                    <div>Your one-stop shop for repairing your tech</div>
                    <Outlet />
                </>
            }>
                <Route path="tickets" element={<TicketContainer />} />
                <Route path="profile" element={<Profile />} />
                <Route path="employees" element={<EmployeeList />} />
                <Route path="employees/:employeeId" element={<EmployeeDetails />} />
                <Route path="customers" element={<CustomerList />} />
                <Route path="customers/:customerId" element={<CustomerDetails />} />

            </Route>
        </Routes>
    )
}

