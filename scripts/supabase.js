// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.URL;
// const supabaseKey = process.env.API_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export const insertTweet = async (contenido, estado, id, autor) => {
//   try {
//     const { data, error } = await supabase
//       .from('Analizados')
//       .insert([
//         { Content: contenido, VoF: estado, id: id, Autor: autor },
//       ])
//       .select();

//     if (error) {
//       throw new Error(error.message); // Manejar el error adecuadamente
//     }

//     return data; // Retorna los datos insertados
//   } catch (error) {
//     console.error("Error inserting tweet:", error);
//     return null; // Retorna null en caso de error
//   }
// };
