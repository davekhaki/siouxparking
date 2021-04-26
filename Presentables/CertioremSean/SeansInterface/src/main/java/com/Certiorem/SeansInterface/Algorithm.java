//package com.Certiorem.SeansInterface;
//
//import net.sf.javaanpr.imageanalysis.CarSnapshot;
//import net.sf.javaanpr.intelligence.Intelligence;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import org.xml.sax.SAXException;
//
//import javax.xml.parsers.ParserConfigurationException;
//import java.io.IOException;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//
//@Component
//public class Algorithm {
//
//    Intelligence intelligence;
//
//    {
//        try {
//            intelligence = new Intelligence();
//        } catch (ParserConfigurationException e) {
//            e.printStackTrace();
//        } catch (SAXException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//    int picCounter = 1;
//
//    @Scheduled(fixedRate = 2000)
//    public void runAlgorithm() {
//        try {
//            String path = "G:\\ICT Sem 3\\group1_parkingapp\\Presentables\\CertioremSean\\" +
//                    "SeansInterface\\src\\main\\resources\\pics\\test" + picCounter + ".jpg";
//            CarSnapshot snapshot = new CarSnapshot(path);
//            String plate = intelligence.recognize(snapshot);
//            picCounter++;
//            System.err.println(plate);
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//    }
//}