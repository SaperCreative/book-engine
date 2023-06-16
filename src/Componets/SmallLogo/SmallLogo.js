import { useNavigate } from 'react-router-dom';
import styles from './smallLogo.module.scss';

function SmallLogo() {
    const navigate = useNavigate();
    return (
        <div className={styles.logoWrapper}
            onClick={() => navigate('/')}>
            <span>Book</span>
            <div className={styles.logo} />
            <span>Engine</span>
        </div>
    )
}

export default SmallLogo