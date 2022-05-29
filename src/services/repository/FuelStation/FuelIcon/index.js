import React from "react";

const FuelIcon = ({name,color}) => {

    const className = "FuelIcon " + color
    return (
      <div className={className}>
          {name}
      </div>
    );
}

export default FuelIcon