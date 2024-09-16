package com.kiran.triptrail.country.repository;

import com.kiran.triptrail.country.model.Country;
import com.kiran.triptrail.trip.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class CountryRepository {
    private final JpaCountryRepository repo;

    public CountryRepository(JpaCountryRepository repo) {
        this.repo = repo;
    }

    public Country getByCountryName(String countryName) {
        return repo.getCountryByCountryName(countryName);
    }
}
