package com.kiran.triptrail.trip.model;

import com.kiran.triptrail.country.model.Country;
import jakarta.persistence.*;

@Entity
@Table(name = "trips")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripId;

    @Column(columnDefinition = "TEXT")
    private String places;

    @Column
    private String startDate;

    @Column
    private Long duration;

    @Column
    private Long budget;

    @Column(columnDefinition = "TEXT")
    private String travelTips;

    @Column(columnDefinition = "TEXT")
    private String journalEntry;


    @ManyToOne(optional = false)
    @JoinColumn(name = "owner_id")
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "country_id")
    private Country country;

    public Trip() {
    }

    public Trip(String places, String startDate, Long duration, Long budget, String travelTips, String journalEntry, User user, Country country) {
        this.places = places;
        this.startDate = startDate;
        this.duration = duration;
        this.budget = budget;
        this.travelTips = travelTips;
        this.journalEntry = journalEntry;
        this.user = user;
        this.country = country;
    }

    public String getPlaces() {
        return places;
    }

    public void setPlaces(String places) {
        this.places = places;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public Long getBudget() {
        return budget;
    }

    public void setBudget(Long budget) {
        this.budget = budget;
    }

    public String getTravelTips() {
        return travelTips;
    }

    public void setTravelTips(String travelTips) {
        this.travelTips = travelTips;
    }

    public String getJournalEntry() {
        return journalEntry;
    }

    public void setJournalEntry(String journalEntry) {
        this.journalEntry = journalEntry;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
    public Long getTripId() {
        return tripId;
    }
}
