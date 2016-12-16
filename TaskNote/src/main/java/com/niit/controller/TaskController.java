package com.niit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.niit.dao.TaskDao;
import com.niit.model.Task;

@RestController
public class TaskController {
@Autowired
	TaskDao taskDao;
@RequestMapping(value="/registerTask",headers="accept=Application/json",method=RequestMethod.POST)
public void registerTask(@RequestBody Task task)
{
		taskDao.registerTask(task);
}
@RequestMapping(value="/updateTask",headers="accept=Application/json",method=RequestMethod.PUT)
public void updatetask(@RequestBody Task task)
{
	taskDao.updateTask(task);
}

@RequestMapping(value="/deleteTask",headers="accept=Application/json",method=RequestMethod.POST)
public void deleteTask(@RequestBody Task task)
{
	taskDao.deleteTask(task);
}
@RequestMapping(value="/viewMyTasks/{postedby}",headers="accept=Application/json",method=RequestMethod.GET)
public List<Task> viewMyTasks(@PathVariable("postedby") String postedby)
{
	System.out.println("in view mytasks controller");
	return taskDao.viewMyTasks(postedby);
	
}
@RequestMapping(value="/viewCompletedTasks/{postedby}",headers="accept=Application/json",method=RequestMethod.GET)
public List<Task> viewCompletedTasks(@PathVariable("postedby") String postedby)
{
	return taskDao.viewCompletedTasks(postedby);
	
}
}
