import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { getBillList } from "@/store/modules/billStore"
import { useDispatch } from "react-redux"
import { NavBar, TabBar } from 'antd-mobile'
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  MemoryRouter as Router,
} from 'react-router-dom'
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'


const onChange = key => {
  console.log(key);
};

const Layout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])
    const [activeKey, setActiveKey] = useState('todo')
    const history = useHistory()
    const location = useLocation()
    const { pathname } = location

    const setRouteActive = (value) => {
        history.push(value)
    }

    const tabs = [
        {
            key: '/home',
            title: '首页',
            icon: <AppOutline />,
        },
        {
            key: '/todo',
            title: '待办',
            icon: <UnorderedListOutline />,
        },
        {
            key: '/message',
            title: '消息',
            icon: <MessageOutline />,
        },
        {
            key: '/me',
            title: '我的',
            icon: <UserOutline />,
        },
    ]

    return (
        <div>
            <Outlet/>
            <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>
    )
}

export default Layout