package com.practice.hompee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class HompeeApplication {

	public static void main(String[] args) {
		SpringApplication.run(HompeeApplication.class, args);
	}

}
