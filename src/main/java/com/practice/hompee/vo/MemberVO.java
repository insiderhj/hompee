package com.practice.hompee.vo;

import com.practice.hompee.domain.model.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberVO {

    private String email;
    private String password;
    private String name;
    private String phoneNumber;

    private String firstZipCode;
    private String firstAddress;
    private String firstAddressDetail;

    private String secondZipCode;
    private String secondAddress;
    private String secondAddressDetail;

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .password(password)
                .name(name)
                .phoneNumber(phoneNumber)
                .firstZipCode(firstZipCode.equals("") ? null : firstZipCode)
                .firstAddress(firstAddress.equals("") ? null : firstAddress + ' ' + firstAddressDetail)
                .secondZipCode(secondZipCode.equals("") ? null : secondZipCode)
                .secondAddress(secondAddress.equals("") ? null : secondAddress + ' ' + secondAddressDetail)
                .build();
    }
}
