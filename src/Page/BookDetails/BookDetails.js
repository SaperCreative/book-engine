import styles from './bookDetails.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Componets/Loading/Loading';
import Breadcrumbs from '../../Componets/Breadcrumbs/Breadcrumbs';
import SmallLogo from '../../Componets/SmallLogo/SmallLogo';

function BookDetails() {
  const [isFeatchingData, setIsFeatchingData] = useState(true);
  const [booksData, setBooksData] = useState([]);
  const navigate = useNavigate();
  const { id, getValue, site } = useParams();

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
          <div className={styles.wrapper}>
            <div className={styles.mainCard}>
              {booksData.volumeInfo.imageLinks ?
                <img src={booksData.volumeInfo.imageLinks.extraLarge ||
                  booksData.volumeInfo.imageLinks.large ||
                  booksData.volumeInfo.imageLinks.medium ||
                  booksData.volumeInfo.imageLinks.small ||
                  booksData.volumeInfo.imageLinks.smallThumbnail ||
                  booksData.volumeInfo.imageLinks.thumbnail
                } alt='preview_book' /> :
                <img src='https://i.postimg.cc/VN9VLcxk/No-picture-available.png' alt='preview_book' />}
            </div>
            <div className={styles.detailsCard}>
              <h2>{booksData.volumeInfo.title}</h2>
              <ul>
                <li>Authors: {booksData.volumeInfo.authors ?
                  booksData.volumeInfo.authors.map(author => {
                    return (
                      `${author}; `
                    )
                  })
                  : ' no data :('}
                </li>
                <li>Langue: {booksData.volumeInfo.language || 'no data :('}</li>
                <li>Type: {booksData.volumeInfo.printType || 'no data :('}</li>
                <li>Page count: {booksData.volumeInfo.printedPageCount || 'no data :('}</li>
                <li>Date of publication: {booksData.volumeInfo.publishedDate || 'no data :('}</li>
                <li>Published by: {booksData.volumeInfo.publisher || 'no data :('}</li>
                <li>Categories:{booksData.volumeInfo.categories ?
                  booksData.volumeInfo.categories.map(categorie => {
                    return (
                      ` ${categorie} `
                    )
                  }) : ' no data :('}
                </li>
              </ul>
              <div className={styles.btns}>
                <div className={styles.btn}
                  onClick={() => navigate(`/${getValue}/${site}/${id}/description`)}>
                  See description
                </div>
                <div className={styles.btn}>
                  <a href={`${booksData.volumeInfo.previewLink}`} target='_blank'>
                    {booksData.saleInfo.retailPrice ?
                      <>{booksData.saleInfo.retailPrice.amount}{booksData.saleInfo.retailPrice.currencyCode}</> :
                      <>Visit site</>
                    }
                  </a>
                </div>
              </div>
            </div>
          </div>
        </> :
        <Loading />
      }
    </>
  )
}

export default BookDetails