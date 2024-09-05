import { Camunda8 } from '@camunda8/sdk';
import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config();


const {
  ZEEBE_ADDRESS,
  ZEEBE_CLIENT_ID,
  ZEEBE_CLIENT_SECRET,
  ZEEBE_AUTHORIZATION_SERVER_URL,
} = process.env;


const c8 = new Camunda8({
  camundaCloud: {
    clientId: ZEEBE_CLIENT_ID,
    clientSecret: ZEEBE_CLIENT_SECRET,
    clusterId: ZEEBE_ADDRESS.split('.')[0],
    clusterRegion: 'bru-2',
    authServerUrl: ZEEBE_AUTHORIZATION_SERVER_URL,
  }
});


const zeebe = c8.getZeebeGrpcApiClient();


const createWorker = (taskType, taskHandler) => {
  zeebe.createWorker({
    taskType,
    taskHandler,
    onReady: () => {
      console.log(`Worker is ready and connected to Zeebe for ${taskType}.`);
    },
    onConnectionError: (error) => {
      console.error(`Worker failed to connect to Zeebe for ${taskType}:`, error);
    },
  });
};


const handleTask = async (job, apiCall) => {
  try {
    console.log(`Handling ${job.type}:`, job.key);

    const response = await apiCall(job.variables);
    const data = response?.data;
    console.log(`${job.type} response:`, data);


    await job.complete({ variables: data ? { [job.type]: data } : {} });

    console.log(`${job.type} completed successfully:`, job.key);
  } catch (error) {
    console.error(`Failed to handle ${job.type}:`, error);


    await job.fail({
      errorMessage: error.message,
      errorDetails: error.stack,
    });

    console.log(`${job.type} failed:`, job.key);
  }
};


const apiGetTasks = () => axios.get('http://localhost:3000/tasks');
const apiCreateTask = ({ title, description }) => axios.post('http://localhost:3000/tasks', { title, description });
const apiUpdateTask = ({ taskId, title, description }) => axios.put(`http://localhost:3000/tasks/${taskId}`, { title, description });
const apiDeleteTask = ({ taskId }) => axios.delete(`http://localhost:3000/tasks/${taskId}`);


const handleGetTasks = (job) => handleTask(job, apiGetTasks);
const handleCreateTask = (job) => handleTask(job, apiCreateTask);
const handleUpdateTask = (job) => handleTask(job, apiUpdateTask);
const handleDeleteTask = (job) => handleTask(job, apiDeleteTask);


createWorker('get-tasks', handleGetTasks);
createWorker('create-task', handleCreateTask);
createWorker('update-task', handleUpdateTask);
createWorker('delete-task', handleDeleteTask);

console.log('Camunda workers are running...');
