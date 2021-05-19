import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

const AlunoList = () => {

    const [alunos, setAlunos] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getAlunos();
    }, []);

    const getAlunos = () => {
        api.get('/alunos')
            .then(response => {
                console.log(response.data.content);
                setAlunos(response.data.content);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deletaAluno = (id) => {
        console.log('Deletando aluno', id);
        api.delete(`alunos/${id}`)
            .then(response => {
                getAlunos();
            })
            .catch(err => {
                console.log(err);
            })
    }

    const editarAluno = (id) => {
        history.push(`/aluno/form/${id}`);
    }
    
    const novoAluno = (id) => {
        history.push(`/aluno/form`);
    }

    return (
        <>
            <h1>Lista de alunos</h1>
            <button onClick={() => novoAluno()}>Novo aluno</button>
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                </tr>
                {alunos.map(aluno => {
                    return (
                        <tr key={aluno.id}>
                            <td>{aluno.nome}</td>
                            <td>{aluno.email}</td>
                            <td>{aluno.cpf}</td>
                            <td>
                                <button onClick={() => editarAluno(aluno.id)}>Editar</button>
                            </td>
                            <td>
                                <button onClick={() => deletaAluno(aluno.id)}>Deletar</button>
                            </td>
                        </tr>
                    )
                })}
            </table>
            {/* <Link to="/aluno/form/2">Editar</Link> */}
        </>
    )
}

export default AlunoList;