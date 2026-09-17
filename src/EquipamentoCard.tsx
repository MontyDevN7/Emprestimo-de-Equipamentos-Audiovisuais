import type { Equipamento } from "./App";

interface EquipamentoCardProps {
  equipamento: Equipamento;
}

function EquipamentoCard({ equipamento }: EquipamentoCardProps) {
  const estaAtrasado =
    equipamento.status === "Emprestado" &&
    equipamento.devolucaoPrevista !== undefined &&
    new Date(equipamento.devolucaoPrevista) < new Date();

  return (
    <article className="card">
      <div className="card-topo">
        <h3>{equipamento.nome}</h3>

        <span
          className={
            equipamento.status === "Disponível"
              ? "status disponivel"
              : "status emprestado"
          }
        >
          {equipamento.status}
        </span>
      </div>

      <p>
        <strong>Patrimônio:</strong> {equipamento.patrimonio}
      </p>

      <p>
        <strong>Categoria:</strong> {equipamento.categoria}
      </p>

      {equipamento.solicitante && (
        <p>
          <strong>Solicitante:</strong> {equipamento.solicitante}
        </p>
      )}

      {equipamento.devolucaoPrevista && (
        <p>
          <strong>Devolução:</strong> {equipamento.devolucaoPrevista}
        </p>
      )}

      {estaAtrasado && (
        <p className="atrasado">
          Devolução em atraso
        </p>
      )}
    </article>
  );
}

export default EquipamentoCard;