package com.Certiorem.SeansInterface.Controller;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.Certiorem.SeansInterface.Repository.ProtoSeanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

@RestController
public class StatusController {

    @Autowired
    ProtoSeanRepo protoSeanRepo;

//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping(value = "/event/arrived", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    public Flux<ProtoSean> getArrived() {
//        int i = 28;
//        long l = i;
//        var date = new Date();
//        date.setDate(date.getDate() + 1);
//
//        return Flux.interval(Duration.ofSeconds(5))
//                .map(it -> protoSeanRepo.findByNumberPlate("43YLN"));
//
//    }

//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping(value = "/event/arrived", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    @Scheduled(fixedDelay = 8000)
//    public ProtoSean sendArrivedEvent() {
//
//        ProtoSean protoSean = protoSeanRepo.findByNumberPlate("43YLN");
//
//        return protoSean;
//    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/event/arrived", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<ProtoSean>> getArrived() {

        return Flux.interval(Duration.ofSeconds(5))
                .map(it -> protoSeanRepo.findAll());

    }
}