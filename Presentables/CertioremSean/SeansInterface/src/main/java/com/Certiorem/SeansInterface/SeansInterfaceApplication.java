package com.Certiorem.SeansInterface;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@SpringBootApplication
public class SeansInterfaceApplication implements CommandLineRunner {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public static void main(String[] args) {

		SpringApplication.run(SeansInterfaceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception{
		String sql = "SELECT * FROM parking_info";

		List<ProtoSean> visitors = jdbcTemplate.query(sql,
				BeanPropertyRowMapper.newInstance(ProtoSean.class));
		visitors.forEach(System.out :: println);
	}

}
