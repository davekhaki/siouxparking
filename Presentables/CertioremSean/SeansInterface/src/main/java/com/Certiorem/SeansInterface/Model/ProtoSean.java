package com.Certiorem.SeansInterface.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;

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

}
