import style from './style.module.css';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { BsRocketFill } from 'react-icons/bs'
import { AiFillHeart, AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { GiAlienSkull, GiFireSilhouette, GiHelp } from 'react-icons/gi'
import { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { VscDebugRestart } from 'react-icons/vsc'

const gridI = [];

for (let i = 0; i < 30; i++) {

    let arr = [];

    for (let j = 0; j < 10; j++) {
        arr.push(null);
    }

    gridI.push(arr);
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function appendBugs(grid, setScore, setLife, EndGame) {
    grid = [...grid]
    const gridI = [];

    for (let i = 0; i <= 9; i++) {
        if (grid[29][i] === "B") {
            setLife(prev => {
                if (prev.length === 1) {
                    EndGame();
                }
                prev.pop();
                return prev;
            })

            break;
        }
    }


    for (let i = 0; i < 29; i++) {

        let arr = new Array(10).fill(null);

        gridI.push(arr);
    }

    for (let i = 0; i < 29; i++) {
        for (let j = 0; j < 10; j++) {
            if (grid[i + 1][j] === "M" && grid[i][j] === "B") {
                gridI[i][j] = null;
                grid[i + 1][j] = null;
                setScore(prev => prev + 1)


            } else if (grid[i][j] === "B") {
                gridI[i][j] = grid[i][j];
            }
        }
    }


    let bugPos = randomNumber(0, 9);

    let newRow = new Array(10).fill(null);
    newRow[bugPos] = "B";

    gridI.unshift(newRow);

    return gridI;

}
function appendEmptyRow(grid, setScore, setLife, EndGame) {
    grid = [...grid]
    const gridI = [];


    for (let i = 0; i <= 9; i++) {
        if (grid[29][i] === "B") {
            setLife(prev => {
                if (prev.length === 1) {
                    EndGame();
                }
                prev.pop();
                return prev;
            })
            break;
        }
    }

    for (let i = 0; i < 29; i++) {

        let arr = new Array(10).fill(null);

        gridI.push(arr);
    }

    for (let i = 0; i < 29; i++) {
        for (let j = 0; j < 10; j++) {
            if (grid[i + 1][j] === "M" && grid[i][j] === "B") {
                gridI[i][j] = null;
                grid[i + 1][j] = null;
                setScore(prev => prev + 1)

            } else if (grid[i][j] === "B") {
                gridI[i][j] = grid[i][j];
            }
        }
    }




    let newRow = new Array(10).fill(null);


    gridI.unshift(newRow);

    return gridI;
}
function setFire(grid, x, y, c, setScore) {
    grid = [...grid];
    grid[x][y] = null;

    if (x === 0) {
        clearInterval(c.current);
        c.current = null
        return grid
    }

    if (grid[x - 1][y] === "B") {
        grid[x - 1][y] = null;
        setScore(prev => prev + 1)


        clearInterval(c.current);
        c.current = null
        return grid
    } else {
        grid[x - 1][y] = "M";
    }

    return grid;
}
function seizeFire(grid, x, y) {
    grid = [...grid];
    grid[x][y] = null;
    return grid;
}

export default () => {

    const [grid, setGrid] = useState(gridI);
    const [coOrd, setCoOrd] = useState([29, 0]);
    const [pause, setPause] = useState(true);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState([1, 1, 1]);
    const [audio, setAudio] = useState(false);
    const [showIns, setShowIns] = useState(false)
    const fireRef = useRef(null);
    const gridRef = useRef(null);
    const griD = useRef(null);

    const handleLeft = () => {
        setCoOrd(([i, j]) => {
            if (j > 0) {
                j--;
            }
            return [i, j]
        })
    }
    const handleRight = () => {
        // setDir("90deg")
        setCoOrd(([i, j]) => {
            if (j < 9) {
                j++;
            }
            return [i, j]
        })
    }
    const handleFire = () => {



        if (fireRef.current) {
            return
        }

        const prev = [...coOrd];
        fireRef.current = setInterval(() => {
            const [x, y] = prev;
            setGrid(prev => setFire(prev, x, y, fireRef, setScore));
            prev[0] = x - 1;

        }, 50)



    }
    const handleReset = () => {
        setGrid(gridI);
        setCoOrd([29, 0]);
        clearInterval(fireRef);
        clearInterval(gridRef);
        setScore(0);
        setLives([1, 1, 1]);
        setAudio(false);
        setPause(true);

    }
    const handleKeyDown = (e) => {
        griD.current.focus();
        const { keyCode } = e
        switch (keyCode) {
            case 16: {

                setPause(prev => !prev);
                return
            }
            case 37: {
                if (pause) {
                    return;
                }

                handleLeft();
                return
            }
            case 32: {
                e.preventDefault();
                if (pause) {
                    return;
                }

                handleFire();
                return
            }
            case 39: {
                if (pause) {
                    return;
                }

                handleRight();
                return
            }
            // case 40:{
            //     handleDown();
            //     return
            // }
        }
    }
    const EndGame = () => {
        alert("You Lost")
        handleReset();
    }

    useEffect(() => {

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [coOrd, pause])

    useEffect(() => {
        if (!gridRef.current && !pause) {
            let a = 0;
            setGrid(prev => appendBugs(prev));
            gridRef.current = setInterval(() => {

                if (a === 1) {
                    setGrid(prev => appendBugs(prev, setScore, setLives, EndGame));
                    a = 0;
                } else {
                    setGrid(prev => appendEmptyRow(prev, setScore, setLives, EndGame));
                    a++;
                }
            }, 1000)
        }

        return () => {
            clearInterval(gridRef.current);
            gridRef.current = null;
        }
    }, [pause])


    return <div className={style.runner}>
        <div>
            {pause?<div className={style.notice}>
                <h2>Game Paused</h2>
                <button className='button blueButton'  onClick={()=>{setPause(prev=>!prev)}}>{pause?<CiPlay1/>:<CiPause1/>}</button>                
            </div>:""}
            <div className={style.scorePanel}>
                <h2>Score: {score}</h2>
                <div>{lives.map((e, i) => <AiFillHeart className={style.lifeHeart} key={`lifeHeart${i}`}/>)}</div>
            </div>
            <div className={style.grid} ref={griD}>
            {
                grid.map((row, x) => {
                    
                        return row.map((block, y) => {
                                return <div className={style.block} key={y + "columnGrid"}>
                                    {x === coOrd[0] && y === coOrd[1] ?
                                        
                                            <BsRocketFill className={style.rocket} />
                                        
                                        : block === "M" ?
                                            

                                                <GiFireSilhouette className={style.misA} />

                                            
                                            : ""}

                                    {
                                        block === "B" ?
                                            
                                                <GiAlienSkull className={style.buggy} />
                                            
                                            : ""
                                    }
                                </div>
                            }
                            )
                        
                    
                })
            }
            </div>
        </div>
        <div className={style.buttonBox}>

                <button className={`button greenButton ${style.help}`} greenButton onClick={()=>(setShowIns(prev=>!prev))}><GiHelp/></button>
                {showIns?<ul>
                    
                    <li>(Shift): start/pause game</li>
                    <li>(leftArrowKey): move left</li>
                    <li>(rightArrowKey): move right</li>
                    <li>(space): fire</li>
                </ul>:""}
                <div className={style.priControl}>

                    <button className='button blueButton' >{audio?<HiSpeakerWave/>:<HiSpeakerXMark/>}</button>
                    <button className='button blueButton' onClick={handleReset}>{<VscDebugRestart/>}</button>
                    <button className='button blueButton'  onClick={()=>{setPause(prev=>!prev)}}>{pause?<CiPlay1/>:<CiPause1/>}</button>

                </div>


                <div className={style.moves}>

                    <button className='button blueButton' disabled={pause}  onClick={()=>{handleLeft()}}><AiFillCaretLeft/></button>
                    <button className='button redButton' disabled={pause}  onClick={()=>{handleFire()}}><GiFireSilhouette className={style.fire2}/></button>
                    <button className='button blueButton' disabled={pause}  onClick={()=>{handleRight()}}><AiFillCaretRight/></button>

                </div>



        </div>
    </div>
}


/*


        
*/