import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import QuadroContext from "./QuadroContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoSelect from "../../comuns/CampoSelect";
import CampoEntradaTexto from "../../comuns/CampoEntradaTexto";
import Dialogo from "../../comuns/Dialogo";
import { MenuItem } from "@mui/material";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(QuadroContext);

    return (
        <>
            <Dialogo id="modalEdicao" nome="Organização"
                open={abreDialogo} setOpen={setAbreDialogo}
                acaoCadastrar={acaoCadastrar} idform="formulario"
                maxWidth="sm">
                <Alerta alerta={alerta} />
                {/* <CampoEntrada id="txtID" label="ID"
                    tipo="text" name="id" value={objeto.id}
                    onchange={handleChange} requerido={false}
                    readonly={true} /> */}
                <CampoEntrada id="txtNome" label="Nome"
                    tipo="text" name="nome" value={objeto.nome}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Nome OK"
                    msginvalido="Informe o nome" />
                <CampoEntrada id="txtAutor" label="Autor"
                    rows={5}
                    tipo="text" name="autor"
                    value={objeto.autor}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Autor OK"
                    msginvalido="Informe o autor" />
                {/* <CampoSelect
                    id="selectTipo" label="Tipo"
                    idLabel="labelTipo"
                    tipo="text" name="tipo" value={objeto.tipo}
                    onchange={handleChange} requerido={false}
                    msgvalido="Tipo OK"
                    msginvalido="Informe o Tipo">                    
                    <MenuItem value='Artigo'>Artigo</MenuItem>
                    <MenuItem value='Documentação'>Documentação</MenuItem>                    
                </CampoSelect> */}
            </Dialogo>
        </>
    )

}

export default Form;