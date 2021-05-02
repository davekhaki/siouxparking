package com.Certiorem.SeansInterface.Controller;

import com.Certiorem.SeansInterface.Model.EmailConfig;
import com.Certiorem.SeansInterface.Model.EmailTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.bind.ValidationException;

@RestController
@RequestMapping("/feedback")
public class EmailController {

    private EmailConfig emailConfig;

    public EmailController(EmailConfig emailConfig){
        this.emailConfig = emailConfig;
    }

    @PostMapping
    public void sendEmail(@RequestBody EmailTemplate emailTemplate
    , BindingResult bindingResult) throws ValidationException {

        if(bindingResult.hasErrors()){
            throw new ValidationException("Email is not valid");
        }

        //Create a mail sender
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(this.emailConfig.getHost());
        mailSender.setPort(this.emailConfig.getPort());
        mailSender.setUsername(this.emailConfig.getUsername());
        mailSender.setPassword(this.emailConfig.getPassword());

        //Create an email instance
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(emailTemplate.getEmail());
        mailMessage.setTo("cankonedelchev@gmail.com");
        mailMessage.setSubject(emailTemplate.getName() + " has arrived");
        mailMessage.setText(emailTemplate.getContent());

        //Send mail
        mailSender.send(mailMessage);
    }
}
