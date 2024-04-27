
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import EditIcon from "@mui/icons-material/Edit";
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export function ChildModal({ date, index, onSubmit, check, type }) {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = useState('');
    const [purposeValue, setPurposeValue] = useState('');
    const [remarksValue, setRemarksValue] = useState('');
    const [countryValue, setCountryValue] = useState(null);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [stateValue, setStateValue] = useState(null);
    const [cityValue, setCityValue] = useState(null);
    const [gcountry, setgCountry] = useState(null)
    const [gstate, setgState] = useState(null)
    const [loadingCities, setLoadingCities] = useState(false); // State for loading city options

    useEffect(() => {
        axios.get('https://api.countrystatecity.in/v1/countries', {
            headers: {
                'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
            }

        })
            .then(response => {
                setgCountry(response.data);
                console.log(gcountry);
                setCountries(response.data);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const handleCountryChange = (country) => {
        if (country) {
            console.log(country);
            setgCountry(country);
            axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states`, {
                headers: {
                    'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
                }
            })
                .then(response => {
                    setgState(response.data)
                    setStates(response.data);
                })
                .catch(error => {
                    console.error('Error fetching states:', error);
                });
        }
    };

    const handleStateChange = (state) => {
        if (state) {
            const countryCode = gcountry;
            const stateCode = state.state;
            console.log("gcountry " + countryCode);
            axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, {
                headers: {
                    'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
                }
            })
                .then(response => {
                    setCities(response.data);
                    setLoadingCities(false);
                })
                .catch(error => {
                    console.error('Error fetching cities:', error);
                    setLoadingCities(false);
                });
        }
    };


    const handleClearInput = () => {
        setInputValue('');
    };

    const handleClearPurpose = () => {
        setPurposeValue('');
    };

    const handleClearRemarks = () => {
        setRemarksValue('');
    };
    const handleOpen = () => {
        if (type === "updatedata") {
            setInputValue(clientname);
            setPurposeValue(purpose);
            setRemarksValue(remarks);
            const selectedCountry = countries.find(country => country.name === selectedcountries);
            const selectedState = states.find(state => state.name === selectedstate);
            const selectedCity = cities.find(city => city.name === selectedcity);
            setCountryValue(selectedCountry);
            setStateValue(selectedState);
            setCityValue(selectedCity);
        }
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const formData = {
            clientName: inputValue,
            purpose: purposeValue,
            remark: remarksValue,
            country: countryValue ? countryValue.name : '',
            state: stateValue ? stateValue.name : '',
            city: cityValue ? cityValue.name : '',
            date: date.toString(),
            day: `${index + 1}`,
        };
        console.log("Submitting form data:", formData);
        onSubmit(formData);
        handleClose();
    };


    return (
        <React.Fragment>
            {type === "newTabledata" ? (<AddCircleOutlineOutlinedIcon onClick={handleOpen} style={{ marginLeft: '10px' }} />
            ) : (<EditIcon onClick={handleOpen}  />)}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 540, hieght: 50 }}>
                    <h2 style={{ color: check ? "#ffffff" : "#222222", fontSize: 20 }} id="child-modal-title">Day-{index + 1} {date.toString()}</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Autocomplete
                                size="small" disablePortal
                                id="combo-box-country"
                                options={countries}
                                getOptionLabel={(option) => option.name}
                                value={countryValue}
                                onChange={(event, newValue) => {
                                    setCountryValue(newValue);
                                    handleCountryChange(newValue ? newValue.iso2 : null);
                                }}
                                renderInput={(params) => <TextField {...params} label="Country" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                size="small"
                                id="combo-box-state"
                                options={states}
                                getOptionLabel={(option) => option.name}
                                value={stateValue}
                                onChange={(event, newValue) => {
                                    setStateValue(newValue);
                                    handleStateChange(newValue ? { country: newValue.country_iso2, state: newValue.iso2 } : null);
                                }}
                                renderInput={(params) => <TextField {...params} label="State" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                size="small"
                                id="combo-box-city"
                                options={cities}
                                getOptionLabel={(option) => option.name}
                                value={cityValue}
                                onChange={(event, newValue) => {
                                    setCityValue(newValue);
                                    handleStateChange(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="City" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box

                            >
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Client"
                                    id="Remarks"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" aria-label="delete" onClick={handleClearInput}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box

                            >
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Purpose"
                                    value={purposeValue}
                                    onChange={(e) => setPurposeValue(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" aria-label="delete" onClick={handleClearPurpose}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                            >
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Remarks"
                                    value={remarksValue}
                                    onChange={(e) => setRemarksValue(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" aria-label="delete" onClick={handleClearRemarks}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
