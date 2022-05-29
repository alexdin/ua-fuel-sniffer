import React from "react";
import "./index.css"
import FuelIcon from "../../../../services/repository/FuelStation/FuelIcon";

export const getFuelById = (fuel, id) => {
    for (let i=0; i<fuel.length; i++){
        if(fuel[i].id === id) {
            return fuel[i]
        }
    }
}

const Station = (props) => {

    const Fuels = props.fuelParsed.map((item) => {
      const fuelType = getFuelById(props.fuelItems,item.id)
      return (<FuelIcon name={fuelType.label} color={fuelType.color}/>)
    });
    return (
        <div className="fuel-station-result-item" key={props.alias + props.id}>
            <div className="station-logo"><img alt="wof icon" src={'/img/' + props.alias + '.png'}/></div>
            <div className="result-item-content">
                <div className="station-address">
                    {props.name}
                </div>
                <div className="fuel-have-types">
                    {Fuels}
                </div>
            </div>
        </div>
    );
}

export default Station