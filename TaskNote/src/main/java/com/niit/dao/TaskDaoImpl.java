package com.niit.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.niit.model.Task;
@Transactional
@Repository
public class TaskDaoImpl implements TaskDao{
@Autowired
SessionFactory sessionfactory;
	public void registerTask(Task task) {
		
		sessionfactory.getCurrentSession().save(task);
	}

	public void updateTask(Task task) {
		sessionfactory.getCurrentSession().update(task);
		
	}

	public List<Task> viewTasks() {
		List<Task> list =sessionfactory.getCurrentSession().createCriteria(Task.class).list();
		return list;
	}

	public void deleteTask(Task task) {
		sessionfactory.getCurrentSession().delete(task);
		
	}
	public List<Task> viewMyTasks(String postedby) {
		System.out.println("in view my tasks");
		Session session=sessionfactory.getCurrentSession();
		Criteria ct=session.createCriteria(Task.class);
		ct.add(Restrictions.eq("postedby",postedby));
		ct.add(Restrictions.eq("status",false));
		List list=ct.list();	
		return list;
		}	
	public List<Task> viewCompletedTasks(String postedby) {
		System.out.println("in view my tasks");
		Session session=sessionfactory.getCurrentSession();
		Criteria ct=session.createCriteria(Task.class);
		ct.add(Restrictions.eq("postedby",postedby));
		ct.add(Restrictions.eq("status",true));
		List list=ct.list();	
		return list;
		}	

}
