import EquipamentoCard from "./EquipamentoCard";
import type { Equipamento } from "./types";

interface ListaEquipamentosProps {
  equipamentos: Equipamento[];
  onDevolver: (id: number) => void;
}

function ListaEquipamentos({
  equipamentos,
  onDevolver,
}: ListaEquipamentosProps) {
  return (
    <section>
      <h2>Equipamentos</h2>

      {equipamentos.map((equipamento) => (
        <EquipamentoCard
          key={equipamento.id}
          equipamento={equipamento}
          onDevolver={onDevolver}
        />
      ))}
    </section>
  );
}

export default ListaEquipamentos;