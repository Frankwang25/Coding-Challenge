import * as React from 'react';
import { useEffect, useState, Props } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { TextField, Button, Theme, createStyles, withStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

//Reference styles from material-ui.com
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
                display: "block"
            },
        },
        wrapper: {
            width: "100%",
        },
        formInput: {
            width: "100%"
        },
        button: {
            margin: theme.spacing(1),
        },
        table: {
            minWidth: 650,
        },
        marginRight: {
            marginRight: 10
        },
    }),
);

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);


export interface IMessages {
    id: string,
    message: string
}
//Implementing interface IMessages with default values
const defaultValues: IMessages = {
    id: "",
    message: ""
}

export default function MessageTable() {
    const classes = useStyles();
    //Hook to define a property and to use set method to set value to the property
    const [data, setData] = useState([] as IMessages[]);
    const [values, setValues] = useState(defaultValues as IMessages);
    var ids: number[] = [];
    var newid: string = "1";
    useEffect(() => {
        getData();
    }, []);
    //Getting all messages from REST web service and then loading messages to a table
    const getData = async () => {
        const messages = await axios.get(`http://localhost:8080/api/message`).then(datalist => {
            if (datalist.data.length != 0) {
                for (var item of datalist.data) {
                    ids.push(item.id);
                }
                ids.sort();
                newid = (ids[ids.length - 1] + 1).toString();
            }
            setData(datalist.data);
            //Finding and recording the biggest id for the preparation of new message
            setValues(values => ({
                ...values,
                "id": newid
            }));
        });

    }

    //Removing the specified message and refresh the table
    const deleteMessage = async (event: any, id: string) => {
        event.persist();
        await axios.delete(`http://localhost:8080/api/message/messages/${id}`).then(data_ => {
            getData();
        })
    }

    //Lisitening the user input to filter the table
    const handleChange = async (event: any) => {
        event.persist();
        let option = event.target.value;
        if (option == "") {
            await axios.get(`http://localhost:8080/api/message`).then(datalist => {
                if (datalist.data.length != 0) {
                    for (var item of datalist.data) {
                        ids.push(item.id);
                    }
                    ids.sort();
                    newid = (ids[ids.length - 1] + 1).toString();
                }
                setData(datalist.data);
                setValues(values => ({
                    ...values,
                    "id": newid
                }));
            });
        } else {
            const messages = await axios.options(`http://localhost:8080/api/message/messages/${option}`);
            setData(messages.data);
        }
        //Recording the user input
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));

    }

    //Submit a new message to the backend server and refresh the table
    const handleSubmit = async (event: any) => {
        event.persist();
        await axios.post(`http://localhost:8080/api/message/messages`, values).then(datalist => {
            if (datalist.data.length != 0) {
                for (var item of datalist.data) {
                    ids.push(item.id);
                }
                ids.sort();
                newid = (ids[ids.length - 1] + 1).toString();
            }
            setData(datalist.data);
            setValues(values => ({
                ...values,
                "id": newid
            }));
        });
    }


    return (
        <TableContainer component={Paper}>
            <div style={{ textAlign: "center" }}>
                <TextField
                    id="outlined-input"
                    name="message"
                    label="Write your message to search or to add"
                    type="text"
                    defaultValue={values.message}
                    className={classes.formInput}
                    variant="outlined"
                    onChange={handleChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<AddCircleIcon />}
                    onClick={handleSubmit}
                >
                    New Message
                </Button>
            </div>
            <Table className={classes.table} aria-label="simple table" >
                <TableHead >
                    <TableRow>
                        <StyledTableCell align="center">ID</StyledTableCell>
                        <StyledTableCell align="center">Message</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(messageItem => (
                        <TableRow key={messageItem.id}>
                            <StyledTableCell align="center" component="th" scope="row">{messageItem.id} </StyledTableCell>
                            <StyledTableCell align="center">{messageItem.message}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Link to={`review/${messageItem.id}/${messageItem.message}`}>
                                    <VisibilityIcon className={classes.marginRight} />
                                </Link>
                                <Link to={`edit/${messageItem.id}/${messageItem.message}`}>
                                    <EditIcon className={classes.marginRight} />
                                </Link>
                                <DeleteIcon onClick={e => deleteMessage(e, messageItem.id)} />
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
