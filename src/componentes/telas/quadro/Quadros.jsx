import { useState, useEffect } from "react";
import QuadroContext from "./QuadroContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { auth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    getQuadrosUIDFirebase, addQuadroFirebase,
    updateQuadroFirebase, getQuadrosFirebase,
    deleteQuadroFirebase
} from "../../../servicos/QuadroServico";
import { Navigate } from "react-router-dom";

function Quadros() {

    const [user, loading, error] = useAuthState(auth);

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ codigo: 0, nome: "", autor: "" });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ codigo: 0, nome: "", autor: "" });
        setAbreDialogo(true);
    }

    const editarObjeto = async codigo => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                await updateQuadroFirebase(objeto);
                setAlerta({ status: "success", message: "Post atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o Quadro:" + err });
            }
        } else {
            try {
                setObjeto(await addQuadroFirebase(objeto));
                setEditar(true);
                setAlerta({ status: "success", message: "Quadro criado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar o Quadro:" + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                deleteQuadroFirebase(objeto);
                setAlerta({ status: "sucess", message: "quadro removido com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao  remover: " + err });
            }
        }
    }

    useEffect(() => {
        setCarregando(true);
        if (user?.uid != null) {
            const uid = user?.uid;
            getQuadrosUIDFirebase(uid, setListaObjetos);
        }
        setCarregando(false);
    }, []);


    if (user){
        return (
            <QuadroContext.Provider value={{
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                remover,
                objeto, setObjeto,
                editarObjeto, novoObjeto, acaoCadastrar,
                handleChange, abreDialogo, setAbreDialogo
            }}>
                <Carregando carregando={carregando}>
                    <Tabela />
                </Carregando>
                <Form />
            </QuadroContext.Provider>
        )
    } else {
        return <Navigate  to="/"/>
    }
}

export default Quadros;
