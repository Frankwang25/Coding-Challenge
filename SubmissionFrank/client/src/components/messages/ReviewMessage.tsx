import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, FormLabel } from '@material-ui/core';

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
export default function ReviewMessage() {
    const [values, setValues] = useState(defaultValues as IMessages);
    //Getting params from last page
    const { id, message } = useParams();
    const classes = useStyles();

    //Loading elements but they are read only
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
                    disabled
                    />
            </div>    
      </div>
    )
}