import React, { useMemo, useRef, useState } from 'react'

interface PagitationProps {
  // 总数据
  totalCount: number
  // 默认第几页
  currentPage?: number
  // 一页几条数据
  itemsPerPage?: number
  onChange?: (selectPage: number, prevPage: number, itemsPerPage: number) => void
}

const Pagitation: React.FC<PagitationProps> = (props) => {
  const {
    totalCount = 0, // 总数据数
    currentPage: _currentPage = 1, // 默认第一页
    itemsPerPage: _itemsPerPage = 10,
    onChange,
  } = props

  const [currentPage, setCurrentPage] = useState(_currentPage)
  // todo 选择没页数据多少条.
  const [itemsPerPage, setItemsPerPage] = useState(_itemsPerPage)

  // const lastPage = useMemo(() => {
  //   return Math.ceil(totalCount / itemsPerPage)
  // }, [itemsPerPage])
  const lastPage = Math.ceil(totalCount / itemsPerPage)

  const _paginate = useMemo(() => {
    let pages = []
    const pageListLength = Math.ceil(totalCount / itemsPerPage) || 1
    if (pageListLength <= 8) {
      pages = Array.from(Array(pageListLength), (_, index) => index + 1)
      return
    }

    pages.push(1)

    if (currentPage < 5) {
      pages.push(2, 3, 4, 5, '...')
    }
    else if (currentPage >= 5 && currentPage <= pageListLength - 4) {
      pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...')
    }
    else {
      pages.push(
        '...',
        pageListLength - 4,
        pageListLength - 3,
        pageListLength - 2,
        pageListLength - 1,
      )
    }

    pages.push(pageListLength)

    return pages
  }, [currentPage, itemsPerPage])

  const changePage = (selectPage: number | string) => {
    if (typeof selectPage === 'string')
      return
    console.log(`第${selectPage}页`)
    const prevPage = currentPage
    setCurrentPage(selectPage)

    onChange?.(selectPage, prevPage, itemsPerPage)
  }

  const prevChange = () => {
    if (currentPage === 1)
      return
    changePage(currentPage - 1)
  }

  const nextChange = () => {
    // 最后一页
    if (currentPage === lastPage)
      return

    changePage(currentPage + 1)
  }

  return (
    <div className="flex justify-start items-center p-2">
      <div
        className={`${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer  hover:text-blue-500 '} `}
        onClick={prevChange}>
          Previus
      </div>
      <section className='mx-3 flex justify-start items-center'>
        {
          (_paginate!).map((v, i) => (
            <div
              key={`${v}-${i}`}
              className={`mx-1 cursor-pointer hover:text-blue-500 ${currentPage === v ? 'text-blue-500' : ''}`}
              onClick={() => changePage(v)}
              >
                {v}
            </div>
          ))
        }
      </section>
      <div
         className={`${currentPage === lastPage ? 'cursor-not-allowed' : 'cursor-pointer  hover:text-blue-500'} `}
        onClick={nextChange}>
          Next
      </div>
    </div>
  )
}

export default Pagitation
