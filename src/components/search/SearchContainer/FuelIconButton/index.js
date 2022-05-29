import React, {useState} from "react";
import "./index.css"


const FuelIconButton = ({label,color,onSelected,id}) => {

    const [selected,setSelected] = useState(false)

    const toggleFuel = () => {
        setSelected( (s) => !s);
        onSelected({
            selected : !selected,
            id: id
        })
    }

    let classNameState = 'FuelIconButton' + (selected ? ' selected' : '') + ' ' + color;

    return (
      <div className={classNameState} onClick={toggleFuel}>
          {label}
      </div>
    );
}


export default FuelIconButton