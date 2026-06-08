package com.travel.entity;

import com.travel.enums.TrainClass;
import com.travel.enums.Status;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "trains")
public class Train {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "train_number", nullable = false, unique = true)
    private String trainNumber;

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
    @Column(name = "train_class", nullable = false)
    private TrainClass trainClass;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    public Train() {}

    public Train(Long id, String trainNumber, String name, String source, String destination, LocalDateTime departureTime, LocalDateTime arrivalTime, Integer totalSeats, Integer availableSeats, Double pricePerSeat, TrainClass trainClass, Status status) {
        this.id = id;
        this.trainNumber = trainNumber;
        this.name = name;
        this.source = source;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
        this.pricePerSeat = pricePerSeat;
        this.trainClass = trainClass;
        this.status = status;
    }

    public static TrainBuilder builder() {
        return new TrainBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTrainNumber() { return trainNumber; }
    public void setTrainNumber(String trainNumber) { this.trainNumber = trainNumber; }
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
    public TrainClass getTrainClass() { return trainClass; }
    public void setTrainClass(TrainClass trainClass) { this.trainClass = trainClass; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public static class TrainBuilder {
        private Long id;
        private String trainNumber;
        private String name;
        private String source;
        private String destination;
        private LocalDateTime departureTime;
        private LocalDateTime arrivalTime;
        private Integer totalSeats;
        private Integer availableSeats;
        private Double pricePerSeat;
        private TrainClass trainClass;
        private Status status;

        public TrainBuilder id(Long id) { this.id = id; return this; }
        public TrainBuilder trainNumber(String trainNumber) { this.trainNumber = trainNumber; return this; }
        public TrainBuilder name(String name) { this.name = name; return this; }
        public TrainBuilder source(String source) { this.source = source; return this; }
        public TrainBuilder destination(String destination) { this.destination = destination; return this; }
        public TrainBuilder departureTime(LocalDateTime departureTime) { this.departureTime = departureTime; return this; }
        public TrainBuilder arrivalTime(LocalDateTime arrivalTime) { this.arrivalTime = arrivalTime; return this; }
        public TrainBuilder totalSeats(Integer totalSeats) { this.totalSeats = totalSeats; return this; }
        public TrainBuilder availableSeats(Integer availableSeats) { this.availableSeats = availableSeats; return this; }
        public TrainBuilder pricePerSeat(Double pricePerSeat) { this.pricePerSeat = pricePerSeat; return this; }
        public TrainBuilder trainClass(TrainClass trainClass) { this.trainClass = trainClass; return this; }
        public TrainBuilder status(Status status) { this.status = status; return this; }

        public Train build() {
            return new Train(id, trainNumber, name, source, destination, departureTime, arrivalTime, totalSeats, availableSeats, pricePerSeat, trainClass, status);
        }
    }
}
