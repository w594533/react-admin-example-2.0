export default {
	menus: [
		// 菜单相关路由
		{
			key: '/',
			title: '首页',
			icon: 'mobile',
			file: 'dashboard/Dashboard'
		},
		{
			key: '/ui',
			title: 'UI',
			icon: 'scan',
			subs: [
				{ key: '/ui/buttons', title: '按钮', component: 'Buttons', file: 'ui/Buttons' },
				{ key: '/ui/icons', title: '图标', component: 'Icons', file: 'ui/Icons' },
				{ key: '/ui/spins', title: '加载中', component: 'Spins', file: 'ui/Spins' },
				{ key: '/ui/modals', title: '对话框', component: 'Modals', file: 'ui/Modals' },
				{ key: '/ui/notifications', title: '通知提醒框', component: 'Notifications', file: 'ui/Notifications' },
				{ key: '/ui/tabs', title: '标签页', component: 'Tabs', file: 'ui/Tabs' },
				{ key: '/ui/banners', title: '轮播图', component: 'Banners', file: 'ui/banners/index' },
				{ key: '/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle', file: 'ui/Wysiwyg' },
				{ key: '/ui/drags', title: '拖拽', component: 'Drags', file: 'ui/Draggable' },
				{ key: '/ui/gallery', title: '画廊', component: 'Gallery', file: 'ui/Gallery' },
				{ key: '/ui/map', title: '地图', component: 'MapUi', file: 'ui/map/index' }
			]
		},
		{
			key: '/animation',
			title: '动画',
			icon: 'rocket',
			subs: [
				{
					key: '/animation/basicAnimations',
					title: '基础动画',
					component: 'BasicAnimations',
					file: 'animation/BasicAnimations'
				},
				{
					key: '/animation/exampleAnimations',
					title: '动画案例',
					component: 'ExampleAnimations',
					file: 'animation/ExampleAnimations'
				}
			]
		},
		{
			key: '/form',
			title: '表单',
			icon: 'form',
			subs: [
				{
					key: '/form/basic-form',
					title: '基础表单',
					file: 'form/BasicForm'
				},
				{
					key: '/form/step-form',
					title: '分步表单',
					exact: false,
					file: 'form/StepForm/index',
					hideChildrenInMenu: true,
					subs: [
						{
							key: '/form/step-form/step1',
							title: '第一步',
							file: 'form/StepForm/Step1'
						},
						{
							key: '/form/step-form/step2',
							title: '第二步',
							file: 'form/StepForm/Step2'
						}
					]
				}
			]
		},
		{
			key: '/table',
			title: '一级菜单',
			icon: 'table',
			subs: [
				{
					key: '/table/basic-table',
					title: '二级菜单1',
					file: 'form/BasicForm'
				},
				{
					key: '/table/other-table',
					title: '二级菜单2',
					subs: [
						{
							key: '/table/other-table/first',
							title: '三级',
							file: 'animation/ExampleAnimations'
						}
					]
				}
			]
		},
		// {
		// 	key: '/chart',
		// 	title: '图表',
		// 	icon: 'area-chart',
		// 	subs: [
		// 		{ key: '/chart/echarts', title: 'echarts', component: 'Echarts', file: 'charts/Echarts' },
		// 		{ key: '/chart/recharts', title: 'recharts', component: 'Recharts', file: 'charts/Recharts' }
		// 	]
		// },
		{
			key: '/auth',
			title: '权限管理',
			icon: 'safety',
			subs: [
				{ key: '/auth/basic', title: '基础演示', component: 'AuthBasic', file: 'auth/Basic' },
				{
					key: '/auth/routerEnter',
					title: '路由拦截',
					component: 'RouterEnter',
					auth: 'auth/testPage',
					file: 'auth/RouterEnter'
				}
			]
		},
		{
			key: '/cssModule',
			title: 'cssModule',
			icon: 'star',
			component: 'Cssmodule',
			file: 'cssmodule'
		}
	],
	others: [], // 非菜单相关路由
	main: [
		{
			key: '/',
			title: 'CMDB',
			icon: 'star',
			file: 'main/MainEdit'
		}
	]
};
