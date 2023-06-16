import styles from './table.module.scss';
import { useNavigate, useParams } from "react-router-dom";
import { set } from '../../Utils/Redux/store';
import { useDispatch, useSelector } from 'react-redux';

const Table = (props) => {
    const { booksData, column, switchValue, isPageSelected = false } = props;
    const { getValue, site } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rowsSelected = useSelector((state) => state.rows.value);

    const eventForRow = (id, event, pathToSearch) => {
        if (switchValue) {
            const coppyArray = [...rowsSelected];
            if (rowsSelected.includes(id)) {
                const index = coppyArray.indexOf(id);
                coppyArray.splice(index, 1);
                dispatch(set(coppyArray));
            } else {
                coppyArray.push(id);
                dispatch(set(coppyArray));
            }
        } else {
            if (event.target.innerHTML === 'Remove') {
                navigate(0);
            } else {
                if (isPageSelected) {
                    navigate(`/${pathToSearch}/0/${id}`);
                } else {
                    navigate(`/${getValue}/${site}/${id}`);
                }
            }
        }
    }

    const removeSelected = (id) => {
        const coppyArray = [...rowsSelected];
        const index = coppyArray.indexOf(id);
        coppyArray.splice(index, 1);
        dispatch(set(coppyArray));
    }

    return (
        <table>
            <thead>
                <tr>
                    {column.map((columns) => (
                        <HeadTable columnName={columns.name}
                            key={columns.name} />
                    ))}
                </tr>
            </thead>
            <tbody>
                {booksData.map((bookData) => (
                    <RowTable data={bookData}
                        column={column}
                        eventForRow={eventForRow}
                        key={bookData.id}
                        rowsSelected={rowsSelected}
                        removeSelected={removeSelected} />
                ))}
            </tbody>
        </table>
    )


}

export default Table

const HeadTable = ({ columnName }) => <th className={columnName === 'Remove' ? styles.selectedRemove : ''}>{columnName}</th>

const RowTable = ({ data, column, eventForRow, rowsSelected, removeSelected }) => (
    <>
        {
            <tr onClick={(e) => eventForRow(data.id, e, data[column[0].value])}>
                {column.map((columnItem) => {
                    if (columnItem.value.includes('.')) {
                        const splitValue = columnItem.value.split('.');
                        return <td className={rowsSelected.includes(data.id) ? styles.selectedRow : ''}>
                            {data[splitValue[0]][splitValue[1]]}
                        </td>
                    }
                    if (columnItem.value === 'btnRemove') {
                        return <td className={`${styles.selectedRow} ${styles.selectedRemove}`}
                            onClick={() => removeSelected(data.id)}>
                            Remove
                        </td>
                    }
                    return <td className={rowsSelected.includes(data.id) ? styles.selectedRow : ''}>
                        {data[`${columnItem.value}`]}
                    </td>
                })}
            </tr>
        }
    </>
)
