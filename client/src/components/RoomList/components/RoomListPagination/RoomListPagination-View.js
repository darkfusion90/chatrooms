import React from 'react';
import { Container, Pagination } from 'react-bootstrap'

import { TooltipWrapper } from '../../../standalone'
import {
    getPaginationOffsets,
    MAX_PAGE_NUMBERS_DISPLAYED
} from './utils'

const RoomListPaginationView = ({
    countTotalPublicRooms,
    itemsPerPage,
    currentPageNumber,
    setCurrentPageNumber,
}) => {

    const totalPages = Math.ceil(countTotalPublicRooms / itemsPerPage)

    const onPaginationItemClick = (itemNumber) => {
        setCurrentPageNumber(itemNumber)
    }

    const onPaginationPreviousClick = () => {
        setCurrentPageNumber(Math.max(currentPageNumber - 1, 1))
    }

    const onPaginationNextClick = () => {
        setCurrentPageNumber(Math.min(currentPageNumber + 1, totalPages))
    }

    const onPaginationFirstClick = () => {
        setCurrentPageNumber(1)
    }

    const onPaginationLastClick = () => {
        setCurrentPageNumber(totalPages)
    }

    const getPaginationItems = () => {
        const paginationItems = []

        for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
            paginationItems.push(
                <Pagination.Item
                    active={currentPageNumber === pageIndex}
                    key={pageIndex}
                    id={pageIndex}
                    onClick={() => onPaginationItemClick(pageIndex)}
                >
                    {pageIndex}
                </Pagination.Item>
            )
        }

        if (paginationItems.length > MAX_PAGE_NUMBERS_DISPLAYED) {
            const {
                leftOffset,
                rightOffset
            } = getPaginationOffsets(currentPageNumber, paginationItems.length)

            const rightEllipsis = [rightOffset < paginationItems.length ?
                <Pagination.Ellipsis key='ellipsis-right' /> : null]
            const leftEllipsis = [leftOffset > 0 ?
                <Pagination.Ellipsis key='ellipsis-left' /> : null]

            return [
                ...leftEllipsis,
                ...paginationItems.slice(leftOffset, rightOffset + 1),
                ...rightEllipsis
            ]
        }

        return paginationItems
    }

    return (
        <Container fluid className='d-flex flex-column align-items-center mt-5'>
            <p>Showing Page {currentPageNumber} of {totalPages}</p>
            <Pagination className='mx-auto'>

                <TooltipWrapper
                    label='First page'
                    id='pagination-first'
                    triggerComponent={<Pagination.First onClick={onPaginationFirstClick} />}
                />
                <TooltipWrapper
                    triggerComponent={<Pagination.Prev onClick={onPaginationPreviousClick} />}
                    label='Previous Page'
                    id='pagination-prev'
                />

                {getPaginationItems()}

                <TooltipWrapper
                    triggerComponent={<Pagination.Next onClick={onPaginationNextClick} />}
                    label='Next Page'
                    id='pagination-next'
                />
                <TooltipWrapper
                    triggerComponent={<Pagination.Last onClick={onPaginationLastClick} />}
                    label='Last Page'
                    id='pagination-last'
                />

            </Pagination>
        </Container>
    )
}

export default RoomListPaginationView;
