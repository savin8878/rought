// Collapse.js

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { ChildModal } from './ChildModal';

const sample = [];

const columns = [
    { width: 68, label: 'Action', dataKey: 'action' },
    { width: 5, label: 'SN', dataKey: 'serialNum' },
    { width: 30, label: 'Date', dataKey: 'date' },
    { width: 20, label: 'Day', dataKey: 'day' },
    { width: 30, label: 'Country', dataKey: 'country' },
    { width: 30, label: 'State', dataKey: 'state' },
    { width: 30, label: 'City', dataKey: 'city' },
    { width: 40, label: 'Client', dataKey: 'clientName' },
    { width: 40, label: 'Purpose', dataKey: 'purpose' },
    { width: 40, label: 'Remark', dataKey: 'remark' }
];

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align="left"
                    style={{ width: column.width }}
                    sx={{ backgroundColor: 'lightgrey' }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index, row, setTableData, handleCloseChildModal, date, index, check, onSubmit) {
    const handleEdit = () => {
        console.log('Edit', row);
    };

    const handleDelete = () => {
        console.log('Delete', row);
        const newData = sample.filter(item => item !== row);
        setTableData(newData);
    };

    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell key={column.dataKey} align="left">
                    {column.dataKey === 'action' ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton aria-label="edit" onClick={handleEdit}>
                                <ChildModal onClose={handleCloseChildModal} date={date} index={index} check={check} type={"updatetable"} onSubmit={onSubmit} />
                            </IconButton>
                            <Box sx={{ width: '0.4px', height: '12px', border: '1px dashed gray', marginX: '5px' }} />
                            <IconButton aria-label="delete" onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        row[column.dataKey]
                    )}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

export default function Collapse({ date, index, check }) {
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [tableData, setTableData] = useState(sample);

    const handleExpansion = (event, isExpanded) => {
        setExpanded(isExpanded);
    };

    const handleCloseChildModal = () => {
        setExpanded(false);
    };

    const handleFormSubmit = (formData) => {
        setTableData([...tableData, formData]);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                slots={{ transition: Fade }}
                slotProps={{ transition: { timeout: 400 } }}
                sx={{
                    width: '100%',
                    '& .MuiAccordionSummart': {
                        width: '100%',
                        '& > .MuiAccordionSummary-content': {
                            width: '100%',
                        },
                    },
                    '& .MuiAccordion-region': { height: expanded ? '100%' : 0 },
                    '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                }}
            >
                <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                    <div style={{ display: 'grid', marginLeft: '1rem', gridTemplateColumns: 'auto 1fr' }}>
                        <div style={{ fontWeight: 'bold', margin: 0, color: check ? "#ffffff" : "#222222" }}>Day-{index + 1} {date.toString()}</div>
                    </div>
                    <ChildModal date={date} index={index} onSubmit={handleFormSubmit} check={check} type={"newTabledata"} />
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Paper style={{ height: 150, width: '100%' }}>
                            <TableVirtuoso
                                data={tableData} // Render table with updated data
                                components={VirtuosoTableComponents}
                                fixedHeaderContent={fixedHeaderContent}
                                itemContent={(_index, row) => rowContent(_index, row, setTableData, handleCloseChildModal, date, index, check, handleFormSubmit)} // Pass handleFormSubmit directly
                            />
                        </Paper>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
