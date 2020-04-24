import React from 'react'

import { DotSeparatedTexts } from '../../../standalone'
import {
    countRequestsInitial,
    countRequestsAccepted,
    countRequestsRejected
} from '../../utils'
import './RoomJoinRequestListHeader-Style.scss'


const RoomJoinRequestListHeaderView  = ({ joinRequestList }) => {
    const renderSubtitle = () => {
        if (joinRequestList.length === 0) {
            return null
        }
        return (
            <DotSeparatedTexts className='subtitle header-subtitle m-0 p-0'>
                <span>{countRequestsInitial(joinRequestList)} pending</span>
                <span>{countRequestsAccepted(joinRequestList)} accepted</span>
                <span>{countRequestsRejected(joinRequestList)} rejected</span>
            </DotSeparatedTexts>
        )
    }

    return (
        <div className='m-0'>
            <p className='mb-2'>
                Room Join Requests ({joinRequestList.length})
            </p>
            {renderSubtitle()}
        </div>
    )
}

export default RoomJoinRequestListHeaderView
