const express = require("express");
const app = express();
const cors = require('cors');
const axios = require("axios");

app.use(cors());

app.get("/api", (req, res) => {
  const tweet = "RECORD DE PETROLEO\nEl petroleo paso a ser el 3er producto mas exportado de Argentina, despues de la soja y el maíz. La produccion alcanzo un RECORD y volvio a niveles historicos del 2004";
  
  palabrasClaves(tweet)
    .then(data => {
      console.log(data.response);
      res.json({ resultado: data.response });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Error al procesar la solicitud" });
    });
});

const palabrasClaves = (tweet) => {
  return axios.post("http://localhost:11434/api/generate", {
    "model": "llama3.2",
    "prompt": "Te voy a mandar una noticia esparcida por redes sociales. tu rol como modelo de lenguaje es crear una busqueda de google con el que puede conseguir informacion sobre esta noticia. Responde con una sola busqueda posible\n\n" + tweet,
    "stream": false
  })
  .then(res => {
    console.log("holaaa");
    return res.data; // Devuelve los datos de la respuesta
  })
  .catch(error => {
    console.error("Error en la llamada a la API externa:", error);
    throw new Error("Error en la llamada a la API externa"); // Lanza el error para ser manejado en el manejador de la ruta
  });
};

app.listen(5000, () => {
  console.log("se prendio en el 5000");
});
