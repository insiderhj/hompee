package com.practice.hompee;

import com.practice.hompee.domain.model.Member;
import com.practice.hompee.service.MemberService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MemberServiceTests {

    @Autowired
    MemberService memberService;

    @Test
    public void emailExistsTest() {
        memberService.emailExists("test@test.com");
    }

    @Test
    public void addMemberTest() {
        Member member = new Member("test@test.com",
                "testpassword",
                "testUser",
                "01012345678",
                "12345",
                "testAddress",
                "23456",
                "testAddress2");
        System.out.println("addMember complete: " + member.toString());
    }

    @Test
    public void getMemberTest() {
        System.out.println("member info: " + memberService.getMember("test@test.com").toString());;
    }

    @Test
    public void deleteMemberTest() {
        memberService.deleteMember("test@test.com");
        System.out.println("deleteMember complete");
    }

    @Test
    public void checkPasswordTest() {
        System.out.println("testpassword result: " + memberService.checkPassword("test@test.com", "testpassword"));
        System.out.println("wrongpassword result: " + memberService.checkPassword("test@test.com", "wrongpassword"));
    }

    @Test
    public void updatePasswordTest() {
        String oldPassword = memberService.getMember("test@test.com").getPassword();
        memberService.updatePassword("test@test.com", "testpassword");
        String newPassword = memberService.getMember("test@test.com").getPassword();

        System.out.println("old password: " + oldPassword);
        System.out.println("new password: " + newPassword);
    }

    @Test
    public void updateNameTest() {
        String oldName = memberService.getMember("test@test.com").getName();
        memberService.updateName("test@test.com", "newName");
        String newName = memberService.getMember("test@test.com").getName();

        System.out.println("old name: " + oldName);
        System.out.println("new name: " + newName);
    }

    @Test
    public void updatePhoneNumberTest() {
        String oldPhoneNumber = memberService.getMember("test@test.com").getPhoneNumber();
        memberService.updatePhoneNumber("test@test.com", "01087654321");
        String newPhoneNumber = memberService.getMember("test@test.com").getPhoneNumber();

        System.out.println("old phone number: " + oldPhoneNumber);
        System.out.println("new phone number: " + newPhoneNumber);
    }

    @Test
    public void updateFirstAddressTest() {
        String oldZipCode = memberService.getMember("test@test.com").getFirstZipCode();
        String oldAddress = memberService.getMember("test@test.com").getFirstAddress();
        memberService.updateFirstAddress("test@test.com", "00001", "newAddress");
        String newZipCode = memberService.getMember("test@test.com").getFirstZipCode();
        String newAddress = memberService.getMember("test@test.com").getFirstAddress();

        System.out.println("old address: " + oldZipCode + " " + oldAddress);
        System.out.println("new address: " + newZipCode + " " + newAddress);
    }

    @Test
    public void updateSecondAddressTest() {
        String oldZipCode = memberService.getMember("test@test.com").getSecondZipCode();
        String oldAddress = memberService.getMember("test@test.com").getSecondAddress();
        memberService.updateSecondAddress("test@test.com", "00002", "newAddress2");
        String newZipCode = memberService.getMember("test@test.com").getSecondZipCode();
        String newAddress = memberService.getMember("test@test.com").getSecondAddress();

        System.out.println("old address: " + oldZipCode + " " + oldAddress);
        System.out.println("new address: " + newZipCode + " " + newAddress);
    }
}
