import type { Equipamento } from "./types";

interface EquipamentoCardProps {
  equipamento: Equipamento;
  onDevolver: (id: number) => void;
}

function EquipamentoCard({
  equipamento,
  onDevolver,
}: EquipamentoCardProps) {
  return (
    <article>
      <h3>{equipamento.nome}</h3>

      <p>
        <strong>Tipo:</strong> {equipamento.tipo}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {equipamento.disponivel ? "Disponível" : "Emprestado"}
      </p>

      {!equipamento.disponivel && (
        <button onClick={() => onDevolver(equipamento.id)}>
          Registrar devolução
        </button>
      )}
    </article>
  );
}

export default EquipamentoCard;