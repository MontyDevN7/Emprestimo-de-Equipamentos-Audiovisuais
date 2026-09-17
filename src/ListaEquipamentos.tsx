import type { Equipamento } from "./App";
import EquipamentoCard from "./EquipamentoCard";

interface ListaEquipamentosProps {
  equipamentos: Equipamento[];
}

function ListaEquipamentos({
  equipamentos,
}: ListaEquipamentosProps) {
  return (
    <section className="lista">
      <h2>Equipamentos cadastrados</h2>

      <div className="grid">
        {equipamentos.map((equipamento) => (
          <EquipamentoCard
            key={equipamento.patrimonio}
            equipamento={equipamento}
          />
        ))}
      </div>
    </section>
  );
}

export default ListaEquipamentos;