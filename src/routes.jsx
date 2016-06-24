import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app/App';
import AboutPage from './app/about/AboutPage';
import HomePage from './app/home/HomePage';
import CoursesPage from './app/courses/CoursesPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="courses" component={CoursesPage} />
        <Route path="about" component={AboutPage} />
    </Route>
);