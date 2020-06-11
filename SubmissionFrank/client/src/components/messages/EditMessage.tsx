import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter, useHistory, useParams } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Typography, Button, FormLabel } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 350,
        display: "block",
      },
    },
    wrapper: {
        width:"100%",
    },
    formInput: {
      width: "100%"
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export interface IMessages {
    id: string,
    message: string
}

//Implementing interface IMessages with default values
const defaultValues: IMessages = {
    id: "",
    message: ""
}
export default function EditMessage() {
    //Hook to define a property and to use set method to set value to the property
    const [values, setValues] = useState(defaultValues as IMessages);
    //Getting params from last page
    const { id, message } = useParams();
    //Use styles
    const classes = useStyles();
    //Go back to the last page
    const history = useHistory();

    //Lisitening the user input and storing them
    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            "id":id,
            [event.target.name]: event.target.value
        }));
    }

    //Submitting user input to backend server to add a new message
    const handleSubmit = (event:any) => {
        event.persist();
        axios.put(`http://localhost:8080/api/message/messages/${id}`, values).then(data => {
              history.goBack()
        });
    }

    return ( 
        <div className={classes.root}>
        <div>
            <FormLabel>Message ID: </FormLabel>
            <TextField
                id="outlined-input"
                name="id"
                label={id}
                type="text"
                defaultValue={values.id}
                className={classes.formInput}
                variant="outlined"
                disabled
            />
        </div>
        <div>
            <FormLabel>Message Content: </FormLabel>
            <TextField
                id="outlined-input"
                name="message"
                label={message}
                type="text"
                defaultValue={values.message}
                className={classes.formInput}
                variant="outlined"
                onChange={handleChange}
                />
        </div>
        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handleSubmit}
      >
        Update
      </Button>  
      </div>
    )
}
