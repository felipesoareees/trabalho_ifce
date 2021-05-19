package br.com.ifce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ifce.model.Matricula;

public interface MatriculaRepository extends JpaRepository<Matricula, Integer> {

}
