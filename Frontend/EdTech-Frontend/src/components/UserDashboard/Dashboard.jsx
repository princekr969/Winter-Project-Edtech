import React from 'react'

function Dashboard() {
  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome back, Prince!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Your Learning Progress
            </h3>
            <p className="text-gray-600">
                You have 23 courses in progress
            </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Your Teaching
            </h3>
            <p className="text-gray-600">
                You have created 45 courses
            </p>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
