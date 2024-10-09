import axios from "axios";
import https from "https";

const buscar = (query) => {
    console.log("llego", query);
    let data = JSON.stringify({
        "q": query,
        "gl": "ar",
        "hl": "es-419",
        "tbs": "qdr:y"
    });

    let config = {
        method: 'post',
        url: 'https://google.serper.dev/search',
        headers: { 
            'X-API-KEY': 'c53d59c25876d584593b303eb26a81bd7579734c', 
            'Content-Type': 'application/json'
        },
        data: data,
        httpsAgent: new https.Agent({  
            rejectUnauthorized: false 
        })
    };

    return axios(config) // Asegúrate de devolver la promesa
        .then((response) => {
            return JSON.stringify(response.data); // Devuelve la respuesta
        })
        .catch((error) => {
            console.log(error);
            throw new Error("Error en la búsqueda"); // Lanza un error para manejarlo
        });
};

export default buscar;
