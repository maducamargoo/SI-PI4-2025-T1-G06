package com.projeto.PI4.controller;

import com.projeto.PI4.model.Professor;
import com.projeto.PI4.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/professor")
@CrossOrigin("*")
public class ProfessorController {

    @Autowired
    private ProfessorService service;

    @PostMapping("/cadastrar")
    public Professor cadastrar(@RequestBody Professor p) {
        return service.cadastrar(p);
    }


    
    @PostMapping("/login")
    public Professor login(@RequestBody Professor p) {
        return service.login(p.getUsuarioEscola(), p.getSenha());
    }
}
