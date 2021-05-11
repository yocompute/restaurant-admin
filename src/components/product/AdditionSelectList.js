import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

import { updateCartItem } from '../../redux/cart/cart.actions';
import { updateCombo } from '../../redux/product/product.actions';

import { selectProductQuantity } from '../../redux/cart/cart.selectors';
import { selectComboAdditions } from '../../redux/product/product.selectors';

import AdditionSelect from './AdditionSelect';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    title:{
        width: '100%',
        padding: '10px'
    },
    link:{
        textDecoration: 'none'
    },
}));

/**
 * 
 * @param {*} additions --- Additons available to select 
 * @returns 
 */
const AdditionSelectList = ({brand, parentProduct, additions, updateCartItem, quantity, combo, comboAdditions, updateCombo, selectedAdditions}) => {
    const classes = useStyles();
    const {t} = useTranslation();

    /**
     * 
     * @param {*} d  {item [CartItem or AddtionItem], quantity [number]}
     */
    function handleChange(parentProduct, addition, additionQuantity) {
        if(comboAdditions.length === 0){
            if(additionQuantity !== 0){ // add new
                const comboId = uuidv4();
                updateCombo(comboId, parentProduct, addition, additionQuantity);
            }else{
                // change back to single parentProduct
                updateCombo(combo.comboId, parentProduct, addition, additionQuantity);
            }
        }else{
            updateCombo(combo.comboId, parentProduct, addition, additionQuantity);
        }
    }

    return additions && additions.length > 0 ?
        <div>
            <div className={classes.title}>{t("Additions")}:</div>
            {

                additions.map(addition => 
                    <AdditionSelect key={addition._id} addition={addition} onChange={handleChange}/>
                )
            }
        </div>
        :<div />
}

AdditionSelectList.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }),
    history: PropTypes.object
};


const mapStateToProps = state => ({
    parentProduct: state.product,
    brand: state.brand,
    quantity: selectProductQuantity(state),
    combo: state.combo,
    comboAdditions: selectComboAdditions(state),
});

export default connect(
    mapStateToProps,
    {
        updateCartItem,
        updateCombo
    }
)(AdditionSelectList);