/*
package com.Certiorem.SeansInterface.Controller;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.*;


class ProtoSeanControllerTest {


    @Test
    public void getAllRecords() throws Exception{
        String uri = "/records";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        ProtoSean[] protoSeansList = super.mapFromJson(content, ProtoSean[].class);
        assertTrue(protoSeansList.length > 0);

    }

    @Test
    void createRecords() {
        String uri = "/records";
        ProtoSean protoSean = new ProtoSean();
        protoSean.setId(1);
        protoSean.setVisitor("Nana");
        protoSean.setNumberPlate("123KLM");
        protoSean.setPhnNumber("065489654");
        protoSean.setHostEmail("email@email.com");
        protoSean.setArrived(1);
        protoSean.setHostNotified(0);
        protoSean.setHasWhatsApp(1);
        protoSean.setExpectedAt("2021-08-16");

        String inputJson = super.mapToJson(product);
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(201, status);
        String content = mvcResult.getResponse().getContentAsString();
        assertEquals(content, "Product is created successfully");
    }

}*/
