import React from "react";
import "./index.css"


const SearchButton = ({onRunSearch}) => {
    return (
        <div className="search-button" onClick={onRunSearch}>🔎</div>
    )
}

export default SearchButton