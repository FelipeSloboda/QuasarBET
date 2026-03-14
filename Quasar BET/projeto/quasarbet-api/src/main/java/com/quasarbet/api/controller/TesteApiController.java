package com.quasarbet.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TesteApiController {

    @GetMapping("/")
    public String home() {
        return "QuasarBET API : OK";
    }

}