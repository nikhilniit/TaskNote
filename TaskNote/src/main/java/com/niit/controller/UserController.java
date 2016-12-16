package com.niit.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.niit.dao.UserDao;
import com.niit.model.Users;

@RestController
public class UserController {
@Autowired
	UserDao userDao;

@RequestMapping(value="/fileUpload", method=RequestMethod.POST)
public void registerUser(@RequestParam("file") MultipartFile file,@RequestParam("username") String username,@RequestParam("password") String password,@RequestParam("email") String email)
{
	System.out.println("Inside");
	System.out.println("file:"+file);
	System.out.println("username:"+username+"\t"+email+"\t"+password);
	Users user=new Users();
	user.setUsername(username);
	user.setEmail(email);
	user.setPassword(password);
	
	
	userDao.registerUsers(user);
	Path path=Paths.get("D://mydream task//TaskNoteFrnt//WebContent//images//"+username+".jpg");
	if(file!=null)
	{
		try {
			file.transferTo(new File(path.toString()));
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	}


@RequestMapping(value="/authenticate", method=RequestMethod.POST,headers="Accept=application/json")
public int authenticateUser(@RequestBody Users users)
{
	System.out.println("in authenticate");
	 System.out.println("username:"+users.getUsername());
	 System.out.println("password:"+users.getPassword());
int result=0;
	 result=userDao.validateUser(users.getUsername(),users.getPassword());
	 System.out.println("result is:"+result);
	 return result;
}
}
