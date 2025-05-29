import axios from "axios";

export async function traduzirComMyMemory(texto, origem, destino) {
  try {
    const res = await axios.get("https://api.mymemory.translated.net/get", {
      params: {
        q: texto,
        langpair: `${origem}|${destino}`,
      },
    });

    return res.data.responseData.translatedText;
  } catch (error) {
    console.error("Erro ao traduzir com MyMemory:", error);
    return "Erro na tradução.";
  }
}