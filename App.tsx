import { useState } from "react";
import "./App.css";

import EquipamentoCard from "./src/EquipamentoCard";
import ListaEquipamentos from "./src/ListaEquipamentos";
import FormularioEmprestimo from "./src/FormularioEmprestimo";

export interface Equipamento {
  patrimonio: string;
  nome: string;
  categoria: string;
  status: "Disponível" | "Emprestado";
  solicitante?: string;
  devolucaoPrevista?: string;
}

const equipamentosIniciais: Equipamento[] = [
  {
    patrimonio: "EQ001",
    nome: "Projetor Epson",
    categoria: "Projetor",
    status: "Disponível",
  },
  {
    patrimonio: "EQ002",
    nome: "Caixa de Som JBL",
    categoria: "Áudio",
    status: "Emprestado",
    solicitante: "Professor Carlos",
    devolucaoPrevista: "2026-09-15",
  },
  {
    patrimonio: "EQ003",
    nome: "Cabo HDMI 5m",
    categoria: "Cabo",
    status: "Disponível",
  },
  {
    patrimonio: "EQ004",
    nome: "Projetor BenQ",
    categoria: "Projetor",
    status: "Disponível",
  },
  {
    patrimonio: "EQ005",
    nome: "Microfone sem fio",
    categoria: "Áudio",
    status: "Emprestado",
    solicitante: "Professora Ana",
    devolucaoPrevista: "2026-09-20",
  },
];

function App() {
  const [equipamentos, setEquipamentos] =
    useState<Equipamento[]>(equipamentosIniciais);

  const [mensagem, setMensagem] = useState("");

  function realizarEmprestimo(
    patrimonios: string[],
    solicitante: string,
    devolucaoPrevista: string
  ) {
    if (patrimonios.length === 0) {
      setMensagem("Selecione pelo menos um equipamento.");
      return;
    }

    // Limite individual escolhido para a prova.
    if (patrimonios.length > 2) {
      setMensagem("Limite de 2 equipamentos por empréstimo.");
      return;
    }

    const selecionados = equipamentos.filter((equipamento) =>
      patrimonios.includes(equipamento.patrimonio)
    );

    // REGRA CRÍTICA DA PROVA:
    // não permitir empréstimo de item já emprestado.
    const algumEmprestado = selecionados.some(
      (equipamento) => equipamento.status === "Emprestado"
    );

    if (algumEmprestado) {
      setMensagem(
        "Empréstimo não realizado: um dos equipamentos já está emprestado."
      );
      return;
    }

    setEquipamentos((listaAtual) =>
      listaAtual.map((equipamento) =>
        patrimonios.includes(equipamento.patrimonio)
          ? {
              ...equipamento,
              status: "Emprestado",
              solicitante,
              devolucaoPrevista,
            }
          : equipamento
      )
    );

    setMensagem(
      `Empréstimo registrado para ${solicitante}.`
    );
  }

  return (
    <main className="app">
      <header className="cabecalho">
        <p className="codigo">PP-0UPUPK1-0GUTYGW</p>

        <h1>Empréstimo de Equipamentos Audiovisuais</h1>

        <p>
          Controle de projetores, caixas de som e cabos para professores e
          turmas.
        </p>
      </header>

      <section className="resumo">
        <div>
          <strong>{equipamentos.length}</strong>
          <span>Equipamentos</span>
        </div>

        <div>
          <strong>
            {equipamentos.filter(
              (equipamento) => equipamento.status === "Disponível"
            ).length}
          </strong>

          <span>Disponíveis</span>
        </div>

        <div>
          <strong>
            {equipamentos.filter(
              (equipamento) => equipamento.status === "Emprestado"
            ).length}
          </strong>

          <span>Emprestados</span>
        </div>
      </section>

      <section className="conteudo">
        <FormularioEmprestimo
          equipamentos={equipamentos}
          onEmprestimo={realizarEmprestimo}
        />

        <ListaEquipamentos equipamentos={equipamentos} />
      </section>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      <section className="componentes">
        {equipamentos.slice(0, 2).map((equipamento) => (
          <EquipamentoCard
            key={equipamento.patrimonio}
            equipamento={equipamento}
          />
        ))}
      </section>
    </main>
  );
}

export default App;