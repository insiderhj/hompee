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

    @Transactional
    long deleteByEmail(String email);
}
