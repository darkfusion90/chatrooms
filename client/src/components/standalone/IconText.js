import React from 'react';


const ICON_POS_LEFT = 0;
const ICON_POS_RIGHT = 1;

const IconWrapper = ({ icon, iconPos, currentPos }) => {
    if (currentPos !== iconPos) {
        return null
    }

    const xMargin = iconPos === ICON_POS_LEFT ? 'ml-0 mr-2' : 'mr-0 ml-2'
    return (
        <span className={`my-auto ${xMargin}`}>
            {icon}
        </span>
    )
}

const IconText = ({ icon, iconPos, className, children, ...rest }) => {
    const iconProps = { icon, iconPos }
    return (
        <div className={`d-flex ${className}`} {...rest}>
            <IconWrapper currentPos={ICON_POS_LEFT} {...iconProps} />
            <span className='my-auto mx-0'>
                {children}
            </span>
            <IconWrapper currentPos={ICON_POS_RIGHT} {...iconProps} />
        </div>
    )
}

IconText.defaultProps = {
    iconPos: ICON_POS_LEFT,
    className: ''
}

export { ICON_POS_RIGHT, ICON_POS_LEFT }
export default IconText;
