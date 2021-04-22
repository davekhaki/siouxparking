package com.Certiorem.SeansInterface.Repository;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ProtoSeanRepo extends CrudRepository<ProtoSean, Long> {

    ProtoSean save(ProtoSean protoSean);
    ArrayList<ProtoSean> findAll();



}
