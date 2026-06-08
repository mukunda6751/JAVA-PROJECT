package com.travel.entity;

import com.travel.enums.BusType;
import com.travel.enums.Status;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "buses")
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bus_number", nullable = false, unique = true)
    private String busNumber;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    @Column(name = "departure_time", nullable = false)
    private LocalDateTime departureTime;

    @Column(name = "arrival_time", nullable = false)
    private LocalDateTime arrivalTime;

    @Column(name = "total_seats", nullable = false)
    private Integer totalSeats;

    @Column(name = "available_seats", nullable = false)
    private Integer availableSeats;

    @Column(name = "price_per_seat", nullable = false)
    private Double pricePerSeat;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BusType type;

    @Column(name = "operator_name", nullable = false)
    private String operatorName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    public Bus() {}

    public Bus(Long id, String busNumber, String name, String source, String destination, LocalDateTime departureTime, LocalDateTime arrivalTime, Integer totalSeats, Integer availableSeats, Double pricePerSeat, BusType type, String operatorName, Status status) {
        this.id = id;
        this.busNumber = busNumber;
        this.name = name;
        this.source = source;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
        this.pricePerSeat = pricePerSeat;
        this.type = type;
        this.operatorName = operatorName;
        this.status = status;
    }

    public static BusBuilder builder() {
        return new BusBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public LocalDateTime getDepartureTime() { return departureTime; }
    public void setDepartureTime(LocalDateTime departureTime) { this.departureTime = departureTime; }
    public LocalDateTime getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(LocalDateTime arrivalTime) { this.arrivalTime = arrivalTime; }
    public Integer getTotalSeats() { return totalSeats; }
    public void setTotalSeats(Integer totalSeats) { this.totalSeats = totalSeats; }
    public Integer getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(Integer availableSeats) { this.availableSeats = availableSeats; }
    public Double getPricePerSeat() { return pricePerSeat; }
    public void setPricePerSeat(Double pricePerSeat) { this.pricePerSeat = pricePerSeat; }
    public BusType getType() { return type; }
    public void setType(BusType type) { this.type = type; }
    public String getOperatorName() { return operatorName; }
    public void setOperatorName(String operatorName) { this.operatorName = operatorName; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public static class BusBuilder {
        private Long id;
        private String busNumber;
        private String name;
        private String source;
        private String destination;
        private LocalDateTime departureTime;
        private LocalDateTime arrivalTime;
        private Integer totalSeats;
        private Integer availableSeats;
        private Double pricePerSeat;
        private BusType type;
        private String operatorName;
        private Status status;

        public BusBuilder id(Long id) { this.id = id; return this; }
        public BusBuilder busNumber(String busNumber) { this.busNumber = busNumber; return this; }
        public BusBuilder name(String name) { this.name = name; return this; }
        public BusBuilder source(String source) { this.source = source; return this; }
        public BusBuilder destination(String destination) { this.destination = destination; return this; }
        public BusBuilder departureTime(LocalDateTime departureTime) { this.departureTime = departureTime; return this; }
        public BusBuilder arrivalTime(LocalDateTime arrivalTime) { this.arrivalTime = arrivalTime; return this; }
        public BusBuilder totalSeats(Integer totalSeats) { this.totalSeats = totalSeats; return this; }
        public BusBuilder availableSeats(Integer availableSeats) { this.availableSeats = availableSeats; return this; }
        public BusBuilder pricePerSeat(Double pricePerSeat) { this.pricePerSeat = pricePerSeat; return this; }
        public BusBuilder type(BusType type) { this.type = type; return this; }
        public BusBuilder operatorName(String operatorName) { this.operatorName = operatorName; return this; }
        public BusBuilder status(Status status) { this.status = status; return this; }

        public Bus build() {
            return new Bus(id, busNumber, name, source, destination, departureTime, arrivalTime, totalSeats, availableSeats, pricePerSeat, type, operatorName, status);
        }
    }
}
