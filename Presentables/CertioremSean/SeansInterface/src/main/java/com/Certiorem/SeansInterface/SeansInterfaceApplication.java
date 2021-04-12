package com.Certiorem.SeansInterface;

import com.Certiorem.SeansInterface.Model.ProtoSean;
//import net.sf.javaanpr.imageanalysis.CarSnapshot;
//import net.sf.javaanpr.intelligence.Intelligence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;

//@EnableScheduling
@SpringBootApplication
public class SeansInterfaceApplication implements CommandLineRunner {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public static void main(String[] args) {

		SpringApplication.run(SeansInterfaceApplication.class, args);

//		System.err.println("something");
//
//		Intelligence intelligence = null;
//		try {
//			intelligence = new Intelligence();
//			String path="src/test/resources/snapshots/test_001.jpg";
//			CarSnapshot carSnapshot=new CarSnapshot(path);
//			String smth=intelligence.recognize(carSnapshot);
//			System.err.println(smth);
//		} catch (ParserConfigurationException e) {
//			e.printStackTrace();
//		} catch (SAXException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}

	}

	@Override
	public void run(String... args) throws Exception{
		String sql = "SELECT * FROM parking_info";

		List<ProtoSean> visitors = jdbcTemplate.query(sql,
				BeanPropertyRowMapper.newInstance(ProtoSean.class));
		visitors.forEach(System.out :: println);
	}

}
