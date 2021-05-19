package br.com.ifce.controller;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.ifce.dto.RealizaMatriculaDTO;
import br.com.ifce.model.Matricula;
import br.com.ifce.repository.MatriculaRepository;

@RestController
@RequestMapping("/matriculas")
public class MatriculaController {
	
	private MatriculaRepository matriculaRepository;

	public MatriculaController(MatriculaRepository matriculaRepository) {
		this.matriculaRepository = matriculaRepository;
	}

	@GetMapping
	public ResponseEntity<Page<Matricula>> index(@PageableDefault(page = 0, size = 20) Pageable pageable) {
		return ResponseEntity.ok(matriculaRepository.findAll(pageable));
	}

	@PostMapping
	public ResponseEntity<Matricula> adiciona(@Valid @RequestBody RealizaMatriculaDTO matriculaDTO) {

		Matricula matricula = matriculaDTO.getMatricula();
		
		matricula = matriculaRepository.save(matricula);

		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/{id}").buildAndExpand(matricula.getId())
				.toUri();

		return ResponseEntity.created(location).body(matricula);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Matricula> show(@PathVariable("id") Integer id) {
		return matriculaRepository.findById(id).map(matricula -> ResponseEntity.ok().body(matricula))
				.orElse(ResponseEntity.notFound().build());
	}

	@PutMapping("/{id}")
	public ResponseEntity<Matricula> update(@Valid @RequestBody RealizaMatriculaDTO matriculaDTO, @PathVariable("id") Integer id) {
		return matriculaRepository.findById(id).map(m -> {
			
			Matricula matricula = matriculaDTO.getMatricula();
			
			m.setAluno(matricula.getAluno());
			m.setDisciplina(matricula.getDisciplina());
			
			matriculaRepository.save(m);

			return ResponseEntity.ok(m);
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> destroy(@PathVariable("id") Integer id) {
		return matriculaRepository.findById(id).map(matricula -> {
			matriculaRepository.delete(matricula);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}
}
