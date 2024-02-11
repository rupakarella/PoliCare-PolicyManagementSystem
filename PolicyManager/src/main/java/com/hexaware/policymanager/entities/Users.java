package com.hexaware.policymanager.entities;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Users")
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long userId;

	@NotBlank(message = "emailAddress should not be blank")
	@Email(message = "Please enter a valid email address")
	private String emailAddress;

	@NotBlank(message = "contactNumber should start with digits 6-9 and should contain 10 digits")
	@Pattern(regexp = "^[6789]\\d{9}$")
	private String contactNumber;

	private String password;

	@NotBlank(message = "firstName should not be blank")
	@Pattern(regexp = "^[a-zA-Z\\s]+$")
	private String firstName;

	@NotBlank(message = "lastName should not be blank")
	@Pattern(regexp = "^[a-zA-Z\\s]+$")
	private String lastName;

	@Past(message = "Date of birth must be in the past")
	private Date dateOfBirth;

	@NotBlank(message = "panNumber should not be blank")
	@Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$", message = "Invalid PAN number format")
	private String panNumber;

	@NotBlank(message = "employerType should be blank")
	@Size(max = 25, message = "String length cannot exceed 25 characters")
	private String employerType;

	private String employerName;

	@Positive(message = "Salary must be a positive")
	private double salary;

	@NotBlank(message = "userType should not be blank")
	@Pattern(regexp = "^(Admin|User)$", message = "userType should be either 'Admin' or 'User'")
	private String userType;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "addressId")
	@JsonManagedReference(value = "Users-Address")
	private Address address;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonManagedReference(value = "UserPolicies-Users")
	private List<UserPolicies> userPolicies;

	public Users() {
		super();

	}

	public Users(long userId,
			@NotBlank(message = "emailAddress should not be blank") @Email(message = "Please enter a valid email address") String emailAddress,
			@NotBlank(message = "contactNumber should start with digits 6-9 and should contain 10 digits") @Pattern(regexp = "^[6789]\\d{9}$") String contactNumber,
			String password,
			@NotBlank(message = "firstName should not be blank") @Pattern(regexp = "^[a-zA-Z\\s]+$") String firstName,
			@NotBlank(message = "lastName should not be blank") @Pattern(regexp = "^[a-zA-Z\\s]+$") String lastName,
			@Past(message = "Date of birth must be in the past") Date dateOfBirth,
			@NotBlank(message = "panNumber should not be blank") @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$", message = "Invalid PAN number format") String panNumber,
			@NotBlank(message = "employerType should be blank") @Size(max = 25, message = "String length cannot exceed 25 characters") String employerType,
			String employerName, @Positive(message = "Salary must be a positive") double salary,
			@NotBlank(message = "userType should not be blank") @Pattern(regexp = "^(Admin|User)$", message = "userType should be either 'Admin' or 'User'") String userType,
			Address address, List<UserPolicies> userPolicies) {
		super();
		this.userId = userId;
		this.emailAddress = emailAddress;
		this.contactNumber = contactNumber;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.panNumber = panNumber;
		this.employerType = employerType;
		this.employerName = employerName;
		this.salary = salary;
		this.userType = userType;
		this.address = address;
		this.userPolicies = userPolicies;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getPanNumber() {
		return panNumber;
	}

	public void setPanNumber(String panNumber) {
		this.panNumber = panNumber;
	}

	public String getEmployerType() {
		return employerType;
	}

	public void setEmployerType(String employerType) {
		this.employerType = employerType;
	}

	public String getEmployerName() {
		return employerName;
	}

	public void setEmployerName(String employerName) {
		this.employerName = employerName;
	}

	public double getSalary() {
		return salary;
	}

	public void setSalary(double salary) {
		this.salary = salary;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public List<UserPolicies> getUserPolicies() {
		return userPolicies;
	}

	public void setUserPolicies(List<UserPolicies> userPolicies) {
		this.userPolicies = userPolicies;
	}

	@Override
	public String toString() {
		return "Users [userId=" + userId + ", emailAddress=" + emailAddress + ", contactNumber=" + contactNumber
				+ ", password=" + password + ", firstName=" + firstName + ", lastName=" + lastName + ", dateOfBirth="
				+ dateOfBirth + ", panNumber=" + panNumber + ", employerType=" + employerType + ", employerName="
				+ employerName + ", salary=" + salary + ", userType=" + userType + ", address=" + address
				+ ", userPolicies=" + userPolicies + "]";
	}

}