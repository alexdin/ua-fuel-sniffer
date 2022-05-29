import './App.css';
import SearchContainer from "./components/search/SearchContainer";
import {getDistance} from 'geolib';
import {detectLocation} from "./components/location";
import {getAllFuelStations} from "./services/repository/FuelStation";
import {getFuelStation} from "./components/fuelProviders/Wog";
import SearchResultContainer from "./components/search/SearchResultContainer";
import {useState} from "react";
import {getFuelById} from "./components/search/SearchResultContainer/Station";

function App() {

    const [searchItems, setSearchItems] = useState([])

    const DISTANCE = 30;
    const REFERENCE_FUEL_ALIAS = "reference";
    const PREMIUM_FUEL_ALIAS = "premium"
    const fuelArr = [
        {label: "ДП", id: "dp", color: REFERENCE_FUEL_ALIAS, selected: false},
        {label: "ДП+", id: "dpp", color: PREMIUM_FUEL_ALIAS, selected: false},
        {label: "92", id: "92", color: REFERENCE_FUEL_ALIAS, selected: false},
        {label: "95", id: "95", color: REFERENCE_FUEL_ALIAS, selected: false},
        {label: "95+", id: "95p", color: PREMIUM_FUEL_ALIAS, selected: false},
        {label: "98+", id: "98p", color: PREMIUM_FUEL_ALIAS, selected: false},
        {label: "ГАЗ", id: "gas", color: REFERENCE_FUEL_ALIAS, selected: false},
    ];

    const updateSelectedItem = (data) => {
        fuelArr.forEach((item) => {
            if (item.id === data.id) {
                item.selected = data.selected
            }
        });
    };

    const runSearch = () => {
        detectLocation().then((myPosition) => {
            getAllFuelStations().then((stations) => {

                const filtredStations = stations.filter((element) => {
                    return getDistance(myPosition, element.coordinates) <= DISTANCE * 1000
                })

                Promise.all(filtredStations.map(async (item) => {
                    return getFuelStation(item.id, item.name).then((data) => {

                        const fuelParsed = data.fuelParsed.filter((el) => {
                            return el.status && getFuelById(fuelArr, el.id).selected
                        })
                        return {...data, fuelParsed}
                    })
                })).then((result) => {

                    setSearchItems(() => {
                        return result.filter((el) => {
                            return el.fuelParsed.length > 0
                        });
                    })
                });

            })
        })
    }

    return (
        <div className="App">
            <SearchContainer fuelItems={fuelArr} runSearch={runSearch} updateSelectedItem={updateSelectedItem}/>
            <SearchResultContainer fuelItems={fuelArr} stations={searchItems}/>
        </div>
    );
}

export default App;
