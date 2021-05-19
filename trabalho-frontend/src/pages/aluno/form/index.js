import React, { useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
const AlunoForm = (props) => {

    const history = useHistory();

    const { register, handleSubmit, reset } = useForm();
    const { id } = props.match.params;
    // console.log()
    useEffect(() => {

        if (id) {
            console.log('buscar aluno');
            api.get(`/alunos/${id}`)
                .then(response => {
                    reset(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        console.log('Valor do id: ', id);
    }, [])

    const onSubmit = (data) => {
        if (id) {
            editarUsuario(data);
        } else {
            cadastrarUsuario(data);
        }
    }

    const cadastrarUsuario = (data) => {
        api.post('/alunos', data)
            .then(response => {
                console.log('cadastrado com sucesso');
                history.push('/aluno/list');
            })
            .catch(err => {
                console.log('erro');
            })
    }

    const editarUsuario = (data) => {
        api.put(`/alunos/${id}`, data)
            .then(response => {
                console.log('cadastrado com sucesso');
                history.push('/aluno/list')
            })
            .catch(err => {
                console.log('erro');
            })
    }

    return (
        <>
            <h1>Formulário de Alunos</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nome</label>
                    <input type="text" {...register("nome")}></input>
                </div>
                <div>
                    <label>CPF</label>
                    <input type="text" {...register("cpf")}></input>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" {...register("email")}></input>
                </div>
                <input type="submit" value="Salvar" />
            </form>
        </>
    )
}

export default AlunoForm;