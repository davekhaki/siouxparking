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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumberPlate() {
        return numberPlate;
    }

    public void setNumberPlate(String numberPlate) {
        this.numberPlate = numberPlate;
    }

    public String getVisitor() {
        return visitor;
    }

    public void setVisitor(String visitor) {
        this.visitor = visitor;
    }

    public String getPhnNumber() {
        return phnNumber;
    }

    public void setPhnNumber(String phnNumber) {
        this.phnNumber = phnNumber;
    }

    @Override
    public String toString() {
        return "ProtoSean{" +
                "id=" + id +
                ", numberPlate='" + numberPlate + '\'' +
                ", visitor='" + visitor + '\'' +
                ", phnNumber='" + phnNumber + '\'' +
                '}';
    }
}
