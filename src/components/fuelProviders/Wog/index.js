const domain = 'https://api.wog.ua';
const alias = 'wog'


const getResource = async (url, method = 'get', data = {}) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json()
}

const parseFuel = (stationDesc) => {
    let result = []
    let strings = stationDesc.split('\n')
    const regex = '/^(М{1}[0-9]{2,3})|(М{1}[0-9]{2,3})|(А{1}[0-9]{2,3})|(МДП\\+)|(ДП)|(ГАЗ)/g';

    for (let i = 0; i < strings.length; i++) {
        let fuel = strings[i].match(regex) !== null  ? strings[i].match(regex)[0] : null
        if(fuel) {
            result[result.length] = {
                id: fuelToId(fuel),
                status: strings[i].includes('Готівка, банк.картки') || strings[i].includes('Гаманець ПРАЙД до')
            }
        }

    }
    return result
}


const fuelToId = (fuel) => {
    switch (fuel) {
        case "ДП":
            return "dp"
        case "МДП+":
            return "dpp"
        case "А92":
            return "92"
        case "А95":
            return "95"
        case "М95":
        case "M95":
            return "95p"
        case "М100":
            return "98p"
        case "ГАЗ":
            return "gas"
        default:
            return "err"
    }
}


export const getFuelStations = async () => {
    const data = await getResource(domain + '/fuel_stations')
    return data.data.stations.map((station) => {
        return {
            city: station.city,
            id: station.id,
            coordinates: station.coordinates,
            name: station.name,
            alias: alias
        }
    })
}

export const getFuelStation = async (id,name) => {
    let data = await getResource(domain + '/fuel_stations/' + id)
    data = data.data
    return {
        alias: alias,
        id: data.id,
        city: data.city,
        name: name,
        fuelParsed: parseFuel(data.workDescription),
        description: data.workDescription
    }
}

