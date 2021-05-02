import React from 'react';
import { useTranslation } from "react-i18next";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";

export const AddTextButton = ({onClick}) => {
    const { t } = useTranslation();
    return <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={onClick}
    >
        {t("Add")}
    </Button>
}