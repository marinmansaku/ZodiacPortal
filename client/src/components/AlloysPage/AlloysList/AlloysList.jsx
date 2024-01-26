import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../api";
import styles from './AlloysList.module.css';
import CalculateIcon from '@mui/icons-material/Calculate';
import NotesIcon from '@mui/icons-material/Notes';
import CancelIcon from '@mui/icons-material/Cancel';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

function AlloysList () {

    const elements = [
        'Si','Fe','Cu','Mn','Mg','Cr','Ni','Zn','Ti','Be','Ca','Na','P','Pb','Sb','Sn','Sr'
    ];

    const [alloys, setAlloys] = useState([]);

    const [selectedNotes, setSelectedNotes] = useState('');
    const [displayNotes, setDisplayNotes] = useState('none');

    useEffect(() => {
        loadAlloys();
    },[]);

    const loadAlloys = () => {
        api.getAlloys().then((res) => {
            setAlloys(res.data);
        });
    }

    return (
        <div>
            <div style={{display: displayNotes}}>
                <div className={styles.popup} onClick={() => setDisplayNotes('none')}>
                    
                </div>
                <div className={styles.notes}>
                    <DisabledByDefaultIcon fontSize="large" className={styles.closeIcon} color="error" onClick={() => setDisplayNotes('none')}></DisabledByDefaultIcon>
                    <p>{selectedNotes}</p>
                </div>
            </div>
            <TableContainer className={styles.tableContainer}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Marka</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Kompania</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Si</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Fe</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Cu</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Mn</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Mg</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Cr</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Ni</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Zn</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Ti</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Be</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Ca</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Na</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>P</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Pb</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Sb</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Sn</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Sr</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Formula</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Shënime</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            alloys.map((alloy, index) => {
                                return(
                                    <TableRow id={index}>
                                        <TableCell style={{fontSize: 12, fontWeight: 400, border: '1px solid lightgray', textAlign: 'center'}}>{alloy.alloy}</TableCell>
                                        <TableCell style={{fontSize: 12, fontWeight: 400, border: '1px solid lightgray', textAlign: 'center'}}>{alloy.company}</TableCell>
                                        {
                                            elements.map((element, index) => {
                                                return(
                                                    <TableCell className={styles.cell} id={index} style={{fontSize: 10, fontWeight: 400, textAlign: 'center'}}>{alloy.values[element].min + ' ' + alloy.values[element].sign + ' ' + alloy.values[element].max + ' %'}</TableCell>
                                                )
                                            })
                                        }
                                        <TableCell style={{fontSize: 12, fontWeight: 400, border: '1px solid lightgray', textAlign: 'center'}}>{alloy.formula ? <CalculateIcon style={{cursor: 'pointer'}}></CalculateIcon> : ''}</TableCell>
                                        <TableCell style={{fontSize: 12, fontWeight: 400, border: '1px solid lightgray', textAlign: 'center'}}>{<NotesIcon style={ alloy.notes ? {cursor: 'pointer'} : {display: 'none'}} onClick={() => {setSelectedNotes(alloy.notes); setDisplayNotes('block')}}></NotesIcon>}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AlloysList;