import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import { useState } from 'react';
import styles from './PrintForm.module.css';
import { useLayoutEffect } from 'react';
import api from "../../api";
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../context/AuthProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

function LoginForm () {

    const { setAuth } = useAuth();
    const navigate = useNavigate();


    const [width,height] = useWindowSize();

    const [mode, setMode] = useState(0); // 0: Choose alloy & batch no.  || 1: Choose weight & print 
    
    const [error, setError] = useState({
        alloy: false,
        batchNumber: false,
        grossWeight: false
    });

    const [userInputs, setUserInputs] = useState({
        alloy: '',
        batchNumber: '',
        grossWeight: 0
    });

    const validateAlloy = () => {
        if(!userInputs.alloy){
            return false
        }
        return true
    }

    const validateBatchNumber = () => {
        if(!userInputs.batchNumber){
            return false
        }
        if(parseInt(userInputs.batchNumber)<=0){
            return false;
        }
        return true
    }

    const validateGrossWeight = () => {
        if(!userInputs.grossWeight){
            return false
        }
        if(userInputs.grossWeight <= 0){
            return false
        }
        return true
    }


    const validateInputs = () => {
        let valid = true;
        const updatedError = {
            alloy: !validateAlloy(),
            batchNumber: !validateBatchNumber(),
            grossWeight: !validateGrossWeight()
        };
        setError(updatedError);
    }

    const alloys = [
        {
          value: 'EN AB 43400',
          label: 'EN AB 43400',
        }
    ];

    const startPrint = async (e) => {
        validateInputs();
        const valid = validateAlloy() && validateBatchNumber();
        if(valid){
            setMode(1);
            setError(false,false,false);
        }
        // const response = await window.versions.ping(userInputs);
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateInputs();
        const valid = validateGrossWeight();
        if(valid){
            const response = await window.versions.ping(userInputs);
        }
    }

    return (
        <div className={styles.container} style={{height: height-65}}>
            <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '80%' },
                }}
                noValidate
                autoComplete="off"
                className={styles.box}
                onSubmit={handleSubmit}
            >
                <h1>
                    {
                        mode == 0 ?
                            'Printo tabela'
                        :
                            'Printo një tabelë'
                    }
                </h1>
                <FormControl className={styles.alloy}>
                    <InputLabel 
                        size="small" 
                        className={styles.alloyLabel} 
                        error={error.alloy} 
                        style={
                            mode == 1 ?
                            {'display': 'none'}
                            :
                            null
                        }
                    >Marka</InputLabel>
                    <Select 
                        id="outlined-select-alloy" 
                        label="Marka" 
                        fullWidth
                        variant="outlined"
                        required
                        className={styles.alloySelect}
                        size="small"
                        onChange={
                            (e) => {
                                setError(prev => {return {...prev, alloy: false}})
                                setUserInputs({
                                    ...userInputs, 
                                    alloy: e.target.value
                                })
                            }
                        }
                        error={error.alloy}
                        style={
                            mode == 1 ?
                            {'display': 'none'}
                            :
                            null
                        }
                    >
                        {alloys.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    id="outlined-password-input"
                    label="Numri i kolatës"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    required
                    className={styles.password}
                    fullWidth
                    size="small"
                    onChange={
                        (e) => {
                            setError(prev => {return {...prev,batchNumber: false}})
                            setUserInputs({
                                ...userInputs, 
                                batchNumber: e.target.value
                            })
                        }
                    }
                    error={error.batchNumber}
                    style={
                        mode == 1 ?
                        {'display': 'none'}
                        :
                        null
                    }
                />
                <TextField 
                    id="outlined-basic" 
                    label="Pesha bruto" 
                    variant="outlined"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    required
                    className={styles.name}
                    fullWidth
                    size="small"
                    onChange={
                        (e) => {
                            setError(prev => {return {...prev,grossWeight: false}})
                            setUserInputs({
                                ...userInputs, 
                                grossWeight: e.target.value
                            })
                        }
                    }
                    error={error.grossWeight}
                    style={
                        mode == 1 ?
                        null
                        :
                        {'display': 'none'}
                    }
                />
                <Button
                    // type="submit"
                    onClick={(e) => startPrint()}
                    variant="contained"
                    sx={{width: '80%', height: '40px', textTransform: 'capitalize', fontSize: '16px', marginTop: '25px'}}
                    style={
                        mode == 1 ?
                        {'display': 'none'}
                        :
                        null
                    }
                >
                    Fillo
                
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{width: '80%', height: '40px', textTransform: 'capitalize', fontSize: '16px', marginTop: '25px'}}
                    style={
                        mode == 1 ?
                        null
                        :
                        {'display': 'none'}
                    }
                >
                    Printo
                
                </Button>
            </Box>
        </div>
    )
}

export default LoginForm;