package com.Certiorem.SeansInterface.Messaging;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class SmsMessage implements MessageInterface {

    // Find your Account Sid and Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = "AC73aeb402876dfa8bc21f2fb4b14d42b3";
    public static final String AUTH_TOKEN = "dcc069ad0c735e248eed50e19b9d37ec";
    public static final String SENDER="+12408235422";   //my trial number from twilio

    public void sendMessage(String receiver,String spot) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                new com.twilio.type.PhoneNumber(receiver),
                new com.twilio.type.PhoneNumber(SmsMessage.SENDER),
                "Your parkingSpot code is "+spot)
                .create();

        System.out.println(message.getSid());
    }
}
