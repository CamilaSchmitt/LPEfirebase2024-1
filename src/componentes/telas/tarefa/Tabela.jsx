import React, { useContext } from "react";
import TarefaContext from "./TarefaContext";
import Alerta from "../../comuns/Alerta";
import { Button, Table, Container, Row, Col } from 'react-bootstrap';

function Tabela() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(TarefaContext);

    return (
        <Container style={{ padding: '20px' }}>
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center text-primary">📋 Tarefas</h1>
                    <Alerta alerta={alerta} />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col className="text-center">
                    <Button variant="primary" onClick={() => novoObjeto()} data-bs-toggle="modal" data-bs-target="#modalEdicao">
                        Novo <i className="bi bi-file-plus"></i>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {listaObjetos.length === 0 ? (
                        <h2 className="text-center text-muted">Nenhum registro encontrado</h2>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover className="shadow-sm">
                                <thead className="table-primary">
                                    <tr>
                                        <th scope="col" className="text-center">Ações</th>
                                        <th scope="col">Código</th>
                                        <th scope="col">Título</th>
                                        <th scope="col">Descrição</th>
                                        <th scope="col">Prioridade</th>
                                        <th scope="col">Quadro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaObjetos.map(objeto => (
                                        <tr key={objeto.codigo}>
                                            <td className="text-center">
                                                <Button variant="info" className="me-2" title="Editar" data-bs-toggle="modal" data-bs-target="#modalEdicao" onClick={() => editarObjeto(objeto.codigo)}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </Button>
                                                <Button variant="danger" title="Remover" onClick={() => remover(objeto.codigo)}>
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </td>
                                            <th scope="row">{objeto.codigo}</th>
                                            <td>{objeto.titulo}</td>
                                            <td>{objeto.descricao}</td>
                                            <td>{objeto.prioridade}</td>
                                            <td>{objeto.quadro_nome}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Tabela;
