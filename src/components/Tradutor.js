import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Tradutor.css";

export default function Tradutor() {
  const [texto, setTexto] = useState("");
  const [traducao, setTraducao] = useState("");
  const [idiomaOrigem, setIdiomaOrigem] = useState("en");
  const [idiomaDestino, setIdiomaDestino] = useState("pt");
  const [idiomas, setIdiomas] = useState([]);
  const [temaEscuro, setTemaEscuro] = useState(false);

  useEffect(() => {
    document.body.className = temaEscuro ? "bg-dark text-white" : "bg-light text-dark";
  }, [temaEscuro]);

  useEffect(() => {
    setIdiomas([
      { code: "en", name: "Inglês" },
      { code: "pt", name: "Português" },
      { code: "es", name: "Espanhol" },
      { code: "fr", name: "Francês" },
      { code: "it", name: "Italiano" },
      { code: "de", name: "Alemão" },
    ]);
  }, []);

  const traduzirTexto = async () => {
    if (!texto.trim()) return;

    try {
      const response = await axios.get("https://api.mymemory.translated.net/get", {
        params: {
          q: texto,
          langpair: `${idiomaOrigem}|${idiomaDestino}`,
        },
      });
      setTraducao(response.data.responseData.translatedText);
    } catch (error) {
      console.error("Erro na tradução:", error);
    }
  };

  const inverterIdiomas = () => {
    const origemAtual = idiomaOrigem;
    setIdiomaOrigem(idiomaDestino);
    setIdiomaDestino(origemAtual);
  };

  return (
    <div
      className={`tradutor-container ${
        temaEscuro ? "bg-dark-mode" : "bg-light-mode"
      }`}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Tradutor</h1>
        <button
          className={`btn btn-toggle-tema btn-${temaEscuro ? "light" : "dark"}`}
          onClick={() => setTemaEscuro(!temaEscuro)}
        >
          {temaEscuro ? "☀️ Tema Claro" : "🌙 Tema Escuro"}
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Texto para traduzir:</label>
        <textarea
          className="form-control"
          rows="4"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </div>

      <div className="row mb-3 align-items-end">
        <div className="col">
          <label className="form-label">Idioma de origem:</label>
          <select
            className="form-select"
            value={idiomaOrigem}
            onChange={(e) => setIdiomaOrigem(e.target.value)}
          >
            {idiomas.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-auto d-flex justify-content-center">
          <button
            className="btn btn-outline-secondary rounded-circle"
            style={{ width: "48px", height: "48px" }}
            onClick={inverterIdiomas}
            title="Inverter Idiomas"
          >
            🔄
          </button>
        </div>

        <div className="col">
          <label className="form-label">Idioma de destino:</label>
          <select
            className="form-select"
            value={idiomaDestino}
            onChange={(e) => setIdiomaDestino(e.target.value)}
          >
            {idiomas.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={traduzirTexto}>
          Traduzir
        </button>
      </div>

      {traducao && (
        <div className="alert alert-primary">
          <strong>Tradução:</strong> {traducao}
        </div>
      )}
    </div>
  );
}