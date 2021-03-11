import { makeStyles } from '@material-ui/core/styles';
import { green } from "@material-ui/core/colors";

export const useStyles = makeStyles(() => ({
    radioGroup: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '-10px',
    },
    button: {
        float: 'right',
        backgroundColor: green[500],
        color: '#fff',
        '&:hover': {
            color: '#666',
            border: 'solid 1px #aaa'
        }

    },
    segment: {
        color: "#aaa",
        fontWeight: 'bold',
        fontSize: '1.2em'
    }

}));