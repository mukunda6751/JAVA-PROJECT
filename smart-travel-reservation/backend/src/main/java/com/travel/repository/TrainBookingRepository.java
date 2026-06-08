package com.travel.repository;

import com.travel.entity.TrainBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TrainBookingRepository extends JpaRepository<TrainBooking, Long> {
    List<TrainBooking> findByUserIdOrderByBookingDateDesc(Long userId);
    List<TrainBooking> findAllByOrderByBookingDateDesc();
}
