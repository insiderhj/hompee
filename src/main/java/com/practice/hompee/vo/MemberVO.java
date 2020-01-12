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
    private String firstAddress;
    private String firstAddressDetail;
    private String secondAddress;
    private String secondAddressDetail;

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .password(password)
                .name(name)
                .phoneNumber(phoneNumber)
                .firstAddress(firstAddress.equals("") ? null : firstAddress + ' ' + firstAddressDetail)
                .secondAddress(secondAddress.equals("") ? null : secondAddress + ' ' + secondAddressDetail)
                .build();
    }
}
