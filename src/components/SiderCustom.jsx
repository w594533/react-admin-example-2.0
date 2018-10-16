import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import SiderMenu from './SiderMenu';
import isEqual from 'lodash/isEqual';
import pathToRegexp from 'path-to-regexp';
import memoizeOne from 'memoize-one';
import { urlToList } from '@/utils/pathTools';

const { Sider } = Layout;

//获取菜单path 数组
export const getFlatMenuKeys = (menus) => {
	return menus.reduce((keys, item) => {
		keys.push(item.key);
		if (item.subs) {
			return keys.concat(getFlatMenuKeys(item.subs));
		}
		return keys;
	}, []);
};

//根据当前的链接，获取所有匹配的菜单[/ui, /ui/buttons]
const getDefaultCollapsedSubMenus = (props, flatMenuKeys) => {
	const { location: { pathname } } = props;
	return urlToList(pathname).map((item) => getMenuMatches(flatMenuKeys, item)[0]).filter((item) => item);
};

const getMenuMatches = memoizeOne(
	(flatMenuKeys, path) => flatMenuKeys.filter((item) => item && pathToRegexp(item).test(path)),
	isEqual
);

class SiderCustom extends Component {
	static getDerivedStateFromProps(props, state) {
		const { pathname } = state;
		if (props.location.pathname !== pathname || props.collapsed !== state.collapsed) {
			const state1 = SiderCustom.setMenuOpen(props);
			const state2 = SiderCustom.onCollapse(props.collapsed);
			return {
				...state1,
				...state2,
				firstHide: state.collapsed !== props.collapsed && props.collapsed, // 两个不等时赋值props属性值否则为false
				openKey: state.openKey || (!props.collapsed && state1.openKey)
			};
		}
		return null;
	}

	static getFlatMenuKeys = (props) => getFlatMenuKeys(props.menus);

	static setMenuOpen = (props) => {
		const { pathname } = props.location;
		const openKey = getDefaultCollapsedSubMenus(props, SiderCustom.getFlatMenuKeys(props));
		return {
			openKey,
			selectedKey: openKey.length > 0 ? openKey : [ pathname ]
		};
	};
	static onCollapse = (collapsed) => {
		return {
			collapsed,
			mode: collapsed ? 'vertical' : 'inline'
		};
	};
	constructor(props) {
		super(props);
		//初始化加载设置选中菜单和打开菜单
		const stateMenuOpen = SiderCustom.setMenuOpen(props);
		this.state = {
			...stateMenuOpen,
			collapsed: false,
			mode: 'inline',
			firstHide: false // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
		};
	}
	//是否是一级菜单
	isMainMenu = (key) => {
		const menus = this.props.menus;
		return menus.some((item) => {
			if (key) {
				return item.key === key || item.path === key;
			}
			return false;
		});
	};
	//二级菜单点击
	menuClick = (e) => {
		const flatMenuKeys = SiderCustom.getFlatMenuKeys(this.props);
		const openKey = urlToList(e.key).map((item) => getMenuMatches(flatMenuKeys, item)[0]).filter((item) => item);
		this.setState({
			openKey,
			selectedKey: [ e.key ]
		});
		const { popoverHide } = this.props; // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
		popoverHide && popoverHide();
	};
	//菜单打开或者关闭的时候
	openMenu = (openKeys) => {
		const moreThanOne = openKeys.filter((openKey) => this.isMainMenu(openKey)).length > 1;
		this.setState({
			openKey: moreThanOne ? [ openKeys.pop() ] : [ ...openKeys ],
			firstHide: false
		});
	};
	render() {
		return (
			<Sider trigger={null} breakpoint="lg" collapsed={this.props.collapsed} style={{ overflowY: 'auto' }}>
				<SiderMenu
					menus={this.props.menus}
					onClick={this.menuClick}
					theme="dark"
					mode="inline"
					selectedKeys={this.state.selectedKey}
					openKeys={this.state.firstHide ? null : this.state.openKey}
					onOpenChange={this.openMenu}
				/>
				<style>
					{`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
				</style>
			</Sider>
		);
	}
}

export default withRouter(SiderCustom);
