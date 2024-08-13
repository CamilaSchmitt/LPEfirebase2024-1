import React, { useContext, useState, useEffect } from "react";
import Alerta from "../../comuns/Alerta";
import TarefaContext from "./TarefaContext";
import { getQuadrosAPI } from "../../../servicos/QuadroServico"; // Importar a função para buscar os gêneros


function Form() {
    const { objeto, handleChange, acaoCadastrar, alerta} = useContext(TarefaContext);
    const [quadros, setQuadros] = useState([]); // Estado para armazenar os quadros


    useEffect(() => {
        const carregarQuadros = async () => {
            const quadrosAPI = await getQuadrosAPI();
            setQuadros(quadrosAPI);
        };
        carregarQuadros();
    }, []);

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edição de Tarefas</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar} className="form-container needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="input-span">
                                <label htmlFor="txtTitulo" className="label">Título</label>
                                <input type="text" className="form-control" id="txtTitulo" placeholder="Informe o título" required name="titulo" value={objeto.titulo} onChange={handleChange} />
                                <div className="valid-feedback">Título OK!</div>
                                <div className="invalid-feedback">Informe o título!</div>
                            </div>
                            <div className="input-span">
                                <label htmlFor="txtDescricao" className="label">Descrição</label>
                                <input type="text" className="form-control" id="txtDescricao" placeholder="Informe a descrição" required name="descricao" value={objeto.descricao} onChange={handleChange} />
                                <div className="valid-feedback">Descrição OK!</div>
                                <div className="invalid-feedback">Informe a descrição!</div>
                            </div>
                            <div className="input-span">
                                <label htmlFor="selectPrioridade" className="label">Prioridade</label>
                                <select className="form-control" id="selectPrioridade" required name="prioridade" value={objeto.prioridade} onChange={handleChange}>
                                    <option value="">Selecione a prioridade</option>
                                    <option value="Alta">Alta</option>
                                    <option value="Média">Média</option>
                                    <option value="Baixa">Baixa</option>
                                </select>
                                <div className="valid-feedback">Prioridade OK!</div>
                                <div className="invalid-feedback">Selecione a prioridade!</div>
                            </div>
                            <div className="input-span">
                                <label htmlFor="selectQuadro" className="label">Quadro</label>
                                <select className="form-control" id="selectQuadro" required name="quadro" value={objeto.quadro} onChange={handleChange}>
                                    <option value="">Selecione o quadro</option>
                                    {quadros.map(quadro => (
                                        <option key={quadro.codigo} value={quadro.codigo}>
                                            {quadro.nome}
                                        </option>
                                    ))}
                                </select>
                                <div className="valid-feedback">Quadro OK!</div>
                                <div className="invalid-feedback">Selecione o quadro!</div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success">
                                Salvar <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Form;
