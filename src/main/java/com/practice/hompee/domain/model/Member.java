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

    @Column(name="address1")
    private String address1;

    @Column(name="address2")
    private String address2;

    @CreationTimestamp
    @Column(name="createTime")
    private Timestamp createTime;

    @UpdateTimestamp
    @Column(name="updateTime")
    private Timestamp updateTime;

    @Builder
    public Member(String email, String password, String name, String phoneNumber, String address1, String address2) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address1=address1;
        this.address2=address2;
    }
}
