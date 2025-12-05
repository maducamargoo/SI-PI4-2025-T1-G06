package com.projeto.PI4.model;

import jakarta.persistence.*;

@Entity
@Table(name = "PROFESSOR")
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_escola", nullable = false)
    private String nomeEscola;

    @Column(name = "usuario_escola", nullable = false, unique = true)
    private String usuarioEscola;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    private String cpf;
    private String matricula;

    // Getters e Setters
    public Long getId() { return id; }

    public String getNomeEscola() { return nomeEscola; }
    public void setNomeEscola(String nomeEscola) { this.nomeEscola = nomeEscola; }

    public String getUsuarioEscola() { return usuarioEscola; }
    public void setUsuarioEscola(String usuarioEscola) { this.usuarioEscola = usuarioEscola; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getMatricula() { return matricula; }
    public void setMatricula(String matricula) { this.matricula = matricula; }
}
