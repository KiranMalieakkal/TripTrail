package com.kiran.triptrail.trip.repository;

import com.kiran.triptrail.trip.model.Trip;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TripRepository {
    private final TripDbRepository repo;

    public TripRepository(TripDbRepository repo) {
        this.repo = repo;
    }

    public void deleteTrip(long tripId) {
        repo.deleteById(tripId);
    }

    public Trip findById(long tripId) {
        return repo.findById(tripId).orElseThrow();
    }

    public Trip saveTrip(Trip trip) {
        return repo.save(trip);
    }

    public List<Trip> findAll() {
        return repo.findAll();
    }
}
