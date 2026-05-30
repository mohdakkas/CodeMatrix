package com.codematrix.problem.CodeMatrix;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping(value = {
            "/",
            "/problems",
            "/problems/**",
            "/contests",
            "/contests/**",
            "/discuss",
            "/leaderboard",
            "/login",
            "/register",
            "/profile",
            "/admin"
    })
    public String forwardReactRoutes() {
        return "forward:/index.html";
    }
}