import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

const MatriculaList = () => {

    const [matriculas, setMatriculas] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getMatriculas();
    }, []);

    const getMatriculas = () => {
        api.get('/matriculas')
            .then(response => {
                console.log('matricula:', response.data.content);
                setMatriculas(response.data.content);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const deletarMatricula = (id) => {
        api.delete(`matriculas/${id}`)
            .then(response => {
                getMatriculas();
            })
            .catch(err => {
                console.log(err);
            })

    }

    const editarMatricula = (id) => {
        history.push(`/matricula/form/${id}`);
    }

    const novaMatricula = () => {
        history.push(`/matricula/form`);
    }

    return (
        <>
            <h1>Lista de Matrículas</h1>
            <button onClick={() => novaMatricula()}>Novo Matricula</button>
            <table>
                <tr>
                    <th>Nome do aluno</th>
                    <th>Email do aluno</th>
                    <ht>Nome da disciplina</ht>
                </tr>
                {
                    matriculas.map(matricula => {
                        return (
                            <tr key={matricula.id}>
                                <td>{matricula.aluno.nome}</td>
                                <td>{matricula.aluno.email}</td>
                                <td>{matricula.disciplina.nome}</td>
                                <td>
                                    <button onClick={() => editarMatricula(matricula.id)}>Editar</button>
                                </td>
                                <td>
                                    <button onClick={() => deletarMatricula(matricula.id)}>Deletar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </>
    )
}

export default MatriculaList;