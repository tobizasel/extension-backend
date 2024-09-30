const express = require("express")
const app = express();
const cors = require('cors');


app.use(cors())

app.get("/api", (req,res) => {
    llamarChatGpt();
})

const llamarChatGpt = async () => {

    const API_KEY = "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"
    const prompt = "necesito que extraigas de este tweet una posible busqueda en google para verificar la veracidad de la noticia\nSE VIENE EL MILAGRO ECONOMICO ARGENTINO\nSalio medicion trimestral de pobreza realizada por la UCA y dio que en el primer trimestre llego a 54.8% (por culpa del massazo, miren la pendiente alcista que dibujan los trimestres anteriores) y en el segundo trimestre bajo casi 4 puntos: 51%"
    

    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {"role": "user", "content": prompt}
          ],
          prompt: prompt,
          max_tokens: 20,
        }),
      });

      const data = await response.json()
      return data

}




app.listen(5000, () => {console.log("se prendio en el 5000")})