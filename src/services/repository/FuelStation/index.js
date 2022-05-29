
import {getValue, setValue} from "../../storage";
import {getFuelStations} from "../../../components/fuelProviders/Wog";

/**
 * Return all stations from cache or load from api
 * @param options
 */
export const getAllFuelStations = async (options = {}) => {
    const key = 'AllFuelStations'
    let fuelStations = getValue(key);
    // load from api if local storage null
    if (fuelStations == null) {
        fuelStations = await getFuelStations().then((data) => {
            return data
        });
        setValue(key,fuelStations)
    }

    return fuelStations
}