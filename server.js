import express from "express";
import cors from "cors";
import axios from "axios";
import buscar from "./scripts/busqueda.js";
import verificar from "./scripts/verificar.js"

const app = express();

app.use(cors());

app.get("/api", (req, res) => {


  const tweetRecibido = req.query.tweet;
  const idTweetRecibido = req.query.id;

  const tweet = "MILEI SOS UN SIGMA\nLa inflacion de septiembre es de 0%";
  var tweetParseado = ""

  palabrasClaves(tweetRecibido)
  .then(data => {
    // Llama a 'buscar' y maneja la promesa correctamente
    tweetParseado = data.response
    return buscar(data.response);
  })
  .then(paginas => {
    // Llama a 'verificar' con las páginas obtenidas y el resultado de palabrasClaves
    console.log(paginas.searchParameters);
    return verificar(tweetParseado, paginas);
  })
  .then(veredicto => {
    console.log("Veredicto:", veredicto);
    // Enviar el veredicto como respuesta final
    res.json({ resultado: veredicto });
  })
  .catch(error => {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  });
});

const palabrasClaves = (tweet) => {

  const prompt = "Extrae las palabras clave del siguiente texto, enfocándote en nombres de personas, lugares, eventos, fechas, y términos importantes relacionados con hechos verificables. Las palabras clave deben ser aquellas que permitan realizar una búsqueda en Google para comprobar la veracidad del texto. Asegúrate de incluir solo los términos más relevantes y no incluir palabras comunes o irrelevantes. Unicamente responde con las palabras claves extraidas del tweet y convertilas en una oracion que represente al twit. NO RESPONDAS MAS QUE LA UNICA ORACION.\n" + tweet;


  return axios.post("http://localhost:11434/api/generate", {
    "model": "gemma2:2b",
    "prompt": prompt,
    "stream": false
  })
  .then(res => {
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
