export const detectLocation = async ()=> {
   return  new Promise((resolve,reject) => {
        const success = (position) => {
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }

        const error = () => {
            console.log("Not support geolocation");
        }

        navigator.geolocation.getCurrentPosition(success,error);
    })
}