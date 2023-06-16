import { useParams } from 'react-router-dom';
import styles from './description.module.scss';
import { useEffect, useState } from 'react';
import Loading from '../../Componets/Loading/Loading';
import axios from 'axios';
import SmallLogo from '../../Componets/SmallLogo/SmallLogo';
import Breadcrumbs from '../../Componets/Breadcrumbs/Breadcrumbs';

function Description() {
    const [isFeatchingData, setIsFeatchingData] = useState(true);
    const [booksData, setBooksData] = useState([]);
    const { id } = useParams();

    async function SearchForBook() {
        setIsFeatchingData(true);
        axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`, {
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

    return (
        <>
            {!isFeatchingData ?
                <>
                    <div className={styles.topWrapper}>
                        <SmallLogo />
                        <Breadcrumbs />
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: '<h3>Description </h3>' + (booksData.volumeInfo.description || 'no data :(') }} />
                </> :
                <Loading />}
        </>
    )
}

export default Description