package Evive.controller;

import Evive.model.User;
import Evive.modelUI.LoginModelUi;
import Evive.respository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {
    @Autowired
    private UserRepository userRepository;
    @RequestMapping(value = "/login")
    public String loginPage()
    {
        System.out.println("Login page");
        return "login";
    }
    @RequestMapping(value = "/loginController",method = RequestMethod.POST)
    public @ResponseBody Map<String,Object> loginController(@RequestBody LoginModelUi loginModelUi,HttpServletResponse servletResponse)
    {
        Map<String,Object> objectMap=new HashMap<String, Object>();

        String encryptedPass= BCrypt.hashpw(loginModelUi.getPassword(),BCrypt.gensalt());
        User user= userRepository.
                findByEmailId(loginModelUi.getEmailId());
        System.out.println("User email"+loginModelUi.getEmailId()+"  password  : "+BCrypt.checkpw(loginModelUi.getPassword(),user.getPassword()));

        if(user==null)
        {
            objectMap.put("status","fail");
        }
        else {
            if(BCrypt.checkpw(loginModelUi.getPassword(),user.getPassword()))
            {

                servletResponse.addCookie(new Cookie("user_id",String.valueOf(user.getUserId())));
                objectMap.put("status","success");
            }

        }
        return objectMap;
    }
}
