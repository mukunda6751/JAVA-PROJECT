package com.travel.repository;

import com.travel.entity.BusBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BusBookingRepository extends JpaRepository<BusBooking, Long> {
    List<BusBooking> findByUserIdOrderByBookingDateDesc(Long userId);
    List<BusBooking> findAllByOrderByBookingDateDesc();
}
