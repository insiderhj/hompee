package com.practice.hompee.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Aspect
public class RequestLoggingAspect {
    private Logger logger = LoggerFactory.getLogger(RequestLoggingAspect.class);
    SimpleDateFormat dateFormat = new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss");

    @Pointcut("within(com.practice.hompee.controller..*)")
    public void onRequest() {}

    @Around("com.practice.hompee.aspect.RequestLoggingAspect.onRequest()")
    public Object doLogging(ProceedingJoinPoint pjp) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        HttpServletResponse response = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getResponse();

        String clientIp = request.getHeader("X-FORWARDED-FOR");
        if (clientIp == null)
            clientIp = request.getRemoteAddr();

        Enumeration<String> requestParamNames = request.getParameterNames();
        String requestParams = "{";
        while (requestParamNames.hasMoreElements()) {
            String paramName = requestParamNames.nextElement();
            requestParams += paramName;
            requestParams += ": ";
            if (paramName.contains("password")) {
                requestParams += "PROTECTED";
            } else {
                requestParams += request.getParameterValues(paramName)[0];
            }
            if (requestParamNames.hasMoreElements()) requestParams += ", ";
        }
        requestParams += "}";

        assert response != null;

        long startTime = System.currentTimeMillis();
        Object result = pjp.proceed();
        long endTime = System.currentTimeMillis();

        logger.info("[" + clientIp + "] request: {method: " + request.getMethod() + ", URI: " + request.getRequestURI() + ", parameters: " + requestParams
                + "}, response: {status: " + response.getStatus() + "} / " + (endTime - startTime) + "ms");
        return result;
    }
}
