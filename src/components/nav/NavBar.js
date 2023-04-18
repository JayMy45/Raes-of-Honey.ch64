import "./NavBar.css"
import { EmployeeNav } from "./EmployeeNavbar"
import { CustomerNav } from "./CustomerNavbar"

export const NavBar = () => {

    const localHoneyUser = localStorage.getItem('honey_user')
    const honeyUserObject = JSON.parse(localHoneyUser)

    return honeyUserObject.staff
        ? <EmployeeNav />
        : <CustomerNav />
}

