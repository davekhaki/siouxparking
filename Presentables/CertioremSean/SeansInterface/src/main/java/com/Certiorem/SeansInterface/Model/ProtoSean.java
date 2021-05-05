package com.Certiorem.SeansInterface.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.Date;

@Entity (name = "ParkingInfo")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProtoSean {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY )
    private Long id;

    private String numberPlate;

    private String visitor;

    private String phnNumber;

    private String hostEmail;

    private int arrived;

    @Temporal(TemporalType.TIMESTAMP) //TIMESTAMP == date + time
    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    private Date expectedAt;

}
