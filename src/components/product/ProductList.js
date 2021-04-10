// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';

// import Grid from '@material-ui/core/Grid';

// import { QuantityInput } from '../common/QuantityInput'
// import { Link } from 'react-router-dom';
// import { setProduct } from '../../redux/actions/product'

// import DefaultImage from '../../assets/Default-Image.jpg'

// import {Product} from './Product'


// const ProductList = ({ list, setProduct }) => {

//     // const [list, setProducts] = useState([]);

//     function handleSelect(product) {
//         setProduct(product);
//     }

//     // function handleIncrease(v) {

//     // }
//     // function handleDecrease(v) {

//     // }
//     // function handleQuantityChange(v) {

//     // }

//     function getPictureUrl(d) {
//         return d.pictures[0];
//     }

//     return (
//         list && list.length ?
//             list.map(d => 
//                 <Link key={d._id}
//                     style={{ textDecoration: 'none' }}
//                     to={{ pathname: `/products/${d._id}` }}
//                     onClick={e => handleSelect(d)} >

//                         <Product data={d}/>
//                         {/* <Grid container  className="product-row">
//                             <Grid item xs={6} m={0} className="pic-col">
//                             <img src={DefaultImage} />
//                             </Grid>
//                             <Grid item xs={6}> 
//                                 <div>{d.name}</div>
//                                 <div>${d.price}</div>
//                             </Grid>
//                         </Grid> */}
//                 </Link>
//             )
//             :
//             <div>No Available Products</div>
//     )
// }

// const mapStateToProps = state => ({
//     product: state.product
// });

// export default connect(
//     mapStateToProps,
//     { setProduct }
// )(ProductList);