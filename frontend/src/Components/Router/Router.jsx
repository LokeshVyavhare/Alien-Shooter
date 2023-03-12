import {Route, Routes} from 'react-router-dom'
import {Home} from '../Home/Home';
import GameBoard from '../Tools/GameBoard/GameBoard';

export const Router = () => {
    return <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/gameBoard' element={<GameBoard/>}></Route>
    </Routes>
}