package com.travel.entity;

import com.travel.enums.BookingStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bus_bookings")
public class BusBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bus_id", nullable = false)
    private Bus bus;

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

    public BusBooking() {}

    public BusBooking(Long id, User user, Bus bus, String passengerName, Integer passengerAge, String passengerGender, Integer seatsBooked, Double totalPrice, LocalDateTime bookingDate, BookingStatus status) {
        this.id = id;
        this.user = user;
        this.bus = bus;
        this.passengerName = passengerName;
        this.passengerAge = passengerAge;
        this.passengerGender = passengerGender;
        this.seatsBooked = seatsBooked;
        this.totalPrice = totalPrice;
        this.bookingDate = bookingDate;
        this.status = status;
    }

    public static BusBookingBuilder builder() {
        return new BusBookingBuilder();
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
    public Bus getBus() { return bus; }
    public void setBus(Bus bus) { this.bus = bus; }
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

    public static class BusBookingBuilder {
        private Long id;
        private User user;
        private Bus bus;
        private String passengerName;
        private Integer passengerAge;
        private String passengerGender;
        private Integer seatsBooked;
        private Double totalPrice;
        private LocalDateTime bookingDate;
        private BookingStatus status;

        public BusBookingBuilder id(Long id) { this.id = id; return this; }
        public BusBookingBuilder user(User user) { this.user = user; return this; }
        public BusBookingBuilder bus(Bus bus) { this.bus = bus; return this; }
        public BusBookingBuilder passengerName(String passengerName) { this.passengerName = passengerName; return this; }
        public BusBookingBuilder passengerAge(Integer passengerAge) { this.passengerAge = passengerAge; return this; }
        public BusBookingBuilder passengerGender(String passengerGender) { this.passengerGender = passengerGender; return this; }
        public BusBookingBuilder seatsBooked(Integer seatsBooked) { this.seatsBooked = seatsBooked; return this; }
        public BusBookingBuilder totalPrice(Double totalPrice) { this.totalPrice = totalPrice; return this; }
        public BusBookingBuilder bookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; return this; }
        public BusBookingBuilder status(BookingStatus status) { this.status = status; return this; }

        public BusBooking build() {
            return new BusBooking(id, user, bus, passengerName, passengerAge, passengerGender, seatsBooked, totalPrice, bookingDate, status);
        }
    }
}
