import React from "react";
import './index.css'
import FuelIconButton from "./FuelIconButton";
import SearchButton from "./SearchButton";


const SearchContainer = ({fuelItems, runSearch,updateSelectedItem}) => {
    const fuelIconButtons = fuelItems.map((item, index) => {
        return (<FuelIconButton {...item}
                                onSelected={(data)=>{ updateSelectedItem(data) }}
                                key={index}
        />)
    });
    return (
        <div className="SearchContainer">
            <div className="SearchContainer-title">Шукаю</div>
            <div className="SearchContainer-fuel-box">
                {fuelIconButtons}
                <SearchButton onRunSearch={runSearch}/>
            </div>
        </div>
    )
};


export default SearchContainer