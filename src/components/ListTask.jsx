import React, { useState } from "react";

function ListTask(props) {
    const [isEditing, setEditing] = useState(false);
    const [editedTasks, setEditedTasks] = useState(props.task);

    const removeTask = () => {
        props.deleteTask(props.index);
    };

    const finishTask = () => {
        props.completeTask(props.index);  
    };

    const createInput = () => {
        if (isEditing) {
            props.edit(props.index, editedTasks);
            setEditing(false);
        } else {
            setEditing(true);
        }
    };

    const handleInputChange = (event) => {
        setEditedTasks(event.target.value);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 hover:bg-green-50 transition-colors">
                {!isEditing ? (
                    <span className="text-gray-800 text-lg flex-grow truncate">
                        {props.task}
                    </span>
                ) : (
                    <input
                        type="text"
                        className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={editedTasks}
                        onChange={handleInputChange}
                        autoFocus
                    />
                )}
                
                <div className="flex space-x-2 ml-4">
                    {/* Complete Button */}
                    <button
                        onClick={finishTask}
                        className="p-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                        title="Mark Complete"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                    
                    {/* Edit/Save Button */}
                    <button
                        onClick={createInput}
                        className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        title={isEditing ? "Save" : "Edit"}
                    >
                        {!isEditing ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                        )}
                    </button>
                    
                    {/* Delete Button */}
                    <button
                        onClick={removeTask}
                        className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ListTask;