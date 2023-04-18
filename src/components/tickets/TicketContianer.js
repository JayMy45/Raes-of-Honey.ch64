import { useState } from "react"
import { TicketSearch } from "./TicketSearch"
import { TicketList } from "./TicketList"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <TicketSearch setterFunction={setSearchTerms} />
        <TicketList searchTermState={searchTerms} />
    </>
}