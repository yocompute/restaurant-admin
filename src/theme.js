import { createMuiTheme } from '@material-ui/core/styles';
import { purple, teal, yellow, green, red, orange, pink } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: teal[500],
        },
        secondary:{
            main: purple[500],
        },
        type: 'light',
        background:{
            // should not overwrite
        },
        text: {
        //     should not overwrite
        },
        action: {
            // should not change default api
        }
    },
    status: {
      danger: purple[500],
    },
    // spacing: {
    //     field: 3,
    // }
  });

export default theme;