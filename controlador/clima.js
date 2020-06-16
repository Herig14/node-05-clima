const axios = require('axios')
const getClima = async(ciudad) => {
    //codificación uri
    const ciudadURL = encodeURI(ciudad)
        //Petición http get con axios
    const resp = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudadURL}&appid=0dd168334f6427dfb96cc27425c390a3&units=metric`)
    return resp
}
module.exports = {
    getClima
}