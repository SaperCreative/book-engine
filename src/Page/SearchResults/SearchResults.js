import axios from 'axios';
import { useEffect, useState } from "react";
import Table from "../../Componets/Table/Table";
import Loading from "../../Componets/Loading/Loading";
import SearchBar from "../../Componets/SearchBar/SearchBar";
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../../Componets/Breadcrumbs/Breadcrumbs';
import styles from './searchResults.module.scss';
import SmallLogo from '../../Componets/SmallLogo/SmallLogo';
import Switch from '../../Componets/Switch/Switch';
import { useSelector } from 'react-redux';


const SearchResults = () => {
    const { getValue, site } = useParams();
    const [booksData, setBooksData] = useState([]);
    const [isFeatchingData, setIsFeatchingData] = useState(true);
    const [searchValue, setSearchValue] = useState(getValue);
    const navigate = useNavigate();
    const switchValueSelector = useSelector((state) => state.switch.value);

    async function SearchForBook() {
        axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: searchValue,
                startIndex: site,
            },
        })
            .then((res) => {
                setBooksData(res.data);
                setIsFeatchingData(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        SearchForBook();
    }, []);

    const column = [
        { name: 'ID', value: 'id' },
        { name: 'Title', value: 'volumeInfo.title' },
        { name: 'Authors', value: 'volumeInfo.authors' },
    ]

    const switchSite = (type) => {
        const maxValue = booksData.totalItems / 10;
        if (type && !(site - 10 < 0)) {
            navigate(`/${getValue}/${Number(site) - 10}`);
            navigate(0);
        } else if (!type && !(Number(site) + 10 > maxValue + 9)) {
            navigate(`/${getValue}/${Number(site) + 10}`);
            navigate(0);
        }
    }

    return (
        <>
            <div className={styles.topWrapper}>
                <div className={styles.logoWrapper}>
                    <SmallLogo />
                    <Switch />
                </div>
                <div className={styles.box}>
                    <SearchBar searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        SearchForBook={SearchForBook}
                        navigate={navigate} />
                </div>
                <Breadcrumbs />
            </div>
            {!isFeatchingData ?
                <>
                    <Table booksData={booksData.items}
                        column={column}
                        switchValue={switchValueSelector} />
                    <div className={styles.bottomWrapper}>
                        <div className={styles.btn}
                            onClick={() => switchSite(true)}>
                            {'<'}
                        </div>
                        <div className={styles.btn}
                            onClick={() => switchSite(false)}>
                            {'>'}
                        </div>
                    </div>
                </> :
                <Loading />}
        </>
    )
}

export default SearchResults