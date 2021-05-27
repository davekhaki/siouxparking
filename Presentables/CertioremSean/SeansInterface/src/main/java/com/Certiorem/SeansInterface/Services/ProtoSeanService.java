package com.Certiorem.SeansInterface.Services;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.Certiorem.SeansInterface.Repository.ProtoSeanRepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
@Service
public class ProtoSeanService {

    @Autowired
    ProtoSeanRepo protoSeanRepo;


    public ProtoSean submitProtoSeanToDb(ProtoSean protoSean){
        return protoSeanRepo.save(protoSean);
    }

    public List<ProtoSean> getAllRecordsFromDb(){
        List<ProtoSean> recordList = protoSeanRepo.findAll();
        return recordList;
    }

    public ProtoSean getRecordById(Long id){
        return protoSeanRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("user with id "+id+" doesnt exist"));
    }
}
