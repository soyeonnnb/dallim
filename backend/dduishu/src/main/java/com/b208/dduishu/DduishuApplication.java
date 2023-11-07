package com.b208.dduishu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DduishuApplication {

	public static void main(String[] args) {
		SpringApplication.run(DduishuApplication.class, args);
	}

}
