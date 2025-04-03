import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import ListTask from "./ListTask";
import ListCompleted from "./ListComplted";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function Todo() {
    const [tasks, setTask] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("success");

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const storedCompleted = JSON.parse(localStorage.getItem("completed")) || [];
    
        setTask(storedTasks);
        setCompleted(storedCompleted);
    }, []); 
    
    const showSnackbar = (message, severity = "success") => {
        setSnackMessage(message);
        setSnackSeverity(severity);
        setSnackOpen(true);
    };
    const handleSnackClose = () => {
        setSnackOpen(false);
    };
    const addTask = (task) => {
        if (!task) {
            showSnackbar("Task cannot be empty!", "warning");
            return;
        }
        if (tasks.includes(task)) {
            showSnackbar("Task already exists!", "error");
            return;
        }
            const updatedTasks = [...tasks, task];
            setTask(updatedTasks);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
            showSnackbar("Task added successfully!", "success");
    };
  
    const deleteTask = (index, taskType = 'pending') => {
        let newTasks = taskType === 'pending' ? [...tasks] : [...completed];
        newTasks.splice(index, 1);
        if (taskType === 'pending'){
            setTask(newTasks)
           localStorage.setItem('tasks',JSON.stringify(newTasks)) 
           showSnackbar(`Task deleted!`, "error");

        }else{
             setCompleted(newTasks)
           localStorage.setItem('complted',JSON.stringify(newTasks)) 
           showSnackbar(`Task  deleted!`, "error");
        }
    };
   
    const completeTask = (index) => {
        const taskToComplete = tasks[index]; 
        if (completed.includes(taskToComplete)) {
            showSnackbar("Task is already completed!", "info");
            return;
        }
        const updatedCompleted = [...completed, taskToComplete];
        setCompleted(updatedCompleted);
        localStorage.setItem("completed", JSON.stringify(updatedCompleted)); 
    
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTask(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 

        
    showSnackbar("Task marked as completed!", "success");
    };
    

    const restoreTask = (index) => {
       
        const restoringTask = completed[index];
        
    if (tasks.includes(restoringTask)) {
        showSnackbar("Task is already in the pending list!", "success");
        return;
    }
       
        const updatedCompleted = completed.filter((_, i) => i !== index);
        setCompleted(updatedCompleted);
        localStorage.setItem("completed", JSON.stringify(updatedCompleted)); 
    
       
        const updatedTasks = [...tasks, restoringTask];
        setTask(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
        showSnackbar("Task restored successfully!", "success");
    };
    

    const edit = (index, task) => {
        let newTask = [...tasks];
        if (newTask.some((t, i) => t === task && i !== index)) {
            showSnackbar("Task already exists!","success");
            return;
        }
        newTask[index] = task;
         setTask(newTask);
        localStorage.setItem("tasks", JSON.stringify(newTask));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4">
            <Snackbar open={snackOpen} autoHideDuration={2000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity={snackSeverity}>
                {snackMessage}
            </Alert>
        </Snackbar>
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-green-800 mb-2">
                        Task Organizer
                    </h1>
                    <p className="text-green-600">Get things done efficiently</p>
                </div>

                {/* Main Container */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Add Task Section */}
                    <div className="p-6 bg-green-50 border-b border-green-100">
                        <AddTask addTask={addTask} />
                    </div>

                    {/* Pending Tasks */}
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                {tasks.length ? `Pending Tasks (${tasks.length})` : "No Tasks Pending"}
                            </h2>
                        </div>

                        {tasks.length > 0 ? (
                            <div className="space-y-3">
                                {tasks.map((task, index) => (
                                    <ListTask 
                                        task={task} 
                                        key={index} 
                                        deleteTask={deleteTask} 
                                        index={index} 
                                        completeTask={completeTask} 
                                        edit={edit} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 text-gray-500">
                                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <p className="mt-2">Add your first task above</p>
                            </div>
                        )}
                    </div>

                    {/* Completed Tasks */}
                    {completed.length > 0 && (
                        <>
                            <div className="border-t border-gray-200"></div>
                            <div className="p-6 bg-gray-50">
                                <div className="flex items-center justify-between mb-4 px-2">
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Completed Tasks ({completed.length})
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    {completed.map((task, index) => (
                                        <ListCompleted 
                                            task={task} 
                                            key={index} 
                                            index={index} 
                                            restoreTask={restoreTask} 
                                            deleteTask={deleteTask} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer Stats */}
                <div className="mt-4 text-center text-sm text-gray-500">
                    {tasks.length + completed.length} total tasks
                </div>
            </div>
        </div>
    );
}

export default Todo;