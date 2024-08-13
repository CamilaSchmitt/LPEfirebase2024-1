import { useState, useEffect } from "react";
import TarefaContext from "./TarefaContext";
import { getQuadrosAPI } from "../../../servicos/QuadroServico";
import {
    getTarefasAPI, getTarefaPorCodigoAPI,
    deleteTarefaPorCodigoAPI, cadastrarTarefaAPI, updateTarefaAPI
} from "../../../servicos/TarefaServico";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from 'react-router-dom';

function Tarefa() {
    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaQuadros, setListaQuadros] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: 0,
        titulo: "",
        descricao: "",
        prioridade: "",
        quadro: "",
        quadro_nome: ""
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            titulo: "",
            descricao: "",
            prioridade: "",
            quadro: "",
            quadro_nome: ""
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (codigo) => {
        setObjeto(await getTarefaPorCodigoAPI(codigo));
        setAbreDialogo(true)
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async (e) => {
        e.preventDefault();
        if (editar) {
            try {
                await updateTarefaAPI(objeto);
                setAlerta({ status: "success", message: "Tarefa atualizada com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar a Tarefa:" + err });
            }
        } else {
            try {
                setObjeto(await cadastrarTarefaAPI(objeto));
                setEditar(true);
                setAlerta({ status: "success", message: "Tarefa criada com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar a Tarefa:" + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaTarefas = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getTarefasAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaQuadros = async () => {
        try {
            setListaQuadros(await getQuadrosAPI());
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async (codigo) => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteTarefaPorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaTarefas();
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaTarefas();
        recuperaQuadros();
    }, []);

    return (
        <TarefaContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, handleChange, novoObjeto, editarObjeto,
            listaQuadros, abreDialogo, setAbreDialogo
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </TarefaContext.Provider>
    )
}

export default WithAuth(Tarefa);
