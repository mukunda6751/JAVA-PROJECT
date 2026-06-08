package com.travel.entity;

import com.travel.enums.BookingStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "train_bookings")
public class TrainBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "train_id", nullable = false)
    private Train train;

    @Column(name = "passenger_name", nullable = false)
    private String passengerName;

    @Column(name = "passenger_age", nullable = false)
    private Integer passengerAge;

    @Column(name = "passenger_gender", nullable = false)
    private String passengerGender;

    @Column(name = "seats_booked", nullable = false)
    private Integer seatsBooked;

    @Column(name = "total_price", nullable = false)
    private Double totalPrice;

    @Column(name = "booking_date", nullable = false)
    private LocalDateTime bookingDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;

    public TrainBooking() {}

    public TrainBooking(Long id, User user, Train train, String passengerName, Integer passengerAge, String passengerGender, Integer seatsBooked, Double totalPrice, LocalDateTime bookingDate, BookingStatus status) {
        this.id = id;
        this.user = user;
        this.train = train;
        this.passengerName = passengerName;
        this.passengerAge = passengerAge;
        this.passengerGender = passengerGender;
        this.seatsBooked = seatsBooked;
        this.totalPrice = totalPrice;
        this.bookingDate = bookingDate;
        this.status = status;
    }

    public static TrainBookingBuilder builder() {
        return new TrainBookingBuilder();
    }

    @PrePersist
    protected void onCreate() {
        this.bookingDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Train getTrain() { return train; }
    public void setTrain(Train train) { this.train = train; }
    public String getPassengerName() { return passengerName; }
    public void setPassengerName(String passengerName) { this.passengerName = passengerName; }
    public Integer getPassengerAge() { return passengerAge; }
    public void setPassengerAge(Integer passengerAge) { this.passengerAge = passengerAge; }
    public String getPassengerGender() { return passengerGender; }
    public void setPassengerGender(String passengerGender) { this.passengerGender = passengerGender; }
    public Integer getSeatsBooked() { return seatsBooked; }
    public void setSeatsBooked(Integer seatsBooked) { this.seatsBooked = seatsBooked; }
    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    public LocalDateTime getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }
    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }

    public static class TrainBookingBuilder {
        private Long id;
        private User user;
        private Train train;
        private String passengerName;
        private Integer passengerAge;
        private String passengerGender;
        private Integer seatsBooked;
        private Double totalPrice;
        private LocalDateTime bookingDate;
        private BookingStatus status;

        public TrainBookingBuilder id(Long id) { this.id = id; return this; }
        public TrainBookingBuilder user(User user) { this.user = user; return this; }
        public TrainBookingBuilder train(Train train) { this.train = train; return this; }
        public TrainBookingBuilder passengerName(String passengerName) { this.passengerName = passengerName; return this; }
        public TrainBookingBuilder passengerAge(Integer passengerAge) { this.passengerAge = passengerAge; return this; }
        public TrainBookingBuilder passengerGender(String passengerGender) { this.passengerGender = passengerGender; return this; }
        public TrainBookingBuilder seatsBooked(Integer seatsBooked) { this.seatsBooked = seatsBooked; return this; }
        public TrainBookingBuilder totalPrice(Double totalPrice) { this.totalPrice = totalPrice; return this; }
        public TrainBookingBuilder bookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; return this; }
        public TrainBookingBuilder status(BookingStatus status) { this.status = status; return this; }

        public TrainBooking build() {
            return new TrainBooking(id, user, train, passengerName, passengerAge, passengerGender, seatsBooked, totalPrice, bookingDate, status);
        }
    }
}
