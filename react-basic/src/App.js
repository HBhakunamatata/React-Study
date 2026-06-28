// 项目的根组件 其他组件都要在这个组件中进行展示
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, addToNum } from './store/modules/counterStore';
import { fetchChannelList } from './store/modules/channelStore';


function App() {

	const { count } = useSelector( state => state.counter )
	const { channelList } = useSelector( state => state.channel )

	const dispatch = useDispatch()


	useEffect(() => {
		dispatch(fetchChannelList())
	}, [dispatch])

	return (
		<div className="App">
			<button onClick={() => dispatch(decrement())}>-</button>
			{count}
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(addToNum(10))}>addTo10</button>
			<button onClick={() => dispatch(addToNum(20))}>addTo20</button>

			<br/>

			<ul>
				{channelList.map(item => <li key={item.id}>{item.name}</li>)}
			</ul>
    	</div>
	);
}

export default App;
