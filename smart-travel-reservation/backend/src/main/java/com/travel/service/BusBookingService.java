package com.travel.service;

import com.travel.dto.BusBookingRequest;
import com.travel.entity.Bus;
import com.travel.entity.BusBooking;
import com.travel.entity.User;
import com.travel.enums.BookingStatus;
import com.travel.exception.BadRequestException;
import com.travel.exception.ResourceNotFoundException;
import com.travel.repository.BusBookingRepository;
import com.travel.repository.BusRepository;
import com.travel.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BusBookingService {

    private final BusBookingRepository busBookingRepository;
    private final BusRepository busRepository;
    private final UserRepository userRepository;

    public BusBookingService(BusBookingRepository busBookingRepository, BusRepository busRepository, UserRepository userRepository) {
        this.busBookingRepository = busBookingRepository;
        this.busRepository = busRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public BusBooking bookBus(BusBookingRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus not found with id: " + request.getBusId()));

        if (request.getSeatsBooked() > bus.getAvailableSeats()) {
            throw new BadRequestException("Not enough seats available. Only " + bus.getAvailableSeats() + " seats left.");
        }

        double totalPrice = request.getSeatsBooked() * bus.getPricePerSeat();

        BusBooking booking = BusBooking.builder()
                .user(user)
                .bus(bus)
                .passengerName(request.getPassengerName())
                .passengerAge(request.getPassengerAge())
                .passengerGender(request.getPassengerGender())
                .seatsBooked(request.getSeatsBooked())
                .totalPrice(totalPrice)
                .status(BookingStatus.CONFIRMED)
                .build();

        // Deduct available seats
        bus.setAvailableSeats(bus.getAvailableSeats() - request.getSeatsBooked());
        busRepository.save(bus);

        return busBookingRepository.save(booking);
    }

    public List<BusBooking> getMyBookings(Long userId) {
        return busBookingRepository.findByUserIdOrderByBookingDateDesc(userId);
    }

    public List<BusBooking> getAllBookings() {
        return busBookingRepository.findAllByOrderByBookingDateDesc();
    }

    public long countAll() {
        return busBookingRepository.count();
    }

    @Transactional
    public BusBooking cancelBooking(Long bookingId, Long userId) {
        BusBooking booking = busBookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if (!booking.getUser().getId().equals(userId)) {
            throw new BadRequestException("You can only cancel your own bookings");
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Booking is already cancelled");
        }

        // Restore seats
        Bus bus = booking.getBus();
        bus.setAvailableSeats(bus.getAvailableSeats() + booking.getSeatsBooked());
        busRepository.save(bus);

        booking.setStatus(BookingStatus.CANCELLED);
        return busBookingRepository.save(booking);
    }
}
