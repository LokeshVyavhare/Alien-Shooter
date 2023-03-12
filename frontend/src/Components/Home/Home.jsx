import style from './style.module.css';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
    const navigator = useNavigate();
    return <div className={style.home}>
        <button className='button blueButton' onClick={()=>{navigator('/gameBoard')}}>Play Offline</button>
        <h2>Online Mode In devlopment, coming soon.</h2>
    </div>
}