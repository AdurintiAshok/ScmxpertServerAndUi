package com.exafluence.scmxpert.Service;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@Data
public class AppToken {

    // A unique id from user table in database
    private String userEmail;
    private String userName;
    // User's role, this attribute is optional
    private String userPassword;
    private String role;
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	  public void setRole(String role) {
	        this.role = role;
	    }
	    public String getRole() {
	        return role;
	    }

	// An instant Java date to indicates expiration of token
   



}