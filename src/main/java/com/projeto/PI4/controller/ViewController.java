package com.projeto.PI4.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String index() {
        return "index"; // templates/index.html
    }

    @GetMapping("/login")
    public String login() {
        return "teacher/login"; // templates/teacher/login.html
    }

    @GetMapping("/teacher/cadastro")
    public String cadastro() {
        return "teacher/cadastro"; // templates/teacher/cadastro.html
    }

    @GetMapping("/teacher/menu")
    public String menu() {
        return "teacher/menu"; // templates/teacher/menu.html
    }

    // --- NOVAS ROTAS DO MINIGAME ---

   @GetMapping("/minigame-rima-intro")
    public String minigameIntro() {
        // AGORA APONTA PARA templates/teacher/minigame1/minigame-rima-intro.html
        return "teacher/minigame1/minigame-rima-intro"; 
    }

    @GetMapping("/minigame-rima")
    public String minigame() {
        // ASSUMINDO QUE ESTE TAMBÉM ESTÁ NA MESMA PASTA
        return "teacher/minigame1/minigame-rima";
    }

    @GetMapping("/final-rima")
    public String finalRima() {
        // ASSUMINDO QUE ESTE TAMBÉM ESTÁ NA MESMA PASTA
        return "teacher/minigame1/final-rima";
    }
}