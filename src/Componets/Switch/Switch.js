import styles from './switch.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionSwitch } from '../../Utils/Redux/store';
import { useNavigate } from 'react-router-dom';

function Switch() {
    const switchValueSelector = useSelector((state) => state.switch.value);
    const [switchValue, setSwitchValue] = useState(switchValueSelector);
    const rowsSelected = useSelector((state) => state.rows.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const switchEvent = () => {
        setSwitchValue(!switchValue);
        dispatch(actionSwitch(!switchValue));
    }

    return (
        <>
            <div className={styles.switch}
                onClick={() => switchEvent()}>
                <input type="checkbox"
                    checked={switchValue} />
                <span className={styles.slider}></span>
                <div className={styles.info}>
                    Save the book for later by turning it on and clicking on the book.
                </div>
            </div>
            {rowsSelected.length > 0 ?
                <span className={styles.numberOfBook}
                    onClick={() => navigate('/selected')}>
                    {rowsSelected.length}
                </span> :
                ''}
            { }
        </>
    )
}

export default Switch