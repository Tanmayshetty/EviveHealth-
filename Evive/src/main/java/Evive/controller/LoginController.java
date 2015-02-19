package Evive.controller;

import Evive.modelUI.LoginModelUi;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class LoginController {
    @RequestMapping(value = "/login")
    public String loginPage()
    {
        System.out.println("Login page");
        return "login";
    }
    @RequestMapping(value = "/loginController",method = RequestMethod.POST)
    public @ResponseBody Map<String,Object> loginController(@RequestBody LoginModelUi loginModelUi)
    {

        return null;
    }
}
