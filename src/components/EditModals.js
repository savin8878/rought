import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Collapse from './Collapse';
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

export default function NestedModal({ handl, dates, check }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '75%', height: '65%', overflowY: 'auto' }}>
                    <h2 style={{ borderRadius: "100px", textAlign: 'center', color: check ? "#ffffff" : "#222222" }} id="parent-modal-title ">Plans for {dates.length} Days</h2>
                    {
                        dates.map((date, index) => (
                            <Box
                                style={{ borderRadius: "100px" }}
                                key={index}
                                component="section"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: 1,
                                    width: '70%',
                                    margin: '10px auto',
                                    marginTop: '2rem',
                                    borderRadius: '2rem'
                                }}
                            >
                                <Collapse date={date} index={index} check={check} open={open} onClose={handleClose} setOpen={setOpen} />
                            </Box>
                        ))
                    }
                </Box>
            </Modal>
        </div>
    );
}
