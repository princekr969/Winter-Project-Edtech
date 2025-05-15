import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/index';
import { Outlet } from 'react-router-dom';

function DashboardPage() {
  console.log("Dashboard");
  
  return (
    <div className="flex max-sm:flex-col min-h-screen mt-20 sm:mb-3 bg-gray-50">
        <Sidebar />
      <main className="flex-1 p-4">
        <Outlet/>
      </main>
    </div>
  );
}

export default DashboardPage;
