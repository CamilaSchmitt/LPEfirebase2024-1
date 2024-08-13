import { useContext, useMemo } from "react";
import QuadroContext from "./QuadroContext";
import Alerta from "../../comuns/Alerta";
import { MaterialReactTable } from 'material-react-table';
import { MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';

function Tabela() {

    const { alerta, listaObjetos, remover, editarObjeto, novoObjeto }
        = useContext(QuadroContext);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'codigo',
                header: 'Código',
            },
            {
                accessorKey: 'nome',
                header: 'Nome'
            },
            {
                accessorKey: 'autor',
                header: 'Autor'
            },                      
        ],
        [],
    );

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4">
                Quadros
            </Typography>
            <Alerta alerta={alerta} />
            <Button variant="outlined"
                onClick={() => novoObjeto()}>
                <AddIcon /> Novo
            </Button>
            {listaObjetos.length === 0 &&
                <Typography variant="h4">
                    Nenhum Quadro encontrado
                </Typography>}
            {listaObjetos.length > 0 && (
                <MaterialReactTable
                    enableGlobalFilter={true}
                    showColumnFilters={true}
                    columns={columns}
                    data={listaObjetos}
                    enableColumnFilters={true}
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            header: 'Ações',
                            enableColumnFilter: false
                        }
                    }}
                    enableRowActions
                    renderRowActionMenuItems={({ row }) => <div>
                        <MenuItem key="editar"
                            onClick={() => editarObjeto(row.original)}
                            title="Editar"><EditIcon /></MenuItem>
                        <MenuItem key="remover"
                            onClick={() => remover(row.original)}
                            title="Apagar"><DeleteIcon /></MenuItem>
                    </div>}
                />
            )}
        </div>
    )

}

export default Tabela;