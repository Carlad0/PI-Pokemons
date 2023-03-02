import style from './Landing.module.css';

const Landing = () => {
    return (
        
        <div className={style.container}>
            <h1 className={style.text}>Pokemon Landing Page</h1>
            <a href='/home' className={style.button}>
                <span>Home</span>
            </a>
        </div>
        
    )
}

export default Landing;