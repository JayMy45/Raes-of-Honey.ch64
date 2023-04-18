import { Link } from "react-router-dom";

export const Ticket = ({ ticketObject, isStaff }) => {


    return (
        <div className="ticket">
            <header >
                {
                    isStaff
                        ? `Ticket #${ticketObject.id}`
                        : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
                }
            </header>
            <section>{ticketObject.description}</section>
            <footer>Emergency: {ticketObject.emergency ? "🧨" : "No"}</footer>
        </div>
    );
}