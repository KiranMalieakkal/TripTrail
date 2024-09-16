package com.kiran.triptrail.trip.model;

import com.kiran.triptrail.country.model.Country;

public record ForumDto(long countryId,
                       String userName,
                       long tripId,
                       String places ,
                       String countryName,
                       String startDate,
                       long duration ,
                       long budget ,
                       String journalEntry,
                       String travelTips,
                       String image) {
    public static ForumDto fromTrip(Trip trip) {
        Country country = trip.getCountry();
        User user = trip.getUser();
        return new ForumDto(
                country.getCountryId(),
                user.getUserName(),
                trip.getTripId(),
                trip.getPlaces(),
                country.getCountryName(),
                trip.getStartDate(),
                trip.getDuration(),
                trip.getBudget(),
                trip.getJournalEntry(),
                trip.getTravelTips(),
                country.getCountryFlagUrl()
        );
    }
}