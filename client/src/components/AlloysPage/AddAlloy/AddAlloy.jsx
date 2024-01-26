import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import { useState } from 'react';
import styles from './AddAlloy.module.css';
import api from "../../../api";
import { useEffect } from 'react';
import { FileUploader } from "react-drag-drop-files";

function AddAlloy (){
    
    const [display, setDisplay] = useState('none');

    const materials = [
        'Si','Fe','Cu','Mn','Mg','Cr','Ni','Zn','Ti','Be','Ca','Na','P','Pb','Sb','Sn','Sr'
    ];

    const [data,setData] = useState({
        alloy: '',
        company: '',
        notes: ''
    });

    const [boxValues, setBoxValues] = useState({
        Si: {
            min: '',
            max: '',
            sign: '≤'
        },
        Fe: {
            min: '',
            max: '',
            sign: '≤'
        },
        Cu: {
            min: '',
            max: '',
            sign: '≤'
        },
        Mn: {
            min: '',
            max: '',
            sign: '≤'
        },
        Mg: {
            min: '',
            max: '',
            sign: '≤'
        },
        Cr: {
            min: '',
            max: '',
            sign: '≤'
        },
        Ni: {
            min: '',
            max: '',
            sign: '≤'
        },
        Zn: {
            min: '',
            max: '',
            sign: '≤'
        },
        Ti: {
            min: '',
            max: '',
            sign: '≤'
        },
        Be: {
            min: '',
            max: '',
            sign: '≤'
        },
        Ca: {
            min: '',
            max: '',
            sign: '≤'
        },
        Na: {
            min: '',
            max: '',
            sign: '≤'
        },
        P: {
            min: '',
            max: '',
            sign: '≤'
        },
        Pb: {
            min: '',
            max: '',
            sign: '≤'
        },
        Sb: {
            min: '',
            max: '',
            sign: '≤'
        },
        Sn: {
            min: '',
            max: '',
            sign: '≤'
        },
        Sr: {
            min: '',
            max: '',
            sign: '≤'
        },
    });

    const [boxDisabled, setBoxDisabled] = useState({
        Si: {
            min: true,
            max: false,
        },
        Fe: {
            min: true,
            max: false,
        },
        Cu: {
            min: true,
            max: false
        },
        Mn: {
            min: true,
            max: false
        },
        Mg: {
            min: true,
            max: false
        },
        Cr: {
            min: true,
            max: false
        },
        Ni: {
            min: true,
            max: false
        },
        Zn: {
            min: true,
            max: false
        },
        Ti: {
            min: true,
            max: false
        },
        Be: {
            min: true,
            max: false
        },
        Ca: {
            min: true,
            max: false
        },
        Na: {
            min: true,
            max: false
        },
        P: {
            min: true,
            max: false
        },
        Pb: {
            min: true,
            max: false
        },
        Sb: {
            min: true,
            max: false
        },
        Sn: {
            min: true,
            max: false
        },
        Sr: {
            min: true,
            max: false
        },
    });

    const handleSubmit = () => {
        console.log("Submitted")
        setDisplay('block');
        window.location.reload();
        api.addAlloy({
            alloy: data.alloy,
            company: data.company,
            notes: data.notes,
            values: boxValues
        })
    }

    const handleChange = (material, value) => {
        if(value==1){
            setBoxValues({...boxValues, [material]: {...boxValues[material], sign: '≤'}})
        }else if(value==2){
            setBoxValues({...boxValues, [material]: {...boxValues[material], sign: '<'}})
        }else if(value==3){
            setBoxValues({...boxValues, [material]: {...boxValues[material], sign: '-'}})
        }else if(value==4){
            setBoxValues({...boxValues, [material]: {...boxValues[material], sign: '>'}})
        }else if(value==5){
            setBoxValues({...boxValues, [material]: {...boxValues[material], sign: '≥'}})
        }
        if(value==1 || value==2){
            setBoxDisabled({...boxDisabled,[material]: {min: true, max: false}});
            return;
        }
        if(value==3){
            setBoxDisabled({...boxDisabled,[material]: {min: false, max: false}});
            return;
        }
        if(value==4 || value==5){
            setBoxDisabled({...boxDisabled,[material]: {min: false, max: true}});
            return;
        }
    }

    return (
        <div style={{width: '1286px', margin: 'auto'}}>
            <PostAddIcon className={styles.icon} fontSize="large" onClick={() => setDisplay('block')}/>
            <div className={styles.popup} style={{'display': display}}>
                <div className={styles.dialogBox}>
                    <h1>Shto një markë</h1>
                    <div className={styles.info}>
                        <div><h2>Marka</h2><TextField size='small' value={data.alloy} onChange={(e) => {setData({...data, alloy: e.target.value})}}></TextField></div>
                        <div><h2>Kompania</h2><TextField size='small' value={data.company} onChange={(e) => {setData({...data, company: e.target.value})}}></TextField></div>
                    </div>
                    <div className={styles.materials}>
                        <div className={styles.row}>
                            {
                                materials.slice(0,9).map((material, index) => (
                                    <div key={index} className={styles.material}>
                                        <p>{material}</p>
                                        <TextField onWheel={(e) => {e.target.blur()}} type={'number'} disabled={boxDisabled[material].min} style={boxDisabled[material].min ? {'background': 'lightgray', 'opacity': '0.6', borderRadius: '5px'} : {}} className={styles.numberBox} size={'small'} id="outlined-basic" label="" variant="outlined"
                                                   value={boxValues[material].min} onChange={e => setBoxValues({...boxValues,[material]: {min: e.target.value, max: boxValues[material].max, sign: boxValues[material].sign}})}
                                        />
                                        <FormControl className={styles.sign}>
                                            <NativeSelect
                                                defaultValue={2}
                                                inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native',
                                                }}
                                                onChange={(e) => handleChange(material,e.target.value)}
                                            >
                                                <option value={1}>{'<'}</option>
                                                <option value={2}>{'≤'}</option>
                                                <option value={3}>{'-'}</option>
                                                <option value={4}>{'>'}</option>
                                                <option value={5}>{'≥'}</option>
                                            </NativeSelect>
                                        </FormControl>
                                        <TextField onWheel={(e) => {e.target.blur()}} disabled={boxDisabled[material].max} style={boxDisabled[material].max ? {'background': 'lightgray', 'opacity': '0.6', borderRadius: '5px'}: {} }className={styles.numberBox} size={'small'} id="outlined-basic" label="" variant="outlined"
                                                   value={boxValues[material].max} onChange={e => setBoxValues({...boxValues,[material]: {min: boxValues[material].min, max: e.target.value, sign: boxValues[material].sign}})}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.row}>
                            {
                                materials.slice(9).map((material, index) => (
                                    <div key={index} className={styles.material}>
                                        <p>{material}</p>
                                        <TextField onWheel={(e) => {e.target.blur()}} disabled={boxDisabled[material].min} style={boxDisabled[material].min ? {'background': 'lightgray', 'opacity': '0.6', borderRadius: '5px'} : {}} className={styles.numberBox} size={'small'} id="outlined-basic" label="" variant="outlined"
                                                   value={boxValues[material].min} onChange={e => setBoxValues({...boxValues,[material]: {min: e.target.value, max: boxValues[material].max, sign: boxValues[material].sign}})}
                                        />
                                        <FormControl className={styles.sign}>
                                            <NativeSelect
                                                defaultValue={2}
                                                inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native',
                                                }}
                                                onChange={(e) => handleChange(material,e.target.value)}
                                            >
                                                <option value={1}>{'<'}</option>
                                                <option value={2}>{'≤'}</option>
                                                <option value={3}>{'-'}</option>
                                                <option value={4}>{'>'}</option>
                                                <option value={5}>{'≥'}</option>
                                            </NativeSelect>
                                        </FormControl>
                                        <TextField onWheel={(e) => {e.target.blur()}} disabled={boxDisabled[material].max} style={boxDisabled[material].max ? {'background': 'lightgray', 'opacity': '0.6', 'border-radius': '5px'}: {} }className={styles.numberBox} size={'small'} id="outlined-basic" label="" variant="outlined"
                                                   value={boxValues[material].max} onChange={e => setBoxValues({...boxValues,[material]: {min: boxValues[material].min, max: e.target.value, sign: boxValues[material].sign}})}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.formulaContainer}>

                    </div>
                    <div className={styles.notesContainer}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Shënime"
                            multiline
                            rows={5}
                            className={styles.notes}
                            value={data.notes}
                            onChange={(e) => setData({...data, notes: e.target.value})}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <Button variant="contained" color="error" onClick={()=> setDisplay('none')}>Anullo</Button>
                        <Button variant="contained" onClick={() => handleSubmit()}>Konfirmo</Button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddAlloy;