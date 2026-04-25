package com.quasarbet.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TesteApiController {

    @Autowired
    private JdbcTemplate jdbc;

    @GetMapping("/teste")
    public Object instalacao() {
        return jdbc.queryForList("SELECT * FROM instalacao_tb");
    }
}