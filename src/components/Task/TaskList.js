import React from 'react';
import TaskItem from './TaskItem';
import { ListGroup } from 'react-bootstrap';
import taskService from '../../services/taskService';
function TaskList({ tasks, setTasks }) {

    const handleDeleteTask = async (taskId) => {
        try {
            await taskService.deleteTask(taskId); 
            setTasks(tasks.filter((task) => task.id !== taskId)); 
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

  return (
    <ListGroup>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} />
      ))}
    </ListGroup>
  );
}

export default TaskList;