import { useReducer } from "react";


const UseReducer = () => {
    
    const [state, dispatch] = useReducer(reducer, 0)

    return (
        <div>
            <button onClick={() => dispatch({type: 'DEC'})}>-</button>
            <span>{state}</span>
            <button onClick={() => dispatch({type: 'INC'})}>+</button>
            <button onClick={() => dispatch({type: 'SET', payload: 100})}>100</button>
        </div>
    )
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'DEC':
            return state - 1
        case 'INC':
            return state + 1
        case 'SET':
            return action.payload
        default:
    }
}

export default UseReducer