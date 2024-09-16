package com.kiran.triptrail.trip.repository;

import com.kiran.triptrail.trip.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    private final UserDbRepository repo;

    public UserRepository(UserDbRepository repo) {
        this.repo = repo;
    }

    public User getByUserName(String userName) {
        return repo.findById(userName).orElseThrow();
    }

    public User createUser() {
        return repo.save(new User());
    }

    public User saveUser(User user) {
        return repo.save(user);
    }
}
