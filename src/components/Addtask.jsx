// File: AddTask.js (rename the file to match)
import React, { useState } from "react";

function AddTask(props) {
    const [value, setValue] = useState('');

    const addItem = () => {
        props.addTask(value.trim());  
        setValue('');
    };

    return (
        <div className="mt-5 py-5">
            <div className="flex justify-center items-center">
                <input 
                    type="text" 
                    value={value}  
                    className="w-64 px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                    placeholder="Add task..."
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                />
                <button 
                    className="ml-3 px-4 py-2 border-2 border-green-600 bg-green-600 text-white rounded-lg hover:bg-green-50 hover:text-green-700 hover:border-green-600 transition-colors duration-200"
                    onClick={addItem}
                >
                    Add Task
                </button>
            </div>
        </div>
    );
}

export default AddTask;