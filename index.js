const http = require('http')
const chalk = require('chalk')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const _ = require('lodash')
const axios = require('axios')

let pacientes = []
let cantidadDeregistros = 0

http.createServer((req, res) => {

    res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });

    if(req.url.includes('registrar')) {

    axios
        .get('https://randomuser.me/api/')
        .then((data) => {

            const name = data.data.results[0].name.first;
            const lastName = data.data.results[0].name.last;
            const id = uuidv4().slice(0,6);
            const date = moment().format('MMMM Do YYYY, h:mm:ss a');
            cantidadDeregistros++;

            const nuevoPaciente = `${cantidadDeregistros}. Nombre: ${name} - Apellido: ${lastName} - ID: ${id} - Timestamp: ${date}`;

            pacientes.push(nuevoPaciente);

            res.end(`Usuario ${name} ${lastName} registrado con éxito.`);
        })
            .catch((e) => {
                console.log(e)
            })
    }

    if (req.url.includes('consultar')) {
        res.write('Pacientes registrados: <br>')
        if(pacientes === []) {
            res.write('No hay pacientes registrados')
        }else {
            console.log('Pacientes registrados')
            _.forEach(pacientes, (u) => {
                res.write(u + '<br>')
                console.log(chalk.green.bgWhite(u))
            })
        }
        res.end()
    }

})
    .listen(8080, () => {
        console.log('Server ON')
    })