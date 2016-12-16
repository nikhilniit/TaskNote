package com.niit.dao;

import java.util.List;

import com.niit.model.Users;

public interface UserDao {

	void registerUsers(Users users);
	void updateUser(Users users);
	List<Users> viewUsers();
	int validateUser(String username, String password);
}
