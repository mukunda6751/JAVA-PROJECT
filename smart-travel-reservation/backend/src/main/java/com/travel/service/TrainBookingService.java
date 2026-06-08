package com.travel.service;

import com.travel.dto.TrainBookingRequest;
import com.travel.entity.Train;
import com.travel.entity.TrainBooking;
import com.travel.entity.User;
import com.travel.enums.BookingStatus;
import com.travel.exception.BadRequestException;
import com.travel.exception.ResourceNotFoundException;
import com.travel.repository.TrainBookingRepository;
import com.travel.repository.TrainRepository;
import com.travel.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TrainBookingService {

    private final TrainBookingRepository trainBookingRepository;
    private final TrainRepository trainRepository;
    private final UserRepository userRepository;

    public TrainBookingService(TrainBookingRepository trainBookingRepository, TrainRepository trainRepository, UserRepository userRepository) {
        this.trainBookingRepository = trainBookingRepository;
        this.trainRepository = trainRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public TrainBooking bookTrain(TrainBookingRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Train train = trainRepository.findById(request.getTrainId())
                .orElseThrow(() -> new ResourceNotFoundException("Train not found with id: " + request.getTrainId()));

        if (request.getSeatsBooked() > train.getAvailableSeats()) {
            throw new BadRequestException("Not enough seats available. Only " + train.getAvailableSeats() + " seats left.");
        }

        double totalPrice = request.getSeatsBooked() * train.getPricePerSeat();

        TrainBooking booking = TrainBooking.builder()
                .user(user)
                .train(train)
                .passengerName(request.getPassengerName())
                .passengerAge(request.getPassengerAge())
                .passengerGender(request.getPassengerGender())
                .seatsBooked(request.getSeatsBooked())
                .totalPrice(totalPrice)
                .status(BookingStatus.CONFIRMED)
                .build();

        // Deduct available seats
        train.setAvailableSeats(train.getAvailableSeats() - request.getSeatsBooked());
        trainRepository.save(train);

        return trainBookingRepository.save(booking);
    }

    public List<TrainBooking> getMyBookings(Long userId) {
        return trainBookingRepository.findByUserIdOrderByBookingDateDesc(userId);
    }

    public List<TrainBooking> getAllBookings() {
        return trainBookingRepository.findAllByOrderByBookingDateDesc();
    }

    public long countAll() {
        return trainBookingRepository.count();
    }

    @Transactional
    public TrainBooking cancelBooking(Long bookingId, Long userId) {
        TrainBooking booking = trainBookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if (!booking.getUser().getId().equals(userId)) {
            throw new BadRequestException("You can only cancel your own bookings");
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Booking is already cancelled");
        }

        // Restore seats
        Train train = booking.getTrain();
        train.setAvailableSeats(train.getAvailableSeats() + booking.getSeatsBooked());
        trainRepository.save(train);

        booking.setStatus(BookingStatus.CANCELLED);
        return trainBookingRepository.save(booking);
    }
}
