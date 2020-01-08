package com.practice.hompee.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
public class MailConfirmService {

    @Autowired
    private JavaMailSender mailSender;

    public String getConfirmKey() {
        Random rand = new Random();
        StringBuffer sb = new StringBuffer();
        int num = 0;
        do {
            num = rand.nextInt(43) + 48;
            if (num >= 48 && num < 57 || num >= 65 && num <= 90) sb.append((char) num);
        } while (sb.length() < 6);

        return sb.toString();
    }

    public int sendConfirmMail(String email, String key) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

        messageHelper.setSubject("[hompee] 인증번호");
        messageHelper.setTo(email);
        messageHelper.setText("아래 인증번호를 입력해주세요.\n" + key);

        mailSender.send(message);
        return 0;
    }
}
