package com.practice.hompee;

import com.practice.hompee.service.MailConfirmService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.mail.MessagingException;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MailConfirmServiceTests {

    @Autowired
    MailConfirmService mailConfirmService;

    @Test
    public void getConfirmKeyTest() {
        String key = mailConfirmService.getConfirmKey();
        System.out.println("confirm key: " + key);
    }

    @Test
    public void sendConfirmMailTest() throws MessagingException {
        String email = "insiderhj@gmail.com";
        String confirmKey = mailConfirmService.getConfirmKey();

        mailConfirmService.sendConfirmMail(email, confirmKey);
        System.out.println("send mail to " + email + " complete");
        System.out.println("key: " + confirmKey);
    }
}
