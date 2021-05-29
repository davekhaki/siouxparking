package com.Certiorem.SeansInterface.Controller;

import com.Certiorem.SeansInterface.Exception.ProtoSeanException;
import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.Certiorem.SeansInterface.Repository.ProtoSeanRepo;
import com.Certiorem.SeansInterface.Services.ProtoSeanService;
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
    private ProtoSeanService protoSeanService;

    @Autowired
    private ProtoSeanRepo protoSeanRepo;

    // Get all records
    @GetMapping("/records")
    public List<ProtoSean> getAllRecords() {
            return protoSeanService.getAllRecordsFromDb();
    }

    // Add the records
    @PostMapping("/records")
    public ProtoSean createRecords(@RequestBody ProtoSean protoSean) {

        return protoSeanService.submitProtoSeanToDb(protoSean);
    }

    @GetMapping("/records/keyword/{keyword}")
    public List<ProtoSean> searchRecords(@PathVariable("keyword") String keyword) {

        keyword = keyword.toLowerCase();

        List<ProtoSean> daList = protoSeanRepo.findAll(); //less gooo
        List<ProtoSean> finalList = new ArrayList<>();

        for (ProtoSean record: daList) {
            if(record.getVisitor().toLowerCase().contains(keyword)){
                finalList.add(record);
            }
            else if(record.getNumberPlate().toLowerCase().contains(keyword)){
                finalList.add(record);
            }
            else if(record.getPhnNumber().toLowerCase().contains(keyword)){
                finalList.add(record);
            }else if(record.getHostEmail() != null && record.getHostEmail().toLowerCase().contains(keyword)){
                finalList.add(record);
            }
        }

        return finalList;
    }

    @GetMapping("/records/{keyword}/{selectedDate}")
    public List<ProtoSean> searchRecordsWithDate(@PathVariable("keyword") String keyword, @PathVariable("selectedDate") String selectedDate) {
        keyword = keyword.toLowerCase();

        List<ProtoSean> daList = protoSeanRepo.findAll();
        List<ProtoSean> finalList = new ArrayList<>();

        for (ProtoSean record: daList) {
            if(record.getExpectedAt().toString().contains(selectedDate)) {
                if(keyword.equals("date")) {
                    finalList.add(record);
                }
                else if(record.getVisitor().toLowerCase().contains(keyword)){
                    finalList.add(record);
                }
                else if(record.getNumberPlate().toLowerCase().contains(keyword)){
                    finalList.add(record);
                }
                else if(record.getPhnNumber().toLowerCase().contains(keyword)){
                    finalList.add(record);
                }
            }
        }

        return finalList;
    }

    // Retrieve per ID of the record
    @GetMapping("/records/{id}")
    public ResponseEntity<ProtoSean> getRecordsById(@PathVariable("id") Long id) {
        ProtoSean protoSean = protoSeanRepo.findById(id)
                .orElseThrow(() -> new ProtoSeanException("404: Record with id '" + id + "'Not found "));
        return ResponseEntity.ok(protoSean);
    }

    // Update the information stored
    @PutMapping("/records/{id}")
    public ResponseEntity<ProtoSean> updateRecord(@PathVariable Long id, @RequestBody ProtoSean protoSeanDetails) {
        ProtoSean protoSean = protoSeanRepo.findById(id)
                .orElseThrow(() -> new ProtoSeanException("404: Record with id '" + id + "'Not found "));

        protoSean.setNumberPlate(protoSeanDetails.getNumberPlate());
        protoSean.setVisitor(protoSeanDetails.getVisitor());
        protoSean.setPhnNumber(protoSeanDetails.getPhnNumber());
        protoSean.setHostEmail(protoSeanDetails.getHostEmail());
        protoSean.setExpectedAt(protoSeanDetails.getExpectedAt());
        protoSean.setArrived(protoSeanDetails.getArrived());
        protoSean.setHostNotified(protoSeanDetails.getHostNotified());
        protoSean.setSecretaryNotified(protoSeanDetails.getSecretaryNotified());

        ProtoSean updatedRecord = protoSeanRepo.save(protoSean);
        return ResponseEntity.ok(updatedRecord);
    }

    @PutMapping("/records/notify/{id}")
    public ResponseEntity<ProtoSean> setSecretaryNotified(@PathVariable Long id){
        ProtoSean protoSean = protoSeanRepo.findById(id)
                .orElseThrow(() -> new ProtoSeanException("404: Record with id '" + id + "'Not found "));
        protoSean.setSecretaryNotified(1);
        ProtoSean notified = protoSeanRepo.save(protoSean);
        return  ResponseEntity.ok(notified);
    }

    @DeleteMapping("/records/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteRecord(@PathVariable Long id) {
        ProtoSean protoSean = protoSeanRepo.findById(id)
                .orElseThrow(() -> new ProtoSeanException("404: Record with id '" + id + "'Not found "));

        protoSeanRepo.delete(protoSean);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
