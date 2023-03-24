import style from './NavBar.module.css';


const NavBar = () => {
    return (
        <div className={style.NavBarContainer}>
            <a href="/home" className={style.btn}>
                <span>
                    HOME
                </span>
            </a>
            <a href="/create" className={style.btn}>
                <span>
                    FORM
                </span>
            </a>
        </div>
    )
}

export default NavBar;