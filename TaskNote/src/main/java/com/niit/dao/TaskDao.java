package com.niit.dao;

import java.util.List;

import com.niit.model.Task;



public interface TaskDao {

	
	void registerTask(Task task);
	void updateTask(Task task);
	List<Task> viewTasks();
	void deleteTask(Task task);
	List<Task> viewMyTasks(String postedby);
	List<Task> viewCompletedTasks(String postedby);
}
