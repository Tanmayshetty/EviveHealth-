package Evive.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class DashboardController {
    @RequestMapping(value = "/dashboard",method = RequestMethod.GET)
    public String dashboardPage(){
        System.out.println("Dashboard page");
        return "dashboard";
    }

}
