import express from "express";
import cors from "cors";
import axios from "axios";
import buscar from "./scripts/busqueda.js";

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  const tweet = "MILEI SOS UN SIGMA\nLa inflacion de septiembre es de 0%";
  
  palabrasClaves(tweet)
    .then(data => {
      console.log(data.response);
      const paginas = buscar("Milei anuncia inflación cero en septiembre"); // Asegúrate de que buscar devuelva una promesa
      console.log("17", data.response);
      return paginas;
    })
    .then(paginas => {
      console.log("21", paginas);
      res.json({ resultado: paginas });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Error al procesar la solicitud" });
    });
});

const palabrasClaves = (tweet) => {
  return axios.post("http://localhost:11434/api/generate", {
    "model": "llama3.2",
    "prompt": "Te voy a mandar una noticia esparcida por redes sociales. tu rol como modelo de lenguaje es crear una busqueda de google con el que puede conseguir informacion sobre esta noticia.Toma en cuenta que la mayoria son de Argentina y actuales. La respuesta debe estar conformada UNICAMENTE CON LA BUSQUEDA DE GOOGLE. Tiene que ser una sola busqueda posible\n\n" + tweet,
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
