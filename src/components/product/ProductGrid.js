import PropTypes from "prop-types";
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { setProduct } from '../../redux/product/product.actions'

import DefaultImage from '../../assets/Default-Image.jpg'
// import './ProductGrid.scss'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    height: 800,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

function ProductGrid({ data, setProduct }) {
  const classes = useStyles();
  function handleSelect(product) {
    setProduct(product);
  }
  // const matches = useMediaQuery('(min-width:800px)');
  return (
    <div className={classes.root}>
      <GridList cellHeight={240} className={classes.gridList} cols={useMediaQuery('(min-width:800px)') ? 4 : 1}>
        {
          data && data.length > 0 &&
          data.map((tile) => (
            <Link key={tile._id}
              style={{ textDecoration: 'none' }}
              to={{ pathname: `/products/${tile._id}` }}
              onClick={() => handleSelect(tile)} 
            >
              <GridListTile key={tile._id} className="tile-cell">
                <div>
                  <img src={tile.img ? tile.img : DefaultImage} alt={tile.name} />
                  <div className="product-name">{tile.name}</div>
                  <div>${tile.price}</div>
                </div>
              </GridListTile>
            </Link>
          ))}
      </GridList>
    </div>
  );
}

ProductGrid.propTypes = {
  data: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func
  }),
  setProduct: PropTypes.func
}


const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { setProduct }
)(ProductGrid);
