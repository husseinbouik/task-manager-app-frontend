import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

function TaskItem({ task, onDelete }) {
  return (
    <ListGroup.Item>
      {task.title} - {task.description} - Due: {task.due_date}
      <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>Delete</Button>
    </ListGroup.Item>
  );
}

export default TaskItem;