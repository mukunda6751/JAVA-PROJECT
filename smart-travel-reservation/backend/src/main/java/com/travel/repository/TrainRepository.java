package com.travel.repository;

import com.travel.entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TrainRepository extends JpaRepository<Train, Long> {

    @Query("SELECT t FROM Train t WHERE LOWER(t.source) = LOWER(:source) " +
           "AND LOWER(t.destination) = LOWER(:destination) " +
           "AND t.departureTime >= :startOfDay AND t.departureTime < :endOfDay " +
           "AND t.status = com.travel.enums.Status.ACTIVE " +
           "AND t.availableSeats > 0")
    List<Train> searchTrains(@Param("source") String source,
                              @Param("destination") String destination,
                              @Param("startOfDay") LocalDateTime startOfDay,
                              @Param("endOfDay") LocalDateTime endOfDay);

    @Query("SELECT t FROM Train t WHERE LOWER(t.source) = LOWER(:source) " +
           "AND LOWER(t.destination) = LOWER(:destination) " +
           "AND t.status = com.travel.enums.Status.ACTIVE " +
           "AND t.availableSeats > 0")
    List<Train> searchTrainsWithoutDate(@Param("source") String source,
                                        @Param("destination") String destination);
}
