package com.Certiorem.SeansInterface.Controller;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.Certiorem.SeansInterface.Repository.ProtoSeanRepo;
import com.Certiorem.SeansInterface.Services.StatusService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.Controller;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import reactor.core.publisher.Flux;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.Duration;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import static java.util.concurrent.CompletableFuture.runAsync;

@RestController
public class StatusController {

    private static final Logger LOGGER = LoggerFactory.getLogger(StatusController.class);

    @Autowired
    ProtoSeanRepo protoSeanRepo;



    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/event/arrived", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<ProtoSean>> getArrived() {

        return Flux.interval(Duration.ofSeconds(1))
                .map(it -> protoSeanRepo.findAll());

    }

}





/////////////////////////////////////////////////////////////////////////////
//    @GetMapping("/event/arrived")
//    @CrossOrigin
//    public SseEmitter streamEvent(){
//        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
//
//        sseEmitter.onCompletion(() -> LOGGER.info("SseEmitter is completed"));
//
//        sseEmitter.onTimeout(() ->LOGGER.info("SseEmitter is timed out"));
//
//        sseEmitter.onError((ex) -> LOGGER.info("SseEmitter got error", ex));
//        try{
//            while(true){
//                runAsync(() ->{
//                    sleep(1,sseEmitter);
//                    pushEventData(sseEmitter);
//                });
//            }
//        }catch(Exception ex){
//            sseEmitter.completeWithError(ex);
//        }
//
//        LOGGER.info("Controller exits");
//        return sseEmitter;
//    }
//
//    private void sleep (int seconds, SseEmitter sseEmitter){
//        try{
//            Thread.sleep( seconds * 1000);
//        }catch(InterruptedException e){
//            e.printStackTrace();
//            sseEmitter.completeWithError(e);
//        }
//    }
//
//    private void pushEventData(SseEmitter sseEmitter){
//        try{
//            LOGGER.info("Pushing event data...");
//            sseEmitter.send(SseEmitter.event().name("Progress").data(protoSeanRepo.findAll(), MediaType.APPLICATION_JSON));
//        }catch (IOException e){
//            LOGGER.error("An error occurred while emitting data.", e);
//        }
//    }

/////////////////////////////////////////////////////////////////////////////
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

