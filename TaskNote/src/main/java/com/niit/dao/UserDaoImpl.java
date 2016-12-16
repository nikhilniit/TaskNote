package com.niit.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.niit.model.Users;
@Transactional
@Repository
public class UserDaoImpl implements UserDao{
	@Autowired
SessionFactory sessionfactory;
	public void registerUsers(Users users) {
		sessionfactory.getCurrentSession().save(users);
		
	}

	public void updateUser(Users users) {
		sessionfactory.getCurrentSession().update(users);
		
	}

	public List<Users> viewUsers() {
		List<Users> list=sessionfactory.getCurrentSession().createCriteria(Users.class).list();
		return list;
	}

	public int validateUser(String username, String password) {
		int res=0;
		Session session=sessionfactory.getCurrentSession();
		Query result=session.createQuery("from Users u where u.username='"+username+"'");
		 
		List<Users> users=result.list();
		System.out.println("users:"+users);
	if(users.size()==0)
	{
		res=0;
	}
	else
	{
		for(int i=0;i<users.size();i++)
		{
			System.out.println("inside for loop");
			String dbusername=users.get(i).getUsername();
			String dbpassword=users.get(i).getPassword();
			if(dbusername.equals(username)&&dbpassword.equals(password))
			{
				res=1;
				System.out.println("the result is:"+res);
			}
			
			}
	}	
	return res;
	}
}
