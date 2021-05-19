package br.com.ifce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ifce.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Integer> {

}
