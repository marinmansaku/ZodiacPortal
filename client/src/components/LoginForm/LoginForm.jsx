import { Box, TextField, Button} from '@mui/material';
import { useState } from 'react';
import styles from './LoginForm.module.css';
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

    const [submited, setSubmited] = useState(false);


    const [width,height] = useWindowSize();
    
    const [error, setError] = useState({
        name: false,
        password: false
    });

    const [userInputs, setUserInputs] = useState({
        name: '',
        password: '',
    });

    const validateName = () => {
        if(!userInputs.name){
            return false;
        }
        return true;
    }

    const validatePassword = () => {
        if(userInputs.password.length<8){
            return false;
        }
        return true;
    }

    const validateInputs = () => {
        let valid = true;
        const updatedError = {
            name: !validateName(),
            password: !validatePassword()
        };

        setError(updatedError);
        if(valid){
            return true;
        }
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateInputs();
        if(!valid) return false;
        if(submited) return false;
        setSubmited(true);
        api.loginUser(userInputs).then((response) => {
            const accessToken = response?.data?.accessToken;
            const name = response?.data?.name;
            setAuth({ accessToken, loaded: true, user: { name }});
            navigate('../')
        }).catch((err) => {
            setError({name: true, password: true});
            setSubmited(false);
        });
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
                <h1>Identifikohu</h1>
                <TextField 
                    id="outlined-basic" 
                    label="Emri" 
                    variant="outlined"
                    required
                    className={styles.name}
                    fullWidth
                    size="small"
                    onChange={
                        (e) => {
                            setError(prev => {return {...prev,name: false}})
                            setUserInputs({
                                ...userInputs, 
                                name: e.target.value
                            })
                        }
                    }
                    error={error.name}
                />
                <TextField
                    id="outlined-password-input"
                    label="Fjalëkalimi"
                    type="password"
                    required
                    className={styles.password}
                    fullWidth
                    size="small"
                    onChange={
                        (e) => {
                            setError(prev => {return {...prev,password: false}})
                            setUserInputs({
                                ...userInputs, 
                                password: e.target.value
                            })
                        }
                    }
                    error={error.password}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{width: '80%', height: '40px', textTransform: 'capitalize', fontSize: '16px', marginTop: '25px'}}
                >
                    Hyr
                
                </Button>
            </Box>
        </div>
    )
}

export default LoginForm;