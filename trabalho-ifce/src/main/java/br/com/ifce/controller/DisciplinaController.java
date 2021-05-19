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

import br.com.ifce.model.Disciplina;
import br.com.ifce.repository.DisciplinaRepository;

@RestController
@RequestMapping("/disciplinas")
public class DisciplinaController {

	private DisciplinaRepository disciplinaRepository;

	public DisciplinaController(DisciplinaRepository disciplinaRepository) {
		this.disciplinaRepository = disciplinaRepository;
	}

	@GetMapping
	public ResponseEntity<Page<Disciplina>> index(@PageableDefault(page = 0, size = 20) Pageable pageable) {
		return ResponseEntity.ok(disciplinaRepository.findAll(pageable));
	}

	@PostMapping
	public ResponseEntity<Disciplina> adiciona(@Valid @RequestBody Disciplina disciplina) {

		disciplina = disciplinaRepository.save(disciplina);

		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/{id}").buildAndExpand(disciplina.getId())
				.toUri();

		return ResponseEntity.created(location).body(disciplina);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Disciplina> show(@PathVariable("id") Integer id) {
		return disciplinaRepository.findById(id).map(aluno -> ResponseEntity.ok().body(aluno))
				.orElse(ResponseEntity.notFound().build());
	}

	@PutMapping("/{id}")
	public ResponseEntity<Disciplina> update(@Valid @RequestBody Disciplina disciplina, @PathVariable("id") Integer id) {
		return disciplinaRepository.findById(id).map(d -> {
			
			d.setId(id);
			d.setNome(disciplina.getNome());
			d.setDescricao(disciplina.getDescricao());
			
			disciplinaRepository.save(d);

			return ResponseEntity.ok(d);
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> destroy(@PathVariable("id") Integer id) {
		return disciplinaRepository.findById(id).map(disciplina -> {
			disciplinaRepository.delete(disciplina);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}
}
