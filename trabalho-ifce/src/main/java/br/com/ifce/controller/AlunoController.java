package br.com.ifce.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.ifce.model.Aluno;
import br.com.ifce.repository.AlunoRepository;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

	private AlunoRepository alunoRepository;

	public AlunoController(AlunoRepository alunoRepository) {
		this.alunoRepository = alunoRepository;
	}

	@GetMapping
	public ResponseEntity<Page<Aluno>> index(@PageableDefault(page = 0, size = 20) Pageable pageable) {
		return ResponseEntity.ok(alunoRepository.findAll(pageable));
	}

	@PostMapping
	public ResponseEntity<Aluno> adiciona(@Valid @RequestBody Aluno aluno) {

		aluno = alunoRepository.save(aluno);

		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/{id}").buildAndExpand(aluno.getId())
				.toUri();

		return ResponseEntity.created(location).body(aluno);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Aluno> show(@PathVariable("id") Integer id) {
		return alunoRepository.findById(id).map(aluno -> ResponseEntity.ok().body(aluno))
				.orElse(ResponseEntity.notFound().build());
	}

	@PutMapping("/{id}")
	public ResponseEntity<Aluno> update(@Valid @RequestBody Aluno aluno, @PathVariable("id") Integer id) {
		return alunoRepository.findById(id).map(a -> {
			
			a.setId(id);
			a.setCpf(aluno.getCpf());
			a.setEmail(aluno.getEmail());
			a.setNome(aluno.getNome());
			
			alunoRepository.save(a);
			
			return ResponseEntity.ok(a);
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> destroy(@PathVariable("id") Integer id) {
		return alunoRepository.findById(id).map(aluno -> {
			alunoRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}

}
