import React from 'react'
import { useState } from 'react'
import '../assets/Landing.css'
import Login from './Login'
import Learnmore from './Learnmore'

const Landing = () => {

    const [isLogin, setIsLogin] = useState(false)
    const [isLearnmore, setIsLearnmore] = useState(false)

    return (
        <div className='z-0'>
            <section>
                <div className="wave">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className="content">
                    <h2>Innovative Coach</h2>
                    <p>" Empowering Your Ideas To Reality "</p>
                    <div className="buttons">
                        <button className='btn1'
                            onClick={() => setIsLogin(true)}
                        >Get Started <i className='bi bi-arrow-right'></i></button>
                        <button className='btn2'
                            onClick={() => setIsLearnmore(true)}
                        >Learn More</button>
                    </div>
                </div>
            </section>

            {isLogin && <Login onClose={() => setIsLogin(false)} />}
            {isLearnmore && <Learnmore onClose={() => setIsLearnmore(false)} />}
        </div>
    )
}

export default Landing