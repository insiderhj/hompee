package com.practice.hompee.domain.repository;

import com.practice.hompee.domain.model.Member;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface MemberRepository extends CrudRepository<Member, Long> {

    Member findByEmail(String email);

    @Modifying
    @Transactional
    @Query(value="update members set password = :password where email = :email", nativeQuery = true)
    void updatePassword(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Transactional
    @Query(value="update members set name = :name where email = :email", nativeQuery = true)
    void updateName(@Param("email") String email, @Param("name") String name);

    @Modifying
    @Transactional
    @Query(value="update members set phone_number = :phoneNumber where email = :email", nativeQuery = true)
    void updatePhoneNumber(@Param("email") String email, @Param("phoneNumber") String phoneNumber);

    @Modifying
    @Transactional
    @Query(value="update members set first_address = :address where email = :email", nativeQuery = true)
    void updateFirstAddress(@Param("email") String email, @Param("address") String address);

    @Modifying
    @Transactional
    @Query(value="update members set second_address = :address where email = :email", nativeQuery = true)
    void updateSecondAddress(@Param("email") String email, @Param("address") String address);

    @Transactional
    long deleteByEmail(String email);
}
