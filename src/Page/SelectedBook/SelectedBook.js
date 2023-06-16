import styles from '../SearchResults/searchResults.module.scss';
import SmallLogo from '../../Componets/SmallLogo/SmallLogo';
import Breadcrumbs from '../../Componets/Breadcrumbs/Breadcrumbs';
import Table from '../../Componets/Table/Table';
import Loading from '../../Componets/Loading/Loading';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function SelectedBook() {
    const [isFeatchingData, setIsFeatchingData] = useState(true);
    const [booksData, setBooksData] = useState([]);
    const rowsSelected = useSelector((state) => state.rows.value);
    let listoflinks = [];
    let featched = false;

    async function SearchForBook() {
        if (booksData.length === 0) {
            const requests = listoflinks.map((url) => axios.get(url));
            axios.all(requests)
                .then((responses) => {
                    setBooksData(responses);
                    setIsFeatchingData(false);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    useEffect(() => {
        rowsSelected.map((rowSelected) => {
            listoflinks.push(`https://www.googleapis.com/books/v1/volumes/${rowSelected}`);
        })
        if (!featched) {
            SearchForBook();
        }
        featched = true;
    }, []);

    const column = [
        { name: 'ID', value: 'id' },
        { name: 'Title', value: 'volumeInfo.title' },
        { name: 'Authors', value: 'volumeInfo.authors' },
        { name: 'Remove', value: 'btnRemove' }
    ]

    const createObjForTable = (obj) => {
        const newArr = [];
        obj.map((object) => {
            const value = object['data'];
            if (value !== undefined) {
                newArr.push(value);
            }
        })
        return newArr
    }

    return (
        <>
            <div className={styles.topWrapper}>
                <div className={styles.logoWrapper}>
                    <SmallLogo />
                </div>
                <Breadcrumbs />
            </div>
            {!isFeatchingData && booksData.length >= rowsSelected.length ?
                <>
                    <Table booksData={createObjForTable(booksData)}
                        column={column}
                        switchValue={false}
                        isPageSelected={true} />
                </> :
                <Loading />}
        </>
    )
}

export default SelectedBook