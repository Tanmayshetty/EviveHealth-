package Evive.controller;

import Evive.model.User;
import Evive.modelUI.RegisterModelUI;
import Evive.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class RegisterController {
    @Autowired
    private UserRepository userRepository;
    @RequestMapping(value="/registerController",method = RequestMethod.POST)
        public @ResponseBody Map<String,Object> register(@RequestBody RegisterModelUI modelUI) {
            Map<String,Object> objectMap=new HashMap<>();
            User user=new User();
            user.setEmailId(modelUI.getEmail());
            user.setPassword(BCrypt.hashpw(modelUI.getPassword(),BCrypt.gensalt()));
        System.out.println("User Pass"+BCrypt.hashpw(modelUI.getPassword(),BCrypt.gensalt()));
            user.setGender(modelUI.getGender());
            userRepository.save(user);
            objectMap.put("status","success");
            return objectMap;
        }
}
