package com.travel.repository;

import com.travel.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {

    @Query("SELECT b FROM Bus b WHERE LOWER(b.source) = LOWER(:source) " +
           "AND LOWER(b.destination) = LOWER(:destination) " +
           "AND b.departureTime >= :startOfDay AND b.departureTime < :endOfDay " +
           "AND b.status = com.travel.enums.Status.ACTIVE " +
           "AND b.availableSeats > 0")
    List<Bus> searchBuses(@Param("source") String source,
                          @Param("destination") String destination,
                          @Param("startOfDay") LocalDateTime startOfDay,
                          @Param("endOfDay") LocalDateTime endOfDay);

    @Query("SELECT b FROM Bus b WHERE LOWER(b.source) = LOWER(:source) " +
           "AND LOWER(b.destination) = LOWER(:destination) " +
           "AND b.status = com.travel.enums.Status.ACTIVE " +
           "AND b.availableSeats > 0")
    List<Bus> searchBusesWithoutDate(@Param("source") String source,
                                     @Param("destination") String destination);
}
