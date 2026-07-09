import React from 'react'
import {
  Router,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage, { jobLoader } from './pages/JobPage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'

const API_BASE_URL = 'https://react-jobs-gt2z.onrender.com';

const App = () => {
  // Add new job
  const addJob = async (newJob) => {
    const res = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return;
  };

  // Delete job
  const deleteJob = async(id) => {
    const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Update job
  const updateJob = async(job) => {
      const res = await fetch(`${API_BASE_URL}/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
      });
      return;
    };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route 
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />} 
          loader={jobLoader}
        />
        <Route
          path='/add-job'
          element={<AddJobPage addJobSubmit={addJob} />} 
        />
        <Route 
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob}/>} 
          loader={jobLoader}
        />
      </Route>

    )
  );

  return (<RouterProvider router={router} />)
}

export default App
