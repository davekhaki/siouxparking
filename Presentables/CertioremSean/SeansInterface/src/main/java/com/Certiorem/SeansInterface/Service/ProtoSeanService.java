package com.Certiorem.SeansInterface.Service;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.Certiorem.SeansInterface.Repository.ProtoSeanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ProtoSeanService {

    @Autowired
    ProtoSeanRepo protoSeanRepo;

    public ProtoSean createVisitors (ProtoSean protoSean){
        return protoSeanRepo.save(protoSean);

    }

    public ArrayList<ProtoSean> retrieveRecordsFromDB(){
        ArrayList<ProtoSean> protoSeanArrayList= protoSeanRepo.findAll();

        return protoSeanArrayList;
    }

}
