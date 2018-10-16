import React from 'react';
import { Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const Loading = ({ isLoading, error }) => {
	if (isLoading) {
		return (
			<div style={{ textAlign: 'center', padding: '50px' }}>
				<Spin />
			</div>
		);
	} else if (error) {
		return <Redirect to="/404" />;
	} else {
		return null;
	}
};

// const requireAuth = (permission, component, auth) => {
// 	// const { auth } = this.props;
// 	const { permissions } = auth.data;
// 	// const { auth } = store.getState().httpData;
// 	if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
// 	return component;
// };

// const requireLogin = (component, permission, auth) => {
// 	// const { auth } = this.props;
// 	const { permissions } = auth.data;
// 	if (process.env.NODE_ENV === 'production' && !permissions) {
// 		// 线上环境判断是否登录
// 		return <Redirect to={'/login'} />;
// 	}
// 	return permission ? requireAuth(permission, component, auth) : component;
// };

export default (r) =>
	Loadable({
		loader: () => import(`@/components/${r.file}`),
		render(loaded, props) {
			let Component = loaded.default;
			return <Component {...props} />;
		},
		loading: Loading
	});
