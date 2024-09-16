package com.kiran.triptrail.trip.model;

import com.kiran.triptrail.country.model.Country;
import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "owner")
public class User {

    @Id
    @Column(name = "userName")
    private String userName;

    @Column
    private Long id;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.MERGE, CascadeType.REMOVE})
    private List<Trip> trips;

    public User() {
        this.trips = new ArrayList<>();
    }

    public User(String userName, Long id, List<Trip> trips) {
        this.userName = userName;
        this.id = id;
        this.trips = trips;
    }

    public String getUserName() {
        return userName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Trip> getTrips() {
        return trips;
    }

    public void addTrip(Country country,
                        String places,
                        String startDate,
                        long duration,
                        long budget,
                        String travelTips,
                        String journalEntry) {
        Trip trip = new Trip(places, startDate, duration, budget, travelTips, journalEntry, this, country);
        trips.add(trip);
    }

}
