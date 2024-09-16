package com.kiran.triptrail.trip.model;

import com.kiran.triptrail.country.model.Country;

public record AddTripDto(String countryName,
                         String places,
                         String startDate,
                         long duration,
                         long budget,
                         String travelTips,
                         String journalEntry) {
}
