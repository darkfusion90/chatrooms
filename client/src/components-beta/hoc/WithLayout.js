import React from 'react';
import Header from '../../components-beta/Header'

const LayoutEnhancer = Component => {
    return (
        <div>
            <Header />
            <div className='centered-content'>
                {Component}
            </div>
        </div>
    )
}

export default LayoutEnhancer;
