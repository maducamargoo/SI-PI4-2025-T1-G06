package com.projeto.PI4.service;

import com.projeto.PI4.model.Professor;
import com.projeto.PI4.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository repository;

    
    public Professor cadastrar(Professor p) {

        
        if (repository.findByUsuarioEscolaAndSenha(p.getUsuarioEscola(), p.getSenha()) != null) {
            return null; 
        }

        return repository.save(p);
    }

    
    public Professor login(String usuarioEscola, String senha) {
        return repository.findByUsuarioEscolaAndSenha(usuarioEscola, senha);
    }
}
