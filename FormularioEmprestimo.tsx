function FormularioEmprestimo() {
  return (
    <section>
      <h2>Registrar empréstimo</h2>

      <form>
        <div>
          <label htmlFor="solicitante">
            Nome do solicitante:
          </label>

          <input
            id="solicitante"
            type="text"
            placeholder="Digite o nome"
          />
        </div>

        <div>
          <label htmlFor="equipamento">
            Equipamento:
          </label>

          <select id="equipamento">
            <option value="">
              Selecione um equipamento
            </option>

            <option value="camera">
              Câmera Canon
            </option>

            <option value="projetor">
              Projetor Epson
            </option>

            <option value="microfone">
              Microfone Shure
            </option>
          </select>
        </div>

        <button type="submit">
          Registrar empréstimo
        </button>
      </form>
    </section>
  );
}

export default FormularioEmprestimo;