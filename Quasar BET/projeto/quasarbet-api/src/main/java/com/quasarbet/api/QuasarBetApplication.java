package com.quasarbet.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class QuasarBetApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuasarBetApplication.class, args);
	}

}