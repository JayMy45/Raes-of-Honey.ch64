import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Tickets.css"
import { Ticket } from "./Ticket"


export const TicketList = ({ searchTermState }) => {

    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, setOpen] = useState(false)
    const nav = useNavigate()

    const localHoneyUser = localStorage.getItem('honey_user')
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(() => {
        const searchedTickets = tickets.filter(ticket => ticket.description?.toLowerCase().startsWith(searchTermState?.toLowerCase()));
        setFiltered(searchedTickets)
    },
        [searchTermState, tickets]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
                .then(res => res.json())
                .then((data) => setTickets(data))
            fetch(`http://localhost:8088/employees?_expand=user`)
                .then(res => res.json())
                .then((data) => setEmployees(data))

        },
        [] // When this array is empty, you are observing initial component state
    )

    /*

        Initial Condition to set filtered state employee/customer

            useEffect(() => {
                if (honeyUserObject.staff) {
                    setFiltered(tickets)
                } else {
                    const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                    setFiltered(myTickets);
                }
            }, [tickets, honeyUserObject.id, honeyUserObject.staff]);
    
        Conditional to distinguish between emergency tickets

            useEffect(() => {
                if (emergency && honeyUserObject.staff) {
                    const emergencyOnly = tickets.filter(ticket => ticket.emergency === true)
                    setFiltered(emergencyOnly)
                } else { setFiltered(tickets) }
            },
                [emergency, honeyUserObject.staff]
            )
    */

    //* combined the two useEffects from above
    useEffect(() => {
        if (emergency && honeyUserObject.staff) {
            const emergencyOnly = tickets.filter(ticket => ticket.emergency === true)
            setFiltered(emergencyOnly)
        } else if (!honeyUserObject.staff) {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
        } else {
            setFiltered(tickets)
        }
    }, [emergency, honeyUserObject.id, honeyUserObject.staff, tickets])

    // need a use effect to filter open tickets
    useEffect(
        () => {
            if (openOnly) {
                // how to tell if tickets are open/closed
                const completedArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted !== ""
                })
                setFiltered(completedArray)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )

    const emergencyPick = () => {
        emergency
            ? setEmergency(false)
            : setEmergency(true)
    }

    const openTickets = () => {
        openOnly
            ? setOpen(false)
            : setOpen(true)
    }

    return <>
        {
            honeyUserObject.staff &&
            <button
                className={"button " + (emergency ? "button__show-all" : "button__emergency")}
                onClick={emergencyPick}
            >
                {emergency ? "Show All" : "Emergency Only"}
            </button>
        }

        {
            !honeyUserObject.staff &&
            <>  <button className="button button__create" onClick={() => { nav("/ticket/create") }}>Create Ticket</button>
                <button
                    className={"button " + (openOnly ? "button__open" : "button__close")}
                    onClick={openTickets}
                >
                    {openOnly ? "All Tickets" : "Open Tickets"}

                </button>
            </>
        }
        <h2>List of Tickets</h2>
        <article className="tickets">
            {
                filteredTickets.map((ticket) => <Ticket
                    ticketObject={ticket}
                    key={`ticket--${ticket.id}`}
                    isStaff={honeyUserObject.staff}
                    employees={employees}
                />)
            }

        </article>
    </>
}