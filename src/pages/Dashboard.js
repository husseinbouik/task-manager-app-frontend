
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import TaskList from '../components/Task/TaskList';
import taskService from '../services/taskService';
import AddIcon from '@mui/icons-material/Add';
import TaskIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import OverdueIcon from '@mui/icons-material/Warning';
import { styled } from '@mui/material/styles';
import NavbarComponent from '../components/layout/Sidebar';
import { useNavigate } from 'react-router-dom';
import AppTheme from '../components/shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import ColorModeSelect from '../components/shared-theme/ColorModeSelect';
import SidebarComponent from '../components/layout/Sidebar';

const DashboardContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
}));

const AddTaskButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const InfoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%', 
}));

const DashboardStack = styled(Box)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

function Dashboard(props) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const [selectedTask, setSelectedTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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

  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  const pendingTasks = tasks.filter((task) => task.status === 'pending').length;
  const overdueTasks = tasks.filter((task) => {
    if (!task.due_date) return false; 
    const dueDate = new Date(task.due_date);
    const now = new Date();
    return dueDate < now && task.status !== 'completed';
  }).length;

  const handleAddTask = () => {
    navigate('/add-task'); 
  };

  const handleViewTask = (task) => {
    
    alert(`Viewing task: ${task.title}`);
  };

  const handleEditTask = (task) => {
    navigate(`/edit-task/${task.id}`); 
  };
  
  const handleDeleteTask = async (id) => {
    try {
        await taskService.deleteTask(id);
        
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        setSuccessMessage('Task deleted successfully!');
        setErrorMessage('');
        
        setTimeout(() => {
            setSuccessMessage('');
        }, 1500);
    } catch (error) {
        console.error('Error deleting task:', error);
        setErrorMessage('Failed to delete task.');
        setSuccessMessage('');
    }
};

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading tasks...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error: {error}
      </Alert>
    );
  }

return (
    <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <SidebarComponent />
        <DashboardStack
            direction="column"
            justifyContent="space-between">
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <Container>
                <Typography variant="h4" component="h2" gutterBottom>
                    Task Dashboard
                </Typography>

                <Grid container spacing={3} mb={2}>
                    <Grid item xs={6} sm={3}>
                        <InfoPaper>
                            <TaskIcon color="primary" />
                            <Typography variant="h6">Total Tasks</Typography>
                            <Typography variant="subtitle1">{totalTasks}</Typography>
                        </InfoPaper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <InfoPaper>
                            <CheckCircleIcon color="success" />
                            <Typography variant="h6">Completed</Typography>
                            <Typography variant="subtitle1">{completedTasks}</Typography>
                        </InfoPaper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <InfoPaper>
                            <PendingIcon color="warning" />
                            <Typography variant="h6">Pending</Typography>
                            <Typography variant="subtitle1">{pendingTasks}</Typography>
                        </InfoPaper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <InfoPaper>
                            <OverdueIcon color="error" />
                            <Typography variant="h6">Overdue</Typography>
                            <Typography variant="subtitle1">{overdueTasks}</Typography>
                        </InfoPaper>
                    </Grid>
                </Grid>

                <AddTaskButton
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}                       
                    onClick={handleAddTask}
                >
                    Add Task
                </AddTaskButton>

                <TaskList
                    tasks={tasks}
                    setTasks={setTasks}
                    onView={handleViewTask}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask} 
                />
            </Container>
        </DashboardStack>
    </AppTheme>
);
}

export default Dashboard;