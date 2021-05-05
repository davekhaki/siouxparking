package com.Certiorem.SeansInterface.Controller;

import com.Certiorem.SeansInterface.Exception.ProtoSeanException;
import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.Certiorem.SeansInterface.Repository.ProtoSeanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/parking")
public class ProtoSeanController {



    @Autowired
    private ProtoSeanRepo protoSeanRepo;

    // Get all records
    @GetMapping("/records")
    public List<ProtoSean> getAllRecords(String keyword, String type){
        ProtoSean protoSean = new ProtoSean();
//        ExampleMatcher matching = ExampleMatcher.matching();
//
//        if ("1".equals(type)) {
//            protoSean.setVisitor(keyword);
//            matching = matching.withMatcher("visitor", ExampleMatcher.GenericPropertyMatchers.contains());
//        } else if ("2".equals(type)) {
//            protoSean.setNumberPlate(keyword);
//            matching = matching.withMatcher("numberPlate", ExampleMatcher.GenericPropertyMatchers.contains());
//        } else if ("3".equals(type)) {
//            protoSean.setPhnNumber(keyword);
//            matching = matching.withMatcher("phnNumber", ExampleMatcher.GenericPropertyMatchers.contains());
//        }
//
//
//        Example<ProtoSean> example = Example.of(protoSean, matching);
//        return protoSeanRepo.findAll(example);
        return protoSeanRepo.findAll();
    }

    // Add the records
    @PostMapping("/records")
    public ProtoSean createRecords(@RequestBody ProtoSean protoSean){
        return protoSeanRepo.save(protoSean);
    }

    // Retrieve per ID of the record
    @GetMapping("/records/{id}")
    public ResponseEntity<ProtoSean>  getRecordsById(@PathVariable("id") Long id){
        ProtoSean protoSean = protoSeanRepo.findById(id)
                .orElseThrow(() -> new ProtoSeanException("404: Record with id '"+id+"'Not found "));
        return ResponseEntity.ok(protoSean);
    }

    // Update the information stored
    @PutMapping("/records/{id}")
    public ResponseEntity<ProtoSean> updateRecord(@PathVariable Long id, @RequestBody ProtoSean protoSeanDetails){
        ProtoSean protoSean = protoSeanRepo.findById(id)
                .orElseThrow(() -> new ProtoSeanException("404: Record with id '"+id+"'Not found "));

        protoSean.setNumberPlate(protoSeanDetails.getNumberPlate());
        protoSean.setVisitor(protoSeanDetails.getVisitor());
        protoSean.setPhnNumber(protoSeanDetails.getPhnNumber());
        protoSean.setHostEmail(protoSeanDetails.getHostEmail());
        protoSean.setExpectedAt(protoSeanDetails.getExpectedAt());


        ProtoSean updatedRecord = protoSeanRepo.save(protoSean);
        return ResponseEntity.ok(updatedRecord);
    }

    @DeleteMapping("/records/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteRecord(@PathVariable Long id){
        ProtoSean protoSean = protoSeanRepo.findById(id)
                .orElseThrow(() -> new ProtoSeanException("404: Record with id '"+id+"'Not found "));

        protoSeanRepo.delete(protoSean);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
