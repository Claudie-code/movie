import { Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

export default function ReleaseDate({ children, color }) {

    return (
        <Typography variant="subtitle1" color={color ? color : "textSecondary"} gutterBottom>
            Sortie le {dayjs(children).locale('fr').format("DD MMMM YYYY")}
        </Typography>
    
    )
}