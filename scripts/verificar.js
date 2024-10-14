
const verificar = (afirmacion,paginas) => {

    console.log("AFIRMACION: " + afirmacion);
    console.log("PAGINAS: " + paginas.organic);


    const prompt = `Voy a darte 5 articulos con titulo y descripcion, necesito que me digas si alguno verifica la siguiente afirmacion: ${afirmacion}.\nNecesito que respondas con una sola palabra. Si algun articulo verifica la afirmacion responde: 'VERDADERO'.Si los articulos NO LO VERIFICAN o dicen que es falso responde unicamente: 'FALSO'\n
    ${paginas.forEach(pagina => {
        "Titulo: " + pagina.title + ". Descripcion: " + pagina.snippet + ". "
    })}
   Compara la información del tweet con los resultados proporcionados. Si los datos de las fuentes contradicen el tweet o si no hay suficiente información, responde 'falso'. Si los datos respaldan completamente la afirmación del tweet, responde 'verdadero'. Si hay discrepancias en fechas, nombres, eventos o datos importantes, responde 'falso'. Responde únicamente con 'verdadero' o 'falso' sin explicaciones adicionales.`

   //const prompt2 = `Tienes el siguiente tweet:\n\nTweet: 'Caputo prometió autos nuevos para todos'\n\nY los siguientes resultados de búsqueda, obtenidos de fuentes confiables: Titulo: Caputo prometió una inflación de 1% en septiembre pero agosto .... Descripcion: Según esas proyecciones, en agosto la inflación se ubicará en 4%, levemente por encima del 3,8% de julio, para volver a empezar con 3 en septiembre y octubre y ... Titulo: Respira Caputo: la inflación no llegó al 4% en septiembre, según .... Descripcion: Según los cálculos de la consultora Orlando J. Ferreres & Asociados, la inflación de septiembre se ubicó en 3,2% mientras que la variación interanual llegó a ... Titulo: La inflación de agosto fue del 4,2% y acumula 94,8% en los .... Descripcion: La inflación interanual en agosto de 2024 fue del 236,7% con respecto a igual mes de 2023, y acumula en los primeros 8 meses del año una suba del 94,8% .... Titulo: Caputo dijo que la inflación será 0% antes de fin de año - La Nación. Descripcion: El ministro aseguró que no hay motivos macro para nuevos aumentos; aseguró que trabaja para reducir los costos a los comercios - LA NACION. Titulo: Comienza una semana atravesada por una licitación del Tesoro y el .... Descripcion: Este retorno, se descarta, puede resultar positivo ante la inflación de setiembre que se estima en 3,5% o menos. Compara la información del tweet con los resultados proporcionados. Si los datos de las fuentes contradicen el tweet o si no hay suficiente información, responde 'falso'. Si los datos respaldan completamente la afirmación del tweet, responde 'verdadero'. Si hay discrepancias en fechas, nombres, eventos o datos importantes, responde 'falso'. Responde únicamente con 'verdadero' o 'falso' sin explicaciones adicionales.`;


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
}

export default verificar