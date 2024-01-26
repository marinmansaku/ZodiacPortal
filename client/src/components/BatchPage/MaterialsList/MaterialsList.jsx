import { Box, Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import AddMaterial from './AddMaterial';
import styles from './MaterialsList.module.css'
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MaterialsPicker from '../MaterialsPicker/MaterialsPicker';
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';

function MaterialsList ({style, materialsList, furnaces, selectedFurnace}) {

    const [rowItems, setRowItems] = useState([
        {
            id: 0,
            time: '12:34',
            material: 'Letër me Cu (Cimoza)',
            weight: 750,
            totalWeight: 750,
            nacl: 50,
            kcl: 0,
            criolite: 10,
            fl: 0 
        }
    ])

    const [emptyRow, setEmptyRow] = useState({
        id: null,
        time: '',
        material: '',
        weight: 0,
        totalWeight: 0,
        nacl: 0,
        kcl: 0,
        criolite: 0,
        fl: 0
    });
    const [emptyRowActive, setEmptyRowActive] = useState(false);

    function addEmptyRow() {
        setEmptyRowActive(true);
    }

    function addRow() {
        const newRows = [...rowItems];
        newRows.push(emptyRow);
        setRowItems(newRows);
        setEmptyRowActive(false);
        setEmptyRow({
            id: rowItems[rowItems.length-1].id+1,
            time: '',
            material: '',
            weight: 0,
            totalWeight: 0,
            nacl: 0,
            kcl: 0,
            criolite: 0,
            fl: 0
        });
    }

    function deleteRow(index) {
        const newRows = [...rowItems];
        newRows.splice(index,1);
        setRowItems(newRows);
    }

    function calculateTotalWeight(weight, index) {
        let totalWeight = 0;
        if(rowItems.length != 0){
            totalWeight = rowItems[rowItems.length-1].totalWeight + parseInt(weight);
        }
        return totalWeight;
    }

    return(
        <div style={style} className={styles.tableContainer}>
            <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Ngarkesa</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600, 'min-width' : '100px'}}>Ora</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600, 'min-width' : '150px'}}>Materiali</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600}}>Pesha&nbsp;</TableCell>
                            <TableCell style={{fontSize: 16, fontWeight: 600, 'min-width' : '110px'}}>Pesha totale&nbsp;</TableCell>
                            {/* Rotary */}
                            {selectedFurnace == (furnaces.ROT1 || furnaces.ROT2) && <TableCell style={{fontSize: 16, fontWeight: 600}}>NaCl&nbsp;</TableCell>}
                            {selectedFurnace == (furnaces.ROT1 || furnaces.ROT2) && <TableCell style={{fontSize: 16, fontWeight: 600}}>KCl&nbsp;</TableCell>}
                            {selectedFurnace == (furnaces.ROT1 || furnaces.ROT2) && <TableCell style={{fontSize: 16, fontWeight: 600}}>Kriolit&nbsp;</TableCell>}
                            {/* Cife 1 */}
                            {selectedFurnace == furnaces.CIF1 && <TableCell style={{fontSize: 16, fontWeight: 600}}>Fl&nbsp;(kg)</TableCell>}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowItems.map((row, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.time}
                                </TableCell>
                                <TableCell>{row.material}</TableCell>
                                <TableCell>{row.weight + ' kg'}</TableCell>
                                <TableCell>{index == 0 ? row.weight : parseInt(row.weight) + parseInt(rowItems[index-1].totalWeight)} kg</TableCell>
                                {/* Rotary */}
                                {selectedFurnace == (furnaces.ROT1 || furnaces.ROT2) && <TableCell>{row.nacl} kg</TableCell>}
                                {selectedFurnace == (furnaces.ROT1 || furnaces.ROT2) && <TableCell>{row.kcl} kg</TableCell>}
                                {selectedFurnace == (furnaces.ROT1 || furnaces.ROT2) && <TableCell>{row.criolite} kg</TableCell>}
                                {/* Cife 1 */}
                                {selectedFurnace == furnaces.CIF1 && <TableCell>{row.fl}</TableCell>}
                                <TableCell>
                                    {
                                        emptyRowActive ?
                                            null
                                        :
                                            <CancelPresentationTwoToneIcon style={{borderRadius: 0, cursor: 'pointer'}} onClick={() => deleteRow(index)} fontSize='large' color='error'></CancelPresentationTwoToneIcon>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                        {
                            emptyRowActive ?
                                <TableRow
                                    // key={emptyRow.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    style={{background: '#fff4db'}}
                                >
                                    <TableCell component="th" scope="row">{rowItems.length+1}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {/* <TextField id="outlined-basic" label="Ora" variant="outlined" size="small">
                                            {emptyRow.time}
                                        </TextField> */}
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimeField
                                                label="Ora"
                                                // value={emptyRow.time}
                                                format="HH:mm"
                                                size="small"
                                                style={{background: 'white'}}
                                                onChange={ (e) => {
                                                    let hours = e.$H;
                                                    let minutes = e.$m;
                                                    if(parseInt(hours) < 10){
                                                        hours = '0'+hours;
                                                    }
                                                    if(parseInt(minutes) < 10){
                                                        minutes = '0'+minutes;
                                                    }
                                                    setEmptyRow({...emptyRow, time: hours+":"+minutes})
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            emptyRow.material == '' ?
                                                <MaterialsPicker setActive={false} emptyRow={emptyRow} setEmptyRow={setEmptyRow}/>
                                            :
                                                <div>
                                                    <Chip
                                                        label={emptyRow.material}
                                                        variant="outlined"
                                                        // onClick={handleClick}
                                                        onDelete={() => setEmptyRow({...emptyRow, material: ''})}
                                                    />
                                                </div>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <TextField style={{background: 'white'}} type="number" value={emptyRow.weight} label="Pesha" variant="outlined" size="small" 
                                        onChange={
                                            (e) => {
                                                e.target.value < 0 ?  
                                                    e.preventDefault() 
                                                :   
                                                    setEmptyRow({...emptyRow, weight: e.target.value, totalWeight: calculateTotalWeight(e.target.value)});
                                                    
                                            }
                                        }>
                                            {emptyRow.weight}
                                        </TextField>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    {/* <TableCell>{materialsList.length == 0 ? emptyRow.weight : parseInt(emptyRow.totalWeight) + rowItems[rowItems.length-1].totalWeight} kg</TableCell> */}
                                    {/* Rotary */}
                                    {selectedFurnace == (furnaces.ROT1 || furnaces.ROT2) && 
                                        <TableCell>
                                            <TextField style={{background: 'white'}} type="number" value={emptyRow.nacl} label="NaCl" variant="outlined" size="small" onChange={(e) => e.target.value < 0 ?  e.preventDefault() : setEmptyRow({...emptyRow, nacl: e.target.value})}>
                                                {emptyRow.nacl}
                                            </TextField>
                                        </TableCell>
                                    }
                                    {selectedFurnace == (furnaces.ROT1 || furnaces.ROT2) && 
                                        <TableCell>
                                            <TextField style={{background: 'white'}} type="number" value={emptyRow.kcl} label="KCl" variant="outlined" size="small" onChange={(e) => e.target.value < 0 ?  e.preventDefault() : setEmptyRow({...emptyRow, kcl: e.target.value})}>
                                                {emptyRow.kcl}
                                            </TextField>
                                        </TableCell>
                                    }
                                    {selectedFurnace == (furnaces.ROT1 || furnaces.ROT2) && 
                                        <TableCell>
                                            <TextField style={{background: 'white'}} type="number" value={emptyRow.criolite} label="Kriolit" variant="outlined" size="small" onChange={(e) => e.target.value < 0 ?  e.preventDefault() : setEmptyRow({...emptyRow, criolite: e.target.value})}>
                                                {emptyRow.criolite}
                                            </TextField>
                                        </TableCell>
                                    }
                                    {/* Cife 1 */}
                                    {selectedFurnace == furnaces.CIF1 && <TableCell><TextField style={{background: 'white'}} id="outlined-basic" label="Fl" variant="outlined" size="small">{emptyRow.fl}</TextField></TableCell>}
                                    <TableCell></TableCell>
                                </TableRow>
                            :
                                null
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                emptyRowActive ?
                <div className={styles.buttonsHolder}>
                    <Button variant={'contained'} color={'error'} onClick={() => setEmptyRowActive(false)}>Fshi ngarkesën</Button>
                    <Button variant={'contained'} color={'success'} onClick={() => addRow()}>Konfirmo ngarkesën</Button>
                </div>        
                :
                    <AddMaterial addRow={addEmptyRow}/>
            }
        </div>
    )
}

export default MaterialsList;