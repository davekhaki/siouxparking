package com.Certiorem.SeansInterface.Repository;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProtoSeanRepo extends JpaRepository<ProtoSean, Long> {


}
