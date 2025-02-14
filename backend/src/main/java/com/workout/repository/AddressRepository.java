package com.workout.repository;

import com.workout.model.ecommerce.Cart;
import com.workout.model.userdetails.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
