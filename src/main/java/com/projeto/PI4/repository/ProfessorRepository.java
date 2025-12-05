package com.projeto.PI4.repository;

import com.projeto.PI4.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {

    Professor findByUsuarioEscolaAndSenha(String usuarioEscola, String senha);

    Professor findByUsuarioEscola(String usuarioEscola);

    Professor findByEmail(String email);
}

