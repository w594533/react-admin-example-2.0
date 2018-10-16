import React, { Component } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import Step1 from './step1';
import Step2 from './step2';

export default class StepForm extends Component {
	render() {
		return (
			<div>
				分步表单路由演示
				<Link to="/form/step-form/step1">第一步</Link>
				<Link to="/form/step-form/step2">第二步</Link>
				<Switch>
					<Redirect exact from="/form/step-form" to="/form/step-form/step1" />
					<Route exact path="/form/step-form/step1" component={Step1} />
					<Route exact path="/form/step-form/step2" component={Step2} />
				</Switch>
			</div>
		);
	}
}
