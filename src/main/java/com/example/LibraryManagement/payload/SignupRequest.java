package com.example.LibraryManagement.payload;
import java.util.Set;

public class SignupRequest {
    private String username;
    private String password;
    private Set<String> roles;
    // Getters and Setters
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public Set<String> getRoles() { return roles; }
}