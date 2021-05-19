package br.com.ifce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ifce.model.Disciplina;

public interface DisciplinaRepository extends JpaRepository<Disciplina, Integer> {

}
