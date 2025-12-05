package com.projeto.PI4.model;

import jakarta.persistence.*; 

@Entity
@Table(name = "JOGO")
public class Jogo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String nome;

    
    public Jogo() {}

    
    public Jogo(Integer id) {
        this.id = id;
    }

  
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
}