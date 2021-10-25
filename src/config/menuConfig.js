import {
    HomeOutlined,
    AppstoreOutlined,
    MailOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
    AreaChartOutlined,
    PieChartOutlined,
    LineChartOutlined,
    BarChartOutlined
} from '@ant-design/icons';

const menuList = [
    {
        key:'/admin/home',
        name:'首页',
        icon:<HomeOutlined/>,
    },
    {
        key:'/admin/product',
        name:'商品',
        icon:<AppstoreOutlined/>,
        children: [
                {
                    key:'/admin/category',
                    name:'品类管理',
                    icon:<MailOutlined/>,
                },
                {
                    key:'/admin/product1',
                    name:'商品管理',
                    icon:<MailOutlined/>,
                }
        ]
    },
    {
        key:'/admin/user',
        name:'用户管理',
        icon:<UserOutlined/>,
    },
    {
        key:'/admin/role',
        name:'角色管理',
        icon:<SafetyCertificateOutlined/>,
    },
    {
        key:'/admin/chart',
        name:'图形图表',
        icon:<AreaChartOutlined/>,
        children: [

                {
                    key:'/admin/chart/pie',
                    name:'百分比图',
                    icon:<PieChartOutlined/>
                },
                {
                    key:'/admin/chart/line',
                    name:'线性图',
                    icon:<LineChartOutlined/>
                },
                {
                    key:'/admin/chart/bar',
                    name:'柱形图',
                    icon:<BarChartOutlined/>
                },
        ]
    },
];

export default menuList;