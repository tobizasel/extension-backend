import express from "express";
import cors from "cors";
import axios from "axios";
import buscar from "./scripts/busqueda.js";
import { Ollama } from "ollama";

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  const tweet = "MILEI SOS UN SIGMA\nLa inflacion de septiembre es de 0%";
  
  palabrasClaves(tweet)
    .then(data => {
      console.log("16", data.response);
      const paginas = buscar(data.response); // Asegúrate de que buscar devuelva una promesa
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

  const prompt = "Extrae las palabras clave del siguiente texto, enfocándote en nombres de personas, lugares, eventos, fechas, y términos importantes relacionados con hechos verificables. Las palabras clave deben ser aquellas que permitan realizar una búsqueda en Google para comprobar la veracidad del texto. Asegúrate de incluir solo los términos más relevantes y no incluir palabras comunes o irrelevantes. Unicamente responde con las palabras claves extraidas del tweet y convertilas en una oracion que represente al twit. No respondas nada mas que esa unica oracion\n" + tweet;


  return axios.post("http://localhost:11434/api/generate", {
    "model": "gemma2:2b",
    "prompt": prompt,
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
