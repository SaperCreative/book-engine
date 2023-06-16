import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';

function Breadcrumbs() {
    const location = useLocation();
    const navigate = useNavigate();
    let currentLocation = '';

    const crumbs = location.pathname
        .split('/')
        .filter(crumb => crumb !== '')
        .map((crumb, index) => {
            currentLocation += `/${crumb}`;
            return (
                <div className={styles.links} key={crumb} onClick={() => navigate(0)}>
                    {crumb==='selected'?
                    <Link to={`${index === 0 ? `/${crumb}` : currentLocation}`}>{crumb}</Link>:
                    <Link to={`${index === 0 ? `/${crumb}/0` : currentLocation}`}>{crumb}</Link>}
                </div>
            )
        }
        )
    return (
        <div className={styles.crumbs}>
            {crumbs}
        </div>
    )
}

export default Breadcrumbs