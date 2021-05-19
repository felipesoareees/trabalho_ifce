import React, { useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useParams, useHistory } from 'react-router-dom';
import api from '../../../services/api';

const DisciplinaForm = (props) =>{

    const history = useHistory();

    const { } = useForm();

    const { register, handleSubmit,reset } = useForm();
    const { id } = props.match.params;

    useEffect(() => {

        if(id){
            console.log('buscar aluno');
            api.get(`/disciplinas/${id}`)
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
        if(id){
            editarDisciplina(data);
        }else{
            cadastrarDisciplina(data);
        }
    }

    const cadastrarDisciplina = (data) => {
        api.post('/disciplinas',data)
            .then(response => {
                console.log('cadastrada com sucesso');
                history.push('/disciplina/list');
            })
            .catch(err => {
                console.log('erro');
            })
    }

    const editarDisciplina = (data) => {
        api.put(`/disciplinas/${id}`,data)
            .then(response => {
                console.log('cadastrada com sucesso');
                history.push('/disciplina/list')
            })
            .catch(err => {
                console.log('erro');
            })
    }

    return (
        <>
            <h1>Formulário de disciplina</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nome</label>
                    <input type="text" {...register("nome")}></input>
                </div>
                <div>
                    <label>Descrição</label>
                    <input type="text" {...register("descricao")}></input>
                </div>
                <input type="submit" value="Salvar"/>
            </form>
        </>
    );
}

export default DisciplinaForm;