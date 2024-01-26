import { Button, Grid, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useState } from 'react';
import styles from './MaterialsPicker.module.css';

function MaterialsPicker ({emptyRow, setEmptyRow}) {

    const [active,setActive] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const materials = [
        {id: 1, primary: 'Lastër', secondary: 'Lastër e përpunuar te linja e mullirit'},
        {id: 2, primary: 'Profil', secondary: 'Profil i përpunuar te linja e mullirit'},
        {id: 3, primary: 'Kanace'},
        {id: 4, primary: 'Letër pa Cu (1)', secondary: 'Letër me Cu=0.02'},
        {id: 5, primary: 'Letër pa Cu (2)', secondary: 'Letër me Cu=0.00'},
        {id: 6, primary: 'Letër me Cu (Cimoza)'}
    ]

    const openPopup = () => {
        setActive(true);
    }

    const closePopup = () => {
        setActive(false);
        setSelectedIndex(null);
    }

    const selectMaterial = () => {
        setEmptyRow({...emptyRow, material: materials[selectedIndex].primary});
        closePopup();
    }

    return(
        active ?
            <div>
                <Button variant="contained" style={{marginTop: '0px !important', width: '100%'}}> Zgjidh Materialin </Button>
                <div className={styles.menu}></div>
                <Box className={styles.box}>
                    <div className={styles.searchHolder}>   
                        <TextField className={styles.search} size={'small'} id="outlined-basic" label="Kerko një material" variant="outlined" />
                    </div>
                    <div className={styles.listHolder}>
                        <List dense={true}>
                            {
                                materials.map((material) => (
                                    <ListItemButton className={styles.li} selected={selectedIndex === material.id-1} onClick={() => setSelectedIndex(material.id-1)}>
                                        <ListItemText
                                            primary={material.primary}
                                            secondary={material.secondary}
                                        >
                                        </ListItemText>
                                    </ListItemButton>
                                ))
                            }
                        </List>
                        <div className={styles.buttonsHolder}>
                            <Button variant={'outlined'} color={'error'} onClick={() => closePopup()}>Hiq</Button>
                            <Button variant={selectedIndex != null ? 'outlined' : 'disabled'} onClick={() => selectMaterial()}>Zgjidh</Button>
                        </div>
                    </div>
                </Box>
            </div>
        :
            <Button variant="contained" style={{marginTop: '0px !important', width: '100%'}} onClick={() => openPopup()}> Zgjidh materialin </Button>
        
    )
}

export default MaterialsPicker;