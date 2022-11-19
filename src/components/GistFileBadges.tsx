import React from 'react';
import Constants from "../constants";
import Box from "@mui/material/Box";


const GistFileBadges = ({fileTypes}: { fileTypes: string[] }) => {

    return (
        <Box sx={fileBadgeStyles.wrapper}>
            {fileTypes.map((fileType, index) =>
                <div key={index} style={fileBadgeStyles.badge}>{fileType}</div>
            )}
        </Box>
    )
}

const fileBadgeStyles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        flexWrap: 'wrap',
        gridGap: 5,
    },
    badge: {
        padding: 5,
        borderRadius: 5,
        background: Constants.PRIMARY,
        color: Constants.SECONDARY,
        fontSize: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        height: 20,
    }
}

export default GistFileBadges;