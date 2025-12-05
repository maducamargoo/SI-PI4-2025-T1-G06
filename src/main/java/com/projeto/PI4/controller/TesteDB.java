package com.projeto.PI4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;

@RestController
public class TesteDB {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/test-db")
    public String testDB() {
        try (Connection conn = dataSource.getConnection()) {
            return "✅ Conectado ao MySQL! Versão do BD: "
                    + conn.getMetaData().getDatabaseProductVersion();
        } catch (Exception e) {
            return "❌ Erro ao conectar: " + e.getMessage();
        }
    }
}
