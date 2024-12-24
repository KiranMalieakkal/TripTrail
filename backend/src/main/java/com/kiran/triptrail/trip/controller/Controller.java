package com.kiran.triptrail.trip.controller;

import com.kiran.triptrail.trip.model.*;
import com.kiran.triptrail.trip.service.TripService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("${api.base-path}${api.controllers.users}")
public class Controller {
    @Value("${api.base-path}${api.controllers.users}/")
    public String API_CONTEXT_ROOT;

    private final TripService service;

    public Controller(TripService service) {
        this.service = service;
    }

    @GetMapping("/{userName}")
    public ResponseEntity<UserDto> getUserByUserName(@PathVariable String userName) {
        User user = service.getUserByUserName(userName);
        return ResponseEntity.ok(UserDto.fromUser(user));
    }

    @GetMapping("/{userName}/trips")
    public ResponseEntity<List<TripDto>> getTripsByUserName(@PathVariable String userName) {
        User user = service.getUserByUserName(userName);
        List<TripDto> tripDtos = user.getTrips().stream()
                .map(trip -> TripDto.fromTrip(trip)).toList();
        return ResponseEntity.ok(tripDtos);
    }

    @GetMapping("/forum")
    public ResponseEntity<List<ForumDto>> getAllTripsForForum() {
        List<Trip> trips = service.getAllTrips();
        List<ForumDto> forumDtos = trips.stream()
                .map(trip -> ForumDto.fromTrip(trip)).toList();
        return ResponseEntity.ok(forumDtos);
    }

    @GetMapping("/trips")
    public ResponseEntity<List<TripDto>> getAllTrips() {
        List<Trip> trips = service.getAllTrips();
        List<TripDto> tripDtos = trips.stream()
                .map(trip -> TripDto.fromTrip(trip)).toList();
        return ResponseEntity.ok(tripDtos);
    }

    @GetMapping("/{userName}/trips/{tripId}")
    public ResponseEntity<TripDto> getTripsById(@PathVariable long tripId) {
        Trip trip = service.getTripById(tripId);
        return ResponseEntity.ok(TripDto.fromTrip(trip));
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser() {
        User user = service.createUser();
        UserDto dto = UserDto.fromUser(user);
        return ResponseEntity.created(URI.create(API_CONTEXT_ROOT + user.getUserName())).body(dto);
    }

    @PostMapping("/{userName}/trips")
    public ResponseEntity<UserDto> addTripToUser(@PathVariable String userName,
                                                 @RequestBody AddTripDto tripDto) {

        User user = service.addTripToUser(userName,
                tripDto.countryName(),
                tripDto.places(),
                tripDto.startDate(),
                tripDto.duration(),
                tripDto.budget(),
                tripDto.travelTips(),
                tripDto.journalEntry());
        UserDto dto = UserDto.fromUser(user);
        return ResponseEntity.accepted().body(dto);
    }


    @DeleteMapping("/{username}/trips/{tripId}")
    public ResponseEntity<Void> deleteTrip(@PathVariable long tripId) {
        service.deleteTrip(tripId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{username}/trips/{tripId}")
    public ResponseEntity<TripDto> addTripToUser(@PathVariable long tripId,
                                                 @RequestBody AddTripDto tripDto) {
        System.out.println("tripId = " + tripDto);
        Trip trip = service.updateTrip(tripId, tripDto);
        TripDto dto = TripDto.fromTrip(trip);
        return ResponseEntity.accepted().body(dto);
    }

//    @GetMapping()
//    public String getUserByUserName() {
//        return "Logged In";
//    }

}

