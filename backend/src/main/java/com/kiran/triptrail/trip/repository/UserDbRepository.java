package com.kiran.triptrail.trip.repository;

import com.kiran.triptrail.trip.model.User;
import org.springframework.data.repository.ListCrudRepository;

public interface UserDbRepository extends ListCrudRepository<User, String> {
}
