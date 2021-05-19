import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link to="/aluno/list">Alunos</Link>
            <Link to="/disciplina/list">Disciplinas</Link>
            <Link to="/matricula/list">Matriculas</Link>
        </div>
    )
}

export default Header;