package com.travel.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "admin_logs")
public class AdminLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "admin_id", nullable = false)
    private User admin;

    @Column(name = "entity_type", nullable = false)
    private String entityType;

    @Column(name = "entity_id")
    private Long entityId;

    @Column(nullable = false)
    private String action;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public AdminLog() {}

    public AdminLog(Long id, User admin, String entityType, Long entityId, String action, String description, LocalDateTime timestamp) {
        this.id = id;
        this.admin = admin;
        this.entityType = entityType;
        this.entityId = entityId;
        this.action = action;
        this.description = description;
        this.timestamp = timestamp;
    }

    public static AdminLogBuilder builder() {
        return new AdminLogBuilder();
    }

    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getAdmin() { return admin; }
    public void setAdmin(User admin) { this.admin = admin; }
    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }
    public Long getEntityId() { return entityId; }
    public void setEntityId(Long entityId) { this.entityId = entityId; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public static class AdminLogBuilder {
        private Long id;
        private User admin;
        private String entityType;
        private Long entityId;
        private String action;
        private String description;
        private LocalDateTime timestamp;

        public AdminLogBuilder id(Long id) { this.id = id; return this; }
        public AdminLogBuilder admin(User admin) { this.admin = admin; return this; }
        public AdminLogBuilder entityType(String entityType) { this.entityType = entityType; return this; }
        public AdminLogBuilder entityId(Long entityId) { this.entityId = entityId; return this; }
        public AdminLogBuilder action(String action) { this.action = action; return this; }
        public AdminLogBuilder description(String description) { this.description = description; return this; }
        public AdminLogBuilder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }

        public AdminLog build() {
            return new AdminLog(id, admin, entityType, entityId, action, description, timestamp);
        }
    }
}
