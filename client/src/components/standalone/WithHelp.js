import React from 'react'
import PropTypes from 'prop-types'

import IconText, { ICON_POS_RIGHT } from './IconText'
import HelpIcon from './HelpIcon'


const WithHelp = ({ id, help, children, ...rest }) => {
    const createHelp = () => {
        return <HelpIcon id={id} help={help} />
    }

    return (
        <IconText icon={createHelp()} iconPos={ICON_POS_RIGHT}  {...rest}>
            {children}
        </IconText>
    )
}

HelpIcon.propTypes = {
    id: PropTypes.string.isRequired,
    help: PropTypes.string.isRequired,
}


export default WithHelp
