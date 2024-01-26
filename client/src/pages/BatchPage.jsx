import { Grid } from "@mui/material";
import { DateField, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import BatchList from "../components/BatchPage/BatchList/BatchList";
import FurnacePicker from "../components/BatchPage/FurnacePicker/FurnacePicker";
import MaterialsList from "../components/BatchPage/MaterialsList/MaterialsList";


function BatchPage() {

    const furnaces = {
        ROT1: 'Furra e vogël rotative',
        ROT2: 'Furra e madhe rotative',
        CIF1: 'Furra Cife 1',
        CIF2: 'Furra Cife 2'
    }

    const [furnace, setFurnace] = useState(null); 
    
    // useEffect(() => {
    //     if(furnace){}
    // },[furnace]);

    const materialsList = [];

    return(
        <div>
            <FurnacePicker style={ furnace ? {display: 'none'} : null} furnaces={furnaces} setFurnace={setFurnace}/>
            <BatchList style={ !furnace ? {display: 'none'} : null}/>
            {/* <Grid container spacing={2} style={!furnace ? {display: 'none'} : null}>
                <Grid item xs={5.5} md={8}>
                    <h1 style={{marginLeft: 15, textDecoration: 'underline', display: 'inline-block'}}>Rot 429</h1>
                </Grid>
                <Grid item xs={6.5} md={4}>
                    <div style={{float: 'right', marginRight: 20}}>
                        <h2 style={{marginTop: 30, marginRight: 15, display: 'inline-block'}}>dt. </h2>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField
                                label="Data"
                                size='small'
                                style={{marginTop: 25, display: 'inline-block'}}
                                // value={value}
                                // onChange={(newValue) => setValue(newValue)}
                            />
                        </LocalizationProvider>
                    </div>
                </Grid>
            </Grid>
            <MaterialsList style={ furnace ? null : {display: 'none'}} selectedFurnace={furnace} furnaces={furnaces} materialsList={materialsList}/> */}
        </div>
    )
}

export default BatchPage;