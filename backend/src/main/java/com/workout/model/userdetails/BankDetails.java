package com.workout.model.userdetails;

import jakarta.persistence.*;
import lombok.*;

import java.time.YearMonth;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BankDetails {
    private String accountNumber;
    private String accountHolderName;
    private String bankName;
}
