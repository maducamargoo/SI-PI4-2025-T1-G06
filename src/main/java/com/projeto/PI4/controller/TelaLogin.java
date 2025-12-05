//\\ackage com.projeto.PI4.controller;
//
//import com.projeto.PI4.service.TelaLoginService;
//Import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/telalogin")
//public class TelaLogin {
//
//    @Autowired // Podemos utilizar @autowired para conectar com a classe Service
//    private TelaLoginService telaloginservice;
//
//    /* ou podemos faz essa aplicação para conectar com a classe Service também
//        public TelaLogin(TelaLoginService telaloginservice) {
//        this.telaloginservice = telaloginservice;
//    }*/
//
//    @GetMapping
//    public String login(){
//        return telaloginservice.telaloginservice(" Java");
//    }
//
//    /*
//     * @PostMapping("/{id}")
//     * public String helloWordlPost(@PathVariable("id") String id, @RequestBody User{
//     *       return "Hello World" + body.getName() + id;
//     * }
//     * */
//}
