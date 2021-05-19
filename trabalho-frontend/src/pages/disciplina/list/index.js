import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

const DisciplinaList = () => {

    const [disciplinas, setDisciplinas] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getDisciplinas();
    }, []);

    const getDisciplinas = () => {
        api.get('/disciplinas')
            .then(response => {
                console.log(response.data.content);
                setDisciplinas(response.data.content);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const deleteDisciplina = (id) => {
        api.delete(`/disciplinas/${id}`)
            .then(response => {
                getDisciplinas();
            })
            .catch(err => {
                console.log(err);
            })
    }

    const editarDisciplina = (id) => {
        history.push(`/disciplina/form/${id}`);
    }

    const novaDisciplina = () => {
        history.push(`/disciplina/form`);
    }

    return (
        <>
            <h1>Lista de disciplinas</h1>
            <button onClick={() => novaDisciplina()}>Nova Disciplina</button>
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                </tr>
                {
                    disciplinas.map(disciplina => {
                        return (
                            <tr key={disciplina.id}>
                                <td>{disciplina.nome}</td>
                                <td>{disciplina.descricao}</td>
                                <td>
                                    <button onClick={() => editarDisciplina(disciplina.id)}>Editar</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteDisciplina(disciplina.id)}>Deletar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </>
    );
}

export default DisciplinaList;