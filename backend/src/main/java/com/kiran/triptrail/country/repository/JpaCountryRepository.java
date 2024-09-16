package com.kiran.triptrail.country.repository;

import com.kiran.triptrail.country.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface JpaCountryRepository extends ListCrudRepository<Country,Long> {

    Country getCountryByCountryName(String countryName);
}
