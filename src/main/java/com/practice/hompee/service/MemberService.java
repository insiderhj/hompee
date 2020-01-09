package com.practice.hompee.service;

import com.practice.hompee.domain.model.Member;
import com.practice.hompee.domain.repository.MemberRepository;
import com.practice.hompee.domain.role.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MemberService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public boolean emailExists(String email) {
        return memberRepository.findByEmail(email) != null;
    }

    public long addMember(Member member) {
        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        return memberRepository.save(member).getId();
    }

    public Member getMember(String email) {
        return memberRepository.findByEmail(email);
    }

    public void updatePassword(String email, String password) {
        memberRepository.updatePassword(email, bCryptPasswordEncoder.encode(password));
    }

    public void updateName(String email, String name) {
        memberRepository.updateName(email, name);
    }

    public void updatePhoneNumber(String email, String phoneNumber) {
        memberRepository.updatePhoneNumber(email, phoneNumber);
    }

    public void deleteMember(String email) {
        memberRepository.deleteByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(userEmail);
        if (member == null) throw new UsernameNotFoundException(userEmail);

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(Role.MEMBER.getValue()));

        return new User(member.getEmail(), member.getPassword(), authorities);
    }
}
