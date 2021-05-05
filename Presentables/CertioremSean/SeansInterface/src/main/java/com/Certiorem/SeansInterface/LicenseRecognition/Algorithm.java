package com.Certiorem.SeansInterface.LicenseRecognition;

import com.Certiorem.SeansInterface.Exception.ProtoSeanException;
import com.Certiorem.SeansInterface.LicenseRecognition.VideoCapture;
import com.Certiorem.SeansInterface.Messaging.MessageInterface;
import com.Certiorem.SeansInterface.Messaging.SmsMessage;
import com.Certiorem.SeansInterface.Messaging.WapMessage;
import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.Certiorem.SeansInterface.Repository.ProtoSeanRepo;
import net.sf.javaanpr.imageanalysis.CarSnapshot;
import net.sf.javaanpr.intelligence.Intelligence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@EnableScheduling
@Component
public class Algorithm {
    //should be false for production
    boolean finishedLoadingVideo = true;
    int picCounter = 1;
    MessageInterface messageInterface;
    Intelligence intelligence;
    @Autowired
    private ProtoSeanRepo protoSeanRepo;

    {
        try {
            intelligence = new Intelligence();
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    @Scheduled(fixedDelay = Long.MAX_VALUE)
//    public void loadVideo() {
//        String mp4Path = "../CertioremSean/SeansInterface/src/main/resources/vids/anprVideo.mp4";
//        //String mp4Path="G:\\ICT Sem 3\\group1_parkingapp\\Presentables\\CertioremSean\\SeansInterface\\src\\main\\resources\\vids\\anprVideo.mp4";
//        //String imagePath="G:\\ICT Sem 3\\group1_parkingapp\\Presentables\\CertioremSean\\SeansInterface\\src\\main\\resources\\picsFromVideo";
//        String imagePath = "../CertioremSean/SeansInterface/src/main/resources/picsFromVideo";
//        try {
//            finishedLoadingVideo = VideoCapture.convertMovieToJPG(mp4Path, imagePath, "jpg");
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    @Scheduled(fixedDelay = 2000)
    public void recognizeLoadedPics() {
        if (finishedLoadingVideo) {
            try {
                String path = "..\\CertioremSean\\" +
                        "SeansInterface\\src\\main\\resources\\picsFromVideo\\" + picCounter + ".jpg";
                Path formattedPath = Paths.get(path);
                boolean fileExists = Files.exists(formattedPath);
                if (fileExists) {
                    CarSnapshot snapshot = new CarSnapshot(path);
                    String plate = intelligence.recognize(snapshot);
                    picCounter++;
                    if (plate != null) {
                        //plate recognized
                        System.err.println(plate);
                        ProtoSean visitor = protoSeanRepo.findByNumberPlate(plate);

                        if (visitor != null) {
                            System.err.println("visitor found by plate " + plate);

                            String phoneNumber = visitor.getPhnNumber();
                            Date expectedAt = visitor.getExpectedAt();
                            String date = expectedAt.toString().substring(0, 10);
                            String hour = expectedAt.toString().substring(11);
                            if (visitor.getHasWhatsApp() == 1) {
                                messageInterface = new WapMessage();

                            } else {
                                messageInterface = new SmsMessage();

                            }
//                            if(visitor.getArrived()==0) {
//                                System.err.println("Sending message to "+phoneNumber);
//                                messageInterface.sendMessage(phoneNumber, date, hour);
//                            }
//                            else{
//                                System.err.println("vistor already here, not sending message");
//                            }

                            visitor.setArrived(1);
                            protoSeanRepo.save(visitor);

                        } else {
                            System.err.println("visitor not found by plate " + plate);
                        }


                    } else {
                        //plate not recognized
                        System.err.println("Plate from pic " + picCounter + " is null");
                    }
                } else {
                    System.err.println("File " + picCounter + " does not exist");
                }

            } catch (IOException e) {
                e.printStackTrace();

            }
        } else System.out.println("Video not finished loading");
    }


//    @Scheduled(fixedDelay = 2000)
//    public void runAlgorithm() {
//        try {
//            String path = "..\\CertioremSean\\" +
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
}