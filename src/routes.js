import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed';
import TagFeed from './pages/TagFeed';
import YourFeed from './pages/YourFeed';
import Article from './pages/Article';
import Authentication from './pages/Authentication';

export default () => {
  return (
    <Routes>
      <Route path="/" element={<GlobalFeed />} />
      <Route path="/tags/:slug" element={<TagFeed />} />
      <Route path="/feed" element={<YourFeed />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication />} />
      <Route path="/articles/:slug" element={<Article />} />
    </Routes>
  );
};
