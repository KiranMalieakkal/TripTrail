package com.kiran.triptrail.trip.repository;

import com.kiran.triptrail.trip.model.User;
import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;

public interface UserDbRepository extends ListCrudRepository<User, Long> {

    User findByUserName(String username);
}
