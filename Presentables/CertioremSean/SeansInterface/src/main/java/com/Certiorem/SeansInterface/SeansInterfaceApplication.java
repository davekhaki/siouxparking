package com.Certiorem.SeansInterface;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Scanner;

import static com.Certiorem.SeansInterface.VideoCapture.convertMovieToJPG;

//@EnableScheduling
@SpringBootApplication
public class SeansInterfaceApplication implements CommandLineRunner {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public static void main(String[] args) {

		SpringApplication.run(SeansInterfaceApplication.class, args);

		System.err.println("something");

//		Scanner s=new Scanner(System.in);
//		System.out.println("Enter the path of mp4 (for eg c:\\test.mp4)");
//		String mp4Path=s.nextLine();
//		System.out.println("Enter the folder path where the images will be saved (eg c:\\convertedImages)");
//		String imagePath=s.nextLine();

		String mp4Path="../CertioremSean/SeansInterface/src/main/resources/vids/anprVideo.mp4";
		//String mp4Path="G:\\ICT Sem 3\\group1_parkingapp\\Presentables\\CertioremSean\\SeansInterface\\src\\main\\resources\\vids\\anprVideo.mp4";
//		String imagePath="G:\\ICT Sem 3\\group1_parkingapp\\Presentables\\CertioremSean\\SeansInterface\\src\\main\\resources\\picsFromVideo";
		String imagePath="../CertioremSean/SeansInterface/src/main/resources/picsFromVideo";
		try {
			convertMovieToJPG(mp4Path, imagePath,"jpg");
		} catch (Exception e) {
			e.printStackTrace();
		}


//		Intelligence intelligence = null;
//		try {
//			intelligence = new Intelligence();
//			String path="..\\CertioremSean\\SeansInterface\\src\\main\\resources\\pics\\chosenAgain.jpg";
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
