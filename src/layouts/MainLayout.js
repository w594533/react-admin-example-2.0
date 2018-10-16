import React, { Component } from 'react';
import { Layout } from 'antd';
import '@/style/index.less';
import SiderCustom from '@/components/SiderCustom';
import HeaderCustom from '@/components/HeaderCustom';
import { receiveData } from '@/store/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from '@/routes';
import routesConfigs from '@/routes/config';
const { Content, Footer } = Layout;

class MainLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false
		};
	}

	componentWillMount() {
		const { receiveData } = this.props;
		const user = JSON.parse(localStorage.getItem('user'));
		user && receiveData(user, 'auth');
		// // receiveData({a: 213}, 'auth');
		// // fetchData({funcName: 'admin', stateName: 'auth'});
		this.getClientWidth();
		// window.onresize = () => {
		// 	console.log('屏幕变化了');
		// 	this.getClientWidth();
		// 	// console.log(document.body.clientWidth);
		// };
	}

	componentDidMount() {

	}

	getClientWidth = () => {
		// 获取当前浏览器宽度并设置responsive管理响应式
		const { receiveData } = this.props;
		const clientWidth = document.body.clientWidth;
		receiveData({ isMobile: clientWidth <= 992 }, 'responsive');
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	render() {
		const { auth, responsive } = this.props;
		return (
			<Layout>
				<HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}} menu={routesConfigs.main} />
				<Layout>
					<Layout style={{ padding: '0 24px 24px' }}>
						<Content>
							<Routes routesConfig={routesConfigs.main} auth={auth} />
						</Content>
					</Layout>
				</Layout>

				{/* {
                    responsive.data.isMobile && (   // 手机端对滚动很慢的处理
                        <style>
                        {`
                            #root{
                                height: auto;
                            }
                        `}
                        </style>
                    )
                } */}
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	const { auth = { data: {} }, responsive = { data: {} } } = state.httpData;
	return { auth, responsive };
};
const mapDispatchToProps = (dispatch) => ({
	receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
