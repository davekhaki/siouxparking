package com.Certiorem.SeansInterface.Controller;

import com.Certiorem.SeansInterface.Exception.ProtoSeanException;
import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.Certiorem.SeansInterface.Repository.ProtoSeanRepo;
import com.Certiorem.SeansInterface.Service.ProtoSeanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/parking")
public class ProtoSeanController {

    @Autowired
    private ProtoSeanRepo protoSeanRepo;

    @Autowired
    private ProtoSeanService protoSeanService;

    // Get all records
    @GetMapping("/records")
    public ArrayList<ProtoSean> getAllRecords(){
        return protoSeanService.retrieveRecordsFromDB();
    }

    // Add the records
    @PostMapping("/records")
    public ProtoSean createRecords(@RequestBody ProtoSean protoSean){
        return protoSeanService.createVisitors(protoSean);
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
