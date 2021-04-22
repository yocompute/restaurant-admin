
import React from 'react'
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux'
import PropTypes from "prop-types"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '10px',
      flexGrow: 1
      // minWidth: 275,
    },
    selected: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    unselected: {
      backgroundColor: theme.palette.background.paper
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));

const Tile = ({data, onSelect}) => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
      <div className={classes.root} onClick={() => onSelect(data)}>
      <Card variant="outlined" className={data && data.selected? classes.selected: classes.unselected}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            {data.name}
          </Typography>
          <Typography variant="h5" component="h2">
            {data.description}
          </Typography>
          <Typography className={classes.pos}>
            {data.orders && data.orders.length > 0 ? t("Client Unpaid") : t("Empty Table")}
          </Typography>
          {/* <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography> */}
        </CardContent>
        <CardActions>
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
      </div>
    )
}

Tile.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.any,
    text: PropTypes.any
  })
}

export default Tile;