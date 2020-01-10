package com.practice.hompee.domain.role;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {
    MEMBER("ROLE_MEMBER");

    private String value;
}
