package com.kiran.triptrail.trip.service;

import com.kiran.triptrail.country.model.Country;
import com.kiran.triptrail.country.repository.CountryRepository;
import com.kiran.triptrail.trip.model.AddTripDto;
import com.kiran.triptrail.trip.model.Trip;
import com.kiran.triptrail.trip.model.TripDto;
import com.kiran.triptrail.trip.model.User;
import com.kiran.triptrail.trip.repository.TripRepository;
import com.kiran.triptrail.trip.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {

    private final CountryRepository countryRepository;
    private final UserRepository userRepository;
    private final TripRepository tripRepository;

    public TripService(CountryRepository countryRepository, UserRepository userRepository, TripRepository tripRepository) {
        this.countryRepository = countryRepository;
        this.userRepository = userRepository;
        this.tripRepository= tripRepository;
    }


    public User getUserByUserName(String userName) {
        return userRepository.getByUserName(userName);
    }

    public User createUser() {
        return userRepository.createUser();
    }

    public User addTripToUser(String userName, String countryName, String places, String startDate, long duration, long budget, String travelTips, String journalEntry) {
        User user = userRepository.getByUserName(userName);
        if (user == null) {
            throw new IllegalArgumentException();
        }
        Country country = countryRepository.getByCountryName(countryName);
        if (country == null) {
            throw new IllegalArgumentException();
        }
        user.addTrip(country,places,startDate,duration,budget,travelTips,journalEntry);
        return userRepository.saveUser(user);
    }

    public void deleteTrip(long tripId) {
        tripRepository.deleteTrip(tripId);
    }

    public Trip updateTrip(long tripId, AddTripDto tripDto) {
        Trip trip = tripRepository.findById(tripId);
        Country country = countryRepository.getByCountryName(tripDto.countryName());
        trip.setPlaces(tripDto.places());
        trip.setStartDate(tripDto.startDate());
        trip.setDuration(tripDto.duration());
        trip.setBudget(tripDto.budget());
        trip.setJournalEntry(tripDto.journalEntry());
        trip.setTravelTips(tripDto.travelTips());
        trip.setCountry(country);
        return tripRepository.saveTrip(trip);
    }

    public Trip getTripById(long tripId) {
        return tripRepository.findById(tripId);
    }

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }
}

