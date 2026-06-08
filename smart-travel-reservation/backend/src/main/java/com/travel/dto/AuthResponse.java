package com.travel.dto;


public class AuthResponse {
    private String token;
    private String role;
    private String name;
    private String email;
    private Long userId;

    public AuthResponse() {}

    public AuthResponse(String token, String role, String name, String email, Long userId) {
        this.token = token;
        this.role = role;
        this.name = name;
        this.email = email;
        this.userId = userId;
    }

    public static AuthResponseBuilder builder() {
        return new AuthResponseBuilder();
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public static class AuthResponseBuilder {
        private String token;
        private String role;
        private String name;
        private String email;
        private Long userId;

        public AuthResponseBuilder token(String token) { this.token = token; return this; }
        public AuthResponseBuilder role(String role) { this.role = role; return this; }
        public AuthResponseBuilder name(String name) { this.name = name; return this; }
        public AuthResponseBuilder email(String email) { this.email = email; return this; }
        public AuthResponseBuilder userId(Long userId) { this.userId = userId; return this; }

        public AuthResponse build() {
            return new AuthResponse(token, role, name, email, userId);
        }
    }
}
