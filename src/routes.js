import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed';
import TagFeed from './pages/TagFeed';
import YourFeed from './pages/YourFeed';
import Article from './pages/Article';
import Authentication from './pages/Authentication';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import Settings from './pages/Settings';

export default () => {
  return (
    <Routes>
      <Route path="/" element={<GlobalFeed />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication />} />
      <Route path="/tags/:slug" element={<TagFeed />} />
      <Route path="/feed" element={<YourFeed />} />
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="/articles/new" element={<CreateArticle />} />
      <Route path="/articles/:slug/edit" element={<EditArticle />} />
    </Routes>
  );
};
