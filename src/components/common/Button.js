import React from 'react';
import { useTranslation } from "react-i18next";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import PrintIcon from '@material-ui/icons/Print';
import Button from "@material-ui/core/Button";

export const AddTextButton = ({text, size, variant, onClick}) => {
    const { t } = useTranslation();
    return <Button
        size={size}
        variant={variant}
        color="primary"
        startIcon={<AddIcon />}
        onClick={onClick}
    >
        {t(text)}
    </Button>
}

export const RemoveTextButton = ({text, size, variant, onClick}) => {
    const { t } = useTranslation();
    return <Button
        size={size}
        variant={variant}
        color="primary"
        startIcon={<RemoveIcon />}
        onClick={onClick}
    >
        {t(text)}
    </Button>
}

export const DelTextButton = ({text, size, variant, onClick}) => {
    const { t } = useTranslation();
    return <Button
        size={size}
        variant={variant}
        color="primary"
        startIcon={<ClearIcon />}
        onClick={onClick}
    >
        {t(text)}
    </Button>
}

export const PrintTextButton = ({text, size, variant, onClick}) => {
    const { t } = useTranslation();
    return <Button
        size={size}
        variant={variant}
        color="primary"
        startIcon={<PrintIcon />}
        onClick={onClick}
    >
        {t(text)}
    </Button>
}