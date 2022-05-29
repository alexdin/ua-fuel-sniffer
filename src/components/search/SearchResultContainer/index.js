import React from "react";
import NoStation from "./NoStation";
import Station from "./Station";
import "./index.css"


const SearchResultContainer = ({stations,fuelItems}) => {
    const Stations = stations.map((item) => {
        return (
            <Station {...item} fuelItems={fuelItems} />
        );
    });

    return (
        <div className="App-result-container">
            {stations.length > 0 ? Stations : <NoStation/>}
        </div>
    )
}

export default SearchResultContainer