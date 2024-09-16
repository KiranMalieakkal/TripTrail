package com.kiran.triptrail.trip.model;

import java.util.List;

public record UserDto(String userName, long id, List<TripDto> trips) {
    public static UserDto fromUser(User user) {
        List<TripDto> tripDtos = user.getTrips().stream()
                .map(trip -> TripDto.fromTrip(trip)).toList();
        return new UserDto(
                user.getUserName(),
                user.getId(),
                tripDtos
        );
    }
}
