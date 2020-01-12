package com.practice.hompee.controller;

import com.practice.hompee.domain.model.Member;
import com.practice.hompee.service.MailConfirmService;
import com.practice.hompee.service.MemberService;
import com.practice.hompee.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Controller
public class HompeeController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MailConfirmService mailConfirmService;

    @GetMapping("/")
    public ModelAndView index(HttpServletRequest request) {
        ModelAndView mav = new ModelAndView("index");

        boolean auth = SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ROLE_MEMBER"));
        mav.addObject("auth", auth);

        if (auth) {
            UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            mav.addObject("name", memberService.getMember(userDetails.getUsername()).getName());
        }
        return mav;
    }

    @PostMapping("/sendConfirmCode")
    @ResponseBody
    public String sendConfirmCode(MemberVO memberVO) throws MessagingException {
        String confirmKey = mailConfirmService.getConfirmKey();
        mailConfirmService.sendConfirmMail(memberVO.getEmail(), confirmKey);
        return confirmKey;
    }

    @PostMapping("/emailExists")
    @ResponseBody
    public boolean emailExists(MemberVO memberVO) throws MessagingException {
        return memberService.emailExists(memberVO.getEmail());
    }

    @GetMapping("/signUp")
    public String signUp(@ModelAttribute("memberVO") MemberVO memberVO) {
        return "signUp";
    }

    @PostMapping("/signUp")
    public String doSignUp(@Valid MemberVO memberVO) {
        Member member = memberVO.toEntity();
        memberService.addMember(member);
        return "redirect:/";
    }

    @GetMapping("/forgotPassword")
    public String forgotPassword(@ModelAttribute("memberVO") MemberVO memberVO) {
        return "forgotPassword";
    }

    @PostMapping("/updatePasswordWithEmail")
    public String updatePasswordWithEmail(@Valid MemberVO memberVO) {
        memberService.updatePassword(memberVO.getEmail(), memberVO.getPassword());

        return "redirect:/";
    }

    @GetMapping("/info")
    public ModelAndView info(@ModelAttribute("memberVO") MemberVO memberVO) {
        UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = memberService.getMember(userDetails.getUsername());

        ModelAndView mav = new ModelAndView("info");
        mav.addObject("member", member);
        return mav;
    }

    @PostMapping("/checkPassword")
    @ResponseBody
    public boolean checkPassword(MemberVO memberVO) {
        UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return memberService.checkPassword(userDetails.getUsername(), memberVO.getPassword());
    }

    @PostMapping("/updatePassword")
    @ResponseBody
    public void updatePassword(MemberVO memberVO) {
        UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        memberService.updatePassword(userDetails.getUsername(), memberVO.getPassword());
    }

    @PostMapping("/updateName")
    @ResponseBody
    public void updateName(MemberVO memberVO) {
        memberService.updateName(memberVO.getEmail(), memberVO.getName());
    }

    @PostMapping("/updatePhoneNumber")
    @ResponseBody
    public void updatePhoneNumber(MemberVO memberVO) {
        memberService.updatePhoneNumber(memberVO.getEmail(), memberVO.getPhoneNumber());
    }

    @PostMapping("/updateFirstAddress")
    @ResponseBody
    public void updateFirstAddress(MemberVO memberVO) {
        String address = memberVO.getFirstAddress();
        if (address.equals("")) address = null;
        memberService.updateFirstAddress(memberVO.getEmail(), address);
    }

    @GetMapping("/closeAccount")
    public String closeAccount() {
        UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        memberService.deleteMember(userDetails.getUsername());

        SecurityContextHolder.clearContext();

        return "redirect:/";
    }

    @GetMapping("/addressPopup")
    public String addressPopup() {
        return "addressPopup";
    }
}
