package com.quasarbet.api.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TesteApiController {

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/teste")
    public Map<String, Object> home() {

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "QuasarBET API TESTE: OK");

        return response;
    }

}