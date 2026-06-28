import './style.css'
import { Tabs } from 'antd-mobile'
import { useTab } from './useTab'


const Home = () => {
    
    const { channels } = useTab()

    return (
        <div className='tabContainer'>
            <Tabs>
                {channels.map(
                    (item) => (
                        <Tabs.Tab title={item.name} key={item.id}>
                            {/* list组件 */}
                        </Tabs.Tab>
                    )
                )}
            </Tabs>
        </div>
    )
}

export default Home