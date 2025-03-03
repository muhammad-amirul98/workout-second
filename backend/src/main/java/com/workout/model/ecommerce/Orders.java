//package com.workout.model.ecommerce;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.workout.model.userdetails.User;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.util.HashSet;
//import java.util.Set;
//
//@Entity
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//public class Orders {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
//
//    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
//    private Set<Order> orders = new HashSet<>();
//
//    @OneToOne
//    @JoinColumn(name = "user_id", nullable = false, unique = true)
//    @JsonBackReference
//    private User user;
//}
