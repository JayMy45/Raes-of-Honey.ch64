import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
  /*
      TODO: Add the correct default properties to the
      initial state object
  */
  const nav = useNavigate()
  const [ticket, update] = useState({
    description: "",
    emergency: false
  })
  /*
      TODO: Use the useNavigation() hook so you can redirect
      the user to the ticket list
  */

  const localHoneyUser = localStorage.getItem("honey_user")
  const honeyUserObject = JSON.parse(localHoneyUser)

  const handleSaveButtonClick = (event) => {
    event.preventDefault()
    // TODO: Create the object to be saved to the API
    /*
      Object to Be made
      {
        "userId": 1,
        "description": "",
        "emergency": true,
        "dateCompleted": "Fri Apr 29 2022 21:24:29 GMT-0500 (Central Daylight Time)"
      }
    */
    const ticketToSendToAPI = {
      userId: honeyUserObject.id,
      description: ticket.description,
      emergency: ticket.emergency,
      dateCompeted: ""
    }
    // TODO: Perform the fetch() to POST the object to the API
    return fetch(`http://localhost:8088/serviceTickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ticketToSendToAPI)
    })
      .then(res => res.json())
      .then(() => nav("/tickets"))
  }

  return (
    <form className="ticketForm">
      <h2 className="ticketForm__title">New Service Ticket</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            required autoFocus
            type="text"
            className="form-control"
            placeholder="Brief description of problem"
            value={ticket.description}
            onChange={(evt) => {
              const copy = { ...ticket }
              copy.description = evt.target.value
              update(copy)
            }} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Emergency:</label>
          <input type="checkbox"
            value={ticket.emergency}
            onChange={(evt) => {
              const copy = { ...ticket }
              copy.emergency = evt.target.checked
              update(copy)

            }} />
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={handleSaveButtonClick}>Submit Ticket</button>
    </form>
  )
}