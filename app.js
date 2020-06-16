const clima = require('./controlador/clima')

//Función switch para devolver presión o humedad
function switchopt(op, ciudad, temp) {
    let msg = ''
    switch (op) {
        case 'p':
            msg = `\nLa presión en ${ciudad} es de ${temp.data.main.pressure} hPa`
            break
        case 'h':
            msg = `\nLa humedad en ${ciudad} es del ${temp.data.main.humidity}%`
            break
        default:
            break
    }
    return msg
}
const argv = require('yargs').options({
    ciudad: {
        alias: 'c',
        desc: 'Nombre de la ciudad para obtener el clima',
        demand: true
    },
    opcional: { //parámetro opcional para imprimir humedad y/o presión
        alias: 'o',
        desc: 'Establece si se desea obtener la humedad(h) o la presión(p)',
    }
}).argv
const getInformacion = async(ciudad) => {
    try {
        const temp = await clima.getClima(argv.ciudad)
        var msg = ''
            //en caso de haber sólo un elemento en el parámetro -o
        if (typeof argv.opcional === 'string') {
            msg = switchopt(argv.opcional, ciudad, temp)
        }
        //en caso de haber más de un elemento en el parámetro -o
        if (typeof argv.opcional === 'object') {
            msg = ''
            var i;
            //Sólo se imprimirán dos elementos del parámetro -o
            //Puesto que sólo existen dos valores válidos
            for (i = 0; i < 2; i++) {

                msg = msg + switchopt(argv.opcional[i], ciudad, temp)
                    //Si el primer y segundo valor son el mismo ignora el segundo
                if (argv.opcional[0] === argv.opcional[1]) {
                    break
                }
            }
        }
        return `\nEl clima de ${ciudad} es de ${temp.data.main.temp} °C${msg}\n`
    } catch (e) {
        return `No se pudo obtener el clima de ${ciudad} `
    }
}
getInformacion(argv.ciudad).then(console.log).catch(console.log);