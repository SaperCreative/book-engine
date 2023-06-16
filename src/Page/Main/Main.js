import { useState } from "react";
import SearchBar from "../../Componets/SearchBar/SearchBar";
import { useNavigate } from 'react-router-dom';
import styles from './main.module.scss';

const Main = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <div className={styles.logoWrapper}>
                Book
                <div className={styles.logo} />
                Engine
            </div>
            <SearchBar searchValue={searchValue}
                setSearchValue={setSearchValue}
                navigate={navigate} />
        </div>
    )
}

export default Main