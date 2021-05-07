// import React from 'react'
// // import { Link } from 'react-router-dom';
// import { connect } from 'react-redux'
// // import PropTypes from "prop-types"

// import Button from '@material-ui/core/Button'
// // import { QuantityInput } from '../../components/common/QuantityInput'
// import { updateCart } from '../../redux/cart/cart.actions'
// // import {createPaymentAsync} from '../../redux/payment/payment.actions'

// // import Header from '../../components/common/Header'

// // const CreditCardPage = ({merchant, product, updateCart}) => {
// const CreditCardPage = () => {
//     // const [quantity, setQuantity] = useState(0);

//     // function handleSelect() {

//     // }

//     // function handleUpdate(quantity) {
//     //     if(product){
//     //         updateCart({
//     //             productId: product._id,
//     //             productName: product.name,
//     //             price: product.price,
//     //             cost: product.cost,
//     //             taxRate: product.taxRate,
//     //             quantity
//     //         });
//     //     }
//     // }

//     function handlePlaceOrder(){
//         // createPaymentAsync({
//         //     // userId
//         // }); // {userId, payment: {method, cc, exp, cvd, addr}, cart}
//     }

//     return (
//         <div>
//             {/* <Header title={'Credit Card'}></Header> */}
//                 {/* <Link style={{ textDecoration: 'none' }} to={{ pathname: `/order-history` }} > */}
//                     <Button onClick={handlePlaceOrder}>Place Order</Button>
//                 {/* </Link> */}
//         </div>
//     )
// }

// // ProductPage.propTypes = {
// //     match: PropTypes.shape({
// //         params: PropTypes.shape({
// //         id: PropTypes.string
// //         })
// //     }),
// //     history: PropTypes.object
// // };

// const mapStateToProps = state => ({
//     product: state.product,
//     merchant: state.merchant
// });

// export default connect(
//     mapStateToProps,
//     {updateCart}
// )(CreditCardPage);