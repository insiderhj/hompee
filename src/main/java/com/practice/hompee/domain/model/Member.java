package com.practice.hompee.domain.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Entity
@Table(name="members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @NotNull
    @Column(name="email")
    private String email;

    @NotNull
    @Column(name="password")
    private String password;

    @NotNull
    @Column(name="name")
    private String name;

    @NotNull
    @Column(name="phoneNumber")
    private String phoneNumber;

    @Column(name="firstAddress")
    private String firstAddress;

    @Column(name="secondAddress")
    private String secondAddress;

    @CreationTimestamp
    @Column(name="createTime")
    private Timestamp createTime;

    @UpdateTimestamp
    @Column(name="updateTime")
    private Timestamp updateTime;

    @Builder
    public Member(String email, String password, String name, String phoneNumber, String firstAddress, String secondAddress) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.firstAddress = firstAddress;
        this.secondAddress = secondAddress;
    }
}
