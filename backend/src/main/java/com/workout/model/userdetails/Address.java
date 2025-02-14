package com.workout.model.userdetails;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String street;

    private String city;

    private String country;

    private String zip;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
