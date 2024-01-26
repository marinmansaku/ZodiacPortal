import React, { useState } from "react";
import { useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import api from "../../api";
import styles from "./AnalysisChecker.module.css";
import {TableContainer, Table, TableRow, TableCell, Button, MenuItem, Select, TableBody, TableHead, FormControl, InputLabel} from '@mui/material'


const arrayBufferToUint8Array = (arrayBuffer) => new Uint8Array(arrayBuffer);

function AnalysisChecker(){

    const fileTypes = ["DBF","JSON","js",".js.map"];

    const elements = [
        'Si','Fe','Cu','Mn','Mg','Cr','Ni','Zn','Ti','Be','Ca','Na','P','Pb','Sb','Sn','Sr'
    ];

    const [highLightedElements, setHighlightedElements] = useState([]);

    const [file, setFile] = useState();
    const [data, setData] = useState();
    const [alloys, setAlloys] = useState();
    const [selectedAlloy, setSelectedAlloy] = useState(0);

    const handleChange = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', file);
        api.getJSON(data).then((res) => {
            setData(res.data);
        });
    }
    
    useEffect(() => {
        api.getAlloys().then((res) => {
            setAlloys(res.data);
        });
    }, []);

    const round = (string) => {
        return Math.round((string + Number.EPSILON) * 1000) / 1000;
    }

    const handleClick = () => {
        const alloyValues = alloys[selectedAlloy].values;
        const newHighlighted = [];
        elements.forEach((element) => {
            const minValue = parseFloat(alloyValues[element].min || 0);
            const actualValue = parseFloat(data[element.toUpperCase()]);
            const maxValue = parseFloat(alloyValues[element].max)
            if(!(actualValue>minValue && actualValue<maxValue)) newHighlighted.push(element);
        })
        setHighlightedElements(newHighlighted);
        // console.log(alloys[selectedAlloy].values);
        // console.log(data);
    }

    return (
        <div className={styles.holder}>
            {
                !data ? 
                    <form method="post" encType="multipart/form-data" onSubmit={(e) => handleChange(e)}>
                        <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])}/>
                        <input type="submit" value="Upload"/>
                    </form>
                :
                <div>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Alloy</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Si') ? {background: 'red', color: 'white'} : null}>Si</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Fe') ? {background: 'red', color: 'white'} : null}>Fe</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Cu') ? {background: 'red', color: 'white'} : null}>Cu</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Mn') ? {background: 'red', color: 'white'} : null}>Mn</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Mg') ? {background: 'red', color: 'white'} : null}>Mg</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Cr') ? {background: 'red', color: 'white'} : null}>Cr</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Ni') ? {background: 'red', color: 'white'} : null}>Ni</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Zn') ? {background: 'red', color: 'white'} : null}>Zn</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Ti') ? {background: 'red', color: 'white'} : null}>Ti</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Ca') ? {background: 'red', color: 'white'} : null}>Ca</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Na') ? {background: 'red', color: 'white'} : null}>Na</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='P') ? {background: 'red', color: 'white'} : null}>P</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Pb') ? {background: 'red', color: 'white'} : null}>Pb</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Sb') ? {background: 'red', color: 'white'} : null}>Sb</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Sn') ? {background: 'red', color: 'white'} : null}>Sn</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Sr') ? {background: 'red', color: 'white'} : null}>Sr</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Be') ? {background: 'red', color: 'white'} : null}>Be</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='B') ? {background: 'red', color: 'white'} : null}>B</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Bi') ? {background: 'red', color: 'white'} : null}>Bi</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Cd') ? {background: 'red', color: 'white'} : null}>Cd</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Ga') ? {background: 'red', color: 'white'} : null}>Ga</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Li') ? {background: 'red', color: 'white'} : null}>Li</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='V') ? {background: 'red', color: 'white'} : null}>V</TableCell>
                                    <TableCell style={highLightedElements.find((el) => el=='Zr') ? {background: 'red', color: 'white'} : null}>Zr</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow style={{border: '1px black'}}>
                                    <TableCell>{data.SID1 + " " + data.SID2 + " " + data.SID3}</TableCell>
                                    <TableCell>{round(data.SI)}</TableCell>
                                    <TableCell>{round(data.FE)}</TableCell>
                                    <TableCell>{round(data.CU)}</TableCell>
                                    <TableCell>{round(data.MN)}</TableCell>
                                    <TableCell>{round(data.MG)}</TableCell>
                                    <TableCell>{round(data.CR)}</TableCell>
                                    <TableCell>{round(data.NI)}</TableCell>
                                    <TableCell>{round(data.ZN)}</TableCell>
                                    <TableCell>{round(data.TI)}</TableCell>
                                    <TableCell>{round(data.CA)}</TableCell>
                                    <TableCell>{round(data.NA)}</TableCell>
                                    <TableCell>{round(data.P)}</TableCell>
                                    <TableCell>{round(data.PB)}</TableCell>
                                    <TableCell>{round(data.SB)}</TableCell>
                                    <TableCell>{round(data.SN)}</TableCell>
                                    <TableCell>{round(data.SR)}</TableCell>
                                    <TableCell>{round(data.BE)}</TableCell>
                                    <TableCell>{round(data.B)}</TableCell>
                                    <TableCell>{round(data.BI)}</TableCell>
                                    <TableCell>{round(data.CD)}</TableCell>
                                    <TableCell>{round(data.GA)}</TableCell>
                                    <TableCell>{round(data.LI)}</TableCell>
                                    <TableCell>{round(data.V)}</TableCell>
                                    <TableCell>{round(data.ZR)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={styles.controller}>
                        <FormControl>
                            <InputLabel>Alloy</InputLabel>
                            <Select
                                className={styles.select}
                                value={selectedAlloy}
                                size="small"
                                labelId="alloyId"
                                label="alloy"
                                autoWidth
                                onChange={(e) => {setSelectedAlloy(e.target.value)}}
                            >
                                {
                                    alloys.map((alloy, index) => {
                                        return(
                                            <MenuItem key={index} value={index}>{alloy.alloy}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <Button className={styles.button} variant="contained" onClick={() => handleClick()}>
                            Kontrollo
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AnalysisChecker;