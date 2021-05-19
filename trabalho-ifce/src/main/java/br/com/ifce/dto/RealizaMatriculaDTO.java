package br.com.ifce.dto;

import javax.validation.constraints.NotNull;

import br.com.ifce.model.Aluno;
import br.com.ifce.model.Disciplina;
import br.com.ifce.model.Matricula;

public class RealizaMatriculaDTO {

	@NotNull
	private Integer idDisciplina;

	@NotNull
	private Integer idAluno;

	public Integer getIdDisciplina() {
		return idDisciplina;
	}

	public void setIdDisciplina(Integer idDisciplina) {
		this.idDisciplina = idDisciplina;
	}

	public Integer getIdAluno() {
		return idAluno;
	}

	public void setIdAluno(Integer idAluno) {
		this.idAluno = idAluno;
	}

	public Matricula getMatricula() {
		Matricula matricula = new Matricula(getAluno(), getDisciplina());
		return matricula;
	}

	private Aluno getAluno() {
		return new Aluno(idAluno);
	}

	private Disciplina getDisciplina() {
		return new Disciplina(idDisciplina);
	}
}
