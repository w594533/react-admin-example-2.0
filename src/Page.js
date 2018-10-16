import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from '@/components/pages/NotFound';
import Login from '@/components/pages/Login';
import BasicLayout from '@/layouts/BasicLayout';
import MainLayout from '@/layouts/MainLayout';

export default () => (
	<Router>
		<Switch>
			<Route exact path="/" component={BasicLayout} />
			<Route path="/404" component={NotFound} />
			<Route path="/login" component={Login} />
			<Route component={BasicLayout} />
			<Route component={NotFound} />
		</Switch>
	</Router>
);
