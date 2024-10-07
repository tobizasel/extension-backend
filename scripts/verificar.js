
const verificar = (afirmacion,paginas) => {
    const prompt = `Voy a darte 5 articulos con titulo y descripcion, necesito que me digas si alguno verifica la siguiente afirmacion: ${afirmacion}.\nNecesito que respondas con una sola palabra. Si algun articulo verifica la afirmacion responde: 'VERDADERO'.Si los articulos NO LO VERIFICAN o dicen que es falso responde unicamente: 'FALSO'\n
    ${paginas.forEach(pagina => {
        "Titulo: " + pagina.title + ". Descripcion: " + pagina.snippet + ". "
    })}`

}