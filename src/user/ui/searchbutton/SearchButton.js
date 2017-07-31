import React from 'react'

const SearchButton = ({ onSearchRideClick }) => {
  return(
    <li className="pure-menu-item">
      <a href="#" className="pure-menu-link" onClick={(event) => onSearchRideClick(event)}>Search</a>
    </li>
  )
}

export default SearchButton
