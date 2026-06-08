package com.travel.service;

import com.travel.entity.AdminLog;
import com.travel.entity.User;
import com.travel.exception.ResourceNotFoundException;
import com.travel.repository.AdminLogRepository;
import com.travel.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminLogService {

    private final AdminLogRepository adminLogRepository;
    private final UserRepository userRepository;

    public AdminLogService(AdminLogRepository adminLogRepository, UserRepository userRepository) {
        this.adminLogRepository = adminLogRepository;
        this.userRepository = userRepository;
    }

    public void logAction(Long adminId, String entityType, Long entityId, String action, String description) {
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("Admin user not found"));

        AdminLog log = AdminLog.builder()
                .admin(admin)
                .entityType(entityType)
                .entityId(entityId)
                .action(action)
                .description(description)
                .build();

        adminLogRepository.save(log);
    }

    public List<AdminLog> getAllLogs() {
        return adminLogRepository.findAllByOrderByTimestampDesc();
    }
}
