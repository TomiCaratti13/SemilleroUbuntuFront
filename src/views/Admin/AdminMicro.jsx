import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

export function AdminMicro() {
  return (
    <div>
      AdminMicro
      <main>
        <Outlet />
      </main>
    </div>
  );
}