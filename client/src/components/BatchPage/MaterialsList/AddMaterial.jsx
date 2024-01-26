import styles from './MaterialsList.module.css'
import ControlPointIcon from '@mui/icons-material/ControlPoint';

function AddMaterial ({materialsList, furnaces, selectedFurnace, addRow}) {
    return(
        <div className={styles.addIconHolder}>
            <ControlPointIcon fontSize='large' className={styles.addButton} onClick={() => addRow()}/>
        </div>  
    )
}

export default AddMaterial;