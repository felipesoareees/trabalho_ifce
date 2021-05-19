import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

const MatriculaForm = (props) => {

    const history = useHistory();

    const [alunos, setAlunos] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);

    const { register, handleSubmit, reset, setValue } = useForm();

    const { id } = props.match.params;


    useEffect(() => {
        getAlunos();
    }, [])

    useEffect(() => {
        getDisciplinas();
    }, [])

    useLayoutEffect(() => {
        // if (id) {
        //     api.get(`/matriculas/${id}`)
        //         .then(response => {
        //             console.log(response.data);
        //             // reset(response.data);u
        //             setValue('idAluno', response.data.aluno.id);
        //             setValue('idDisciplina', response.data.disciplina.id)
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })
        // }
    }, []);

    const getAlunos = () => {
        api.get('/alunos')
            .then(response => {
                console.log(response.data.content);
                setAlunos(response.data.content);
                if (id) {
                    api.get(`/matriculas/${id}`)
                        .then(response => {
                            console.log(response.data);
                            // reset(response.data);u
                            setValue('idAluno', response.data.aluno.id);
                            // setValue('idDisciplina', response.data.disciplina.id)
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getDisciplinas = () => {
        api.get('/disciplinas')
            .then(response => {
                console.log(response.data.content);
                setDisciplinas(response.data.content);
                if (id) {
                    api.get(`/matriculas/${id}`)
                        .then(response => {
                            console.log(response.data);
                            // reset(response.data);u
                            // setValue('idAluno', response.data.aluno.id);
                            setValue('idDisciplina', response.data.disciplina.id)
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const cadastrarMatricula = (data) => {
        api.post('/matriculas', data)
            .then(response => {
                console.log('cadastrado com sucesso');
                history.push('/matricula/list');
            })
            .catch(err => {
                console.log('erro');
            })
    }

    const editarMatricula = (data) => {
        api.put(`/matricula/${id}`, data)
            .then(response => {
                console.log('cadastrado com sucesso');
                history.push('/matricula/list')
            })
            .catch(err => {
                console.log('erro');
            })
    }

    const onSubmit = (data) => {
        console.log(data);
        if (id) {
            editarMatricula(data);
        } else {
            cadastrarMatricula(data);
        }
    }

    return (
        <>
            <h1>Formulário de Matrícula</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Aluno</label>
                    <select {...register("idAluno")}>
                        <option value="">Escolha o aluno</option>
                        {
                            alunos.map(aluno => {
                                return (
                                    <option key={alunos.id} value={aluno.id}>{aluno.nome}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <label>Disciplina</label>
                    <select {...register("idDisciplina")}>
                        <option value="">Escolha uma disciplina</option>
                        {
                            disciplinas.map(disciplina => {
                                return (
                                    <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <input type="submit" value="Salvar" />
            </form>
        </>
    )
}

export default MatriculaForm;