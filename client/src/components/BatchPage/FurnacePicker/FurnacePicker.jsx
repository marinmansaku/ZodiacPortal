import { Box, Button } from '@mui/material';
import styles from './FurnacePicker.module.css'

function FurnacePicker ({style, furnaces, setFurnace}) {
    return(
        <Box className={styles.holder} style={style}>
            <Button variant="contained" onClick={() => setFurnace(furnaces.ROT1)}>Furra rotative e vogël</Button>
            <Button variant="contained" onClick={() => setFurnace(furnaces.ROT2)}>Furra rotative e madhe</Button>
            <Button variant="contained" onClick={() => setFurnace(furnaces.CIF1)}>Furra Cife 1</Button>
            <Button variant="contained" onClick={() => setFurnace(furnaces.CIF2)}>Furra Cife 2</Button>
        </Box>
    )
}

export default FurnacePicker;