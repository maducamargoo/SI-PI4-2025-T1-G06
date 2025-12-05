package com.projeto.PI4.service;

import org.springframework.stereotype.Service;

//concentrar as lógicas, os processamentos, as classes com a canexão do BD
@Service
public class TelaLoginService {

    public String telaloginservice(String name) {
        return "Teste Servidor" + name;
    }
}
