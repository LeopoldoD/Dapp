import React from 'react'

const CreateButton = ({ onCreateRideClick }) => {
  return(
    <li className="pure-menu-item">
      <a href="#" className="pure-menu-link" onClick={(event) => onCreateRideClick(event)}>Create a Ride</a>
    </li>
  )
}

export default CreateButton
