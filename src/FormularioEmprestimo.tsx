import { useState } from "react";
import type { Equipamento } from "./App";

interface FormularioEmprestimoProps {
  equipamentos: Equipamento[];
  onEmprestimo: (
    patrimonios: string[],
    solicitante: string,
    devolucaoPrevista: string
  ) => void;
}

function FormularioEmprestimo({
  equipamentos,
  onEmprestimo,
}: FormularioEmprestimoProps) {
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [solicitante, setSolicitante] = useState("");
  const [devolucaoPrevista, setDevolucaoPrevista] = useState("");

  function alternarEquipamento(patrimonio: string) {
    setSelecionados((listaAtual) => {
      if (listaAtual.includes(patrimonio)) {
        return listaAtual.filter((item) => item !== patrimonio);
      }

      if (listaAtual.length >= 2) {
        return listaAtual;
      }

      return [...listaAtual, patrimonio];
    });
  }

  function enviarFormulario(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    onEmprestimo(
      selecionados,
      solicitante,
      devolucaoPrevista
    );

    setSelecionados([]);
    setSolicitante("");
    setDevolucaoPrevista("");
  }

  const formularioInvalido =
    solicitante.trim() === "" ||
    devolucaoPrevista === "";

  return (
    <form
      className="formulario"
      onSubmit={enviarFormulario}
    >
      <h2>Novo empréstimo</h2>

      <label>Solicitante</label>

      <input
        type="text"
        value={solicitante}
        onChange={(event) =>
          setSolicitante(event.target.value)
        }
        placeholder="Nome do professor ou responsável"
      />

      <label>Data prevista para devolução</label>

      <input
        type="date"
        value={devolucaoPrevista}
        onChange={(event) =>
          setDevolucaoPrevista(event.target.value)
        }
      />

      <label>Equipamentos disponíveis</label>

      <div className="opcoes">
        {equipamentos.map((equipamento) => {
          const emprestado =
            equipamento.status === "Emprestado";

          const selecionado = selecionados.includes(
            equipamento.patrimonio
          );

          return (
            <label
              key={equipamento.patrimonio}
              className={`opcao ${
                emprestado ? "bloqueado" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selecionado}
                disabled={
                  emprestado ||
                  (!selecionado &&
                    selecionados.length >= 2)
                }
                onChange={() =>
                  alternarEquipamento(
                    equipamento.patrimonio
                  )
                }
              />

              <span>
                {equipamento.nome} -{" "}
                {equipamento.patrimonio}
              </span>
            </label>
          );
        })}
      </div>

      <p className="limite">
        Limite por empréstimo: 2 equipamentos.
      </p>

      <button
        type="submit"
        disabled={formularioInvalido}
      >
        Registrar empréstimo
      </button>
    </form>
  );
}

export default FormularioEmprestimo;