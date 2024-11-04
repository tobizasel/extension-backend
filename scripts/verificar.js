import axios from "axios";

const verificar = (afirmacion, paginas) => {
  // Convierte el string en un objeto JSON

  console.log("6VERIFICAR: AFIRMACION: " + afirmacion);
  // Genera el contenido de las páginas para el prompt

  console.log("9VERIFICAR: PAGINAS ", paginas);


  const paginasText = paginas.organic.map(pagina => {
    
    if (pagina.position <= 5) {
      console.log("PAGINAS ", pagina.title);
      return `Titulo: ${pagina.title}. Descripcion: ${pagina.snippet}. `;
    } else{
      return ""
    }
  }).join('\n');

  // Crea el prompt con la información
  const prompt = `Voy a darte 5 articulos con titulo y descripcion, necesito que me digas si alguno verifica la siguiente afirmacion: ${afirmacion}.\nNecesito que respondas con una sola palabra. Si algun articulo verifica la afirmacion responde: 'VERDADERO'. Si los articulos NO LO VERIFICAN o dicen que es falso responde unicamente: 'FALSO'.\n
  ${paginasText}
  Compara la información del tweet con los resultados proporcionados. Si los datos de las fuentes contradicen el tweet o si no hay suficiente información, responde 'falso'. Si los datos respaldan completamente la afirmación del tweet, responde 'verdadero'. Si hay discrepancias en fechas, nombres, eventos o datos importantes, responde 'falso'. Responde únicamente con 'verdadero' o 'falso' sin explicaciones adicionales.`;

  // Llamada a la API
  return axios.post("http://localhost:11434/api/generate", {
    "model": "gemma2",
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

export default verificar;
