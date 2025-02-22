import React, { useState, useEffect } from 'react';
import TaskList from '../components/Task/TaskList';
import TaskForm from '../components/Task/TaskForm';
import taskService from '../services/taskService';
import { Button } from 'react-bootstrap';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskService.getAllTasks();
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch tasks.');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
      try {
          const response = await taskService.createTask(newTask);
          setTasks([...tasks, response.data]);
          setShowForm(false); // Hide the form after successful submission
      } catch (error) {
          console.error("Error creating task:", error);
          setError("Failed to create task");
      }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Task Dashboard</h2>
      <Button onClick={() => setShowForm(true)} variant="primary">Add Task</Button>
      {showForm && <TaskForm onSubmit={handleAddTask} />}
      <TaskList tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}

export default Dashboard;