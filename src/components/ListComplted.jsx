import React from "react";

function ListCompleted(props) {
    const reuseTask = () => {
        props.restoreTask(props.index);
    };

    const removeTask = () => {
        props.deleteTask(props.index, 'completed');
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 hover:bg-green-50 transition-colors">
                <span className="text-gray-600 text-lg flex-grow line-through">
                    {props.task}
                </span>
                
                <div className="flex space-x-2 ml-4">
                    {/* Restore Button */}
                    <button
                        onClick={reuseTask}
                        className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        title="Restore Task"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                    
                    {/* Delete Button */}
                    <button
                        onClick={removeTask}
                        className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        title="Delete Permanently"
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

export default ListCompleted;