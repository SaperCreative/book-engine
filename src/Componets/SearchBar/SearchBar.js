import styles from './searchBar.module.scss';

const SearchBar = (props) => {
    const { searchValue, setSearchValue, navigate } = props;

    const onKeyUpEvent = (event) => {
        if (event.key === 'Enter') {
            navigate(`/${searchValue}/0`);
            navigate(0);
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    value={searchValue}
                    placeholder='Search for book...'
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyUp={onKeyUpEvent} />
                <div className={styles.btn}
                    onClick={() => {
                        navigate(`/${searchValue}/0`);
                        navigate(0);
                    }} />
            </div>
        </div>
    )
}

export default SearchBar