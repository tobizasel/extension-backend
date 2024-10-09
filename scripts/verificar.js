
const verificar = (afirmacion,paginas) => {

    console.log("AFIRMACION: " + afirmacion);
    console.log("PAGINAS: " + paginas.organic);


    // const prompt = `Voy a darte 5 articulos con titulo y descripcion, necesito que me digas si alguno verifica la siguiente afirmacion: ${afirmacion}.\nNecesito que respondas con una sola palabra. Si algun articulo verifica la afirmacion responde: 'VERDADERO'.Si los articulos NO LO VERIFICAN o dicen que es falso responde unicamente: 'FALSO'\n
    // ${paginas.forEach(pagina => {
    //     "Titulo: " + pagina.title + ". Descripcion: " + pagina.snippet + ". "
    // })}`

    const prompt2 = `Tienes el siguiente tweet:\n\nTweet: 'Milei presenta un presupuesto 2025'\n\nY los siguientes resultados de búsqueda, obtenidos de fuentes confiables:
    ${paginas.organic.map(pagina => 
        "Titulo: " + pagina.title + ". Descripcion: " + pagina.snippet + ". "
    )} Tu tarea es verificar si la información del tweet es verdadera o falsa basándote en los resultados de búsqueda. Evalúa si los resultados contienen información que confirme o desmienta lo que se dice en el tweet. Considera la precisión de los hechos, fechas y otros detalles importantes.\n\nResponde de la siguiente manera y nada mas:\nVerdadero o Falso`

    return axios.post("http://localhost:11434/api/generate", {
    "model": "gemma2",
    "prompt": prompt2,
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
}

export default verificar