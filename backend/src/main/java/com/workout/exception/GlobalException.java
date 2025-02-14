package com.workout.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetail> userExceptionHandler(UserException ue, WebRequest request) {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setError(ue.getMessage());
        errorDetail.setMessage(request.getDescription(false));
        errorDetail.setLocalDateTime(LocalDateTime.now());
        return new ResponseEntity<>(errorDetail, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WorkoutException.class)
    public ResponseEntity<ErrorDetail> userExceptionHandler(WorkoutException we, WebRequest request) {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setError(we.getMessage());
        errorDetail.setMessage(request.getDescription(false));
        errorDetail.setLocalDateTime(LocalDateTime.now());
        return new ResponseEntity<>(errorDetail, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProductException.class)
    public ResponseEntity<ErrorDetail> userExceptionHandler(ProductException pe, WebRequest request) {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setError(pe.getMessage());
        errorDetail.setMessage(request.getDescription(false));
        errorDetail.setLocalDateTime(LocalDateTime.now());
        return new ResponseEntity<>(errorDetail, HttpStatus.BAD_REQUEST);
    }
}
