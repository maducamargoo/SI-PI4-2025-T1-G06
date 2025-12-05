package com.projeto.PI4.controller;

// 1. Imports do Spring Framework (resolve @RestController, @Autowired, etc)
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// 2. Imports do Java Padrão (resolve Map, Principal, LocalDateTime)
import java.security.Principal;
import java.util.Map;
import java.time.LocalDateTime;

// 3. Imports das Classes do seu Projeto (resolve Professor, Jogo, Repositories)
// Se der erro aqui, é porque você precisa criar os arquivos do Passo 2 e 3!
import com.projeto.PI4.model.Professor;
import com.projeto.PI4.model.Jogo;
import com.projeto.PI4.model.RegistroProgresso;
import com.projeto.PI4.repository.ProfessorRepository;
import com.projeto.PI4.repository.RegistroProgressoRepository;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private RegistroProgressoRepository progressoRepo;
    
    @Autowired
    private ProfessorRepository professorRepo;

    @PostMapping("/rima/salvar")
    public ResponseEntity<?> salvarPontuacao(@RequestBody Map<String, Object> payload, Principal principal) {
        try {
            // Verifica se o usuário está logado
            if (principal == null) {
                return ResponseEntity.status(403).body("Usuário não logado.");
            }

            String emailOuUser = principal.getName();
            
            // Busca o professor (ajuste 'findByUsuarioEscola' se seu método tiver outro nome)
            Professor professor = professorRepo.findByUsuarioEscola(emailOuUser);
            
            if (professor == null) {
                // Tenta buscar por email se falhar pelo usuário
                professor = professorRepo.findByEmail(emailOuUser); 
            }
            
            if (professor == null) {
                throw new RuntimeException("Professor não encontrado no banco.");
            }

            // Lê os dados do JSON vindo do Javascript
            Double pontuacao = Double.valueOf(payload.get("pontuacao").toString());
            
            // Cria o registro
            RegistroProgresso registro = new RegistroProgresso();
            registro.setProfessor(professor);
            registro.setJogo(new Jogo(1)); // Define que é o Jogo ID 1 (Minigame Rima)
            registro.setPontuacao(pontuacao.intValue());
            registro.setDataRegistro(LocalDateTime.now());

            progressoRepo.save(registro);

            return ResponseEntity.ok().body("Salvo com sucesso!");

        } catch (Exception e) {
            e.printStackTrace(); // Mostra o erro no console do VS Code
            return ResponseEntity.badRequest().body("Erro ao salvar: " + e.getMessage());
        }
    }
}