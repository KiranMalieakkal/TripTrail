package com.kiran.triptrail.country.model;


import com.kiran.triptrail.trip.model.Trip;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="countries")
public class Country {

    @Id
    @Column(name = "country_id")
    private Long countryId;

    @Column(name = "country_name", nullable = false)
    private String countryName;


    @Column(name = "countryFlag_url", nullable = false)
    private String countryFlagUrl;

    @OneToMany(mappedBy ="country", cascade = CascadeType.REMOVE)
    private List<Trip> trips;

    public Country(Long countryId, String name, String countryFlagUrl) {
        this.countryId = countryId;
        this.countryName = countryName;
        this.countryFlagUrl = countryFlagUrl;
    }


    public Country() {

    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public String getCountryFlagUrl() {
        return countryFlagUrl;
    }

    public void setCountryFlagUrl(String countryFlagUrl) {
        this.countryFlagUrl = countryFlagUrl;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setName(String CountryName) {
        this.countryName = countryName;
    }

}

