import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed';
import Article from './pages/Article';
import Authentication from './pages/Authentication';

export default () => {
  return (
    <Routes>
      <Route path="/" element={<GlobalFeed />} exact />
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication />} />
      <Route path="/article/:slug" element={<Article />} />
    </Routes>
  );
};