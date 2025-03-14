package com.workout.utils;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeFormater {

    public static String formatDateTime(LocalDateTime dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy, EEEE, h:mm a");
        return dateTime.format(formatter);
    }
}
