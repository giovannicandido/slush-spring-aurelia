package info.atende.touch.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Default index controller
 */
@Controller
public class IndexController {
    @RequestMapping("/")
    public String index() {
        return "index";
    }

}
