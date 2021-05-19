import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

import Header from './components/header';
import AlunoForm from './pages/aluno/form';
import AlunoList from './pages/aluno/list';
import DisciplinaForm from './pages/disciplina/form';
import DisciplinaList from './pages/disciplina/list';
import MatriculaForm from './pages/matricula/form';
import MatriculaList from './pages/matricula/list';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={AlunoList} exact/>

          <Route path="/aluno/list" component={AlunoList}/>
          <Route path="/aluno/form" component={AlunoForm} exact/>
          <Route path="/aluno/form/:id" component={AlunoForm}/>

          <Route path="/disciplina/list" component={DisciplinaList}/>
          <Route path="/disciplina/form" component={DisciplinaForm} exact/>
          <Route path="/disciplina/form/:id" component={DisciplinaForm}/>

          <Route path="/matricula/list" component={MatriculaList}/>
          <Route path="/matricula/form" component={MatriculaForm} exact/>
          <Route path="/matricula/form/:id" component={MatriculaForm}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
