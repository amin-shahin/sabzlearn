import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './Pagination.css'

const Pagination = ({items,itemsCount,pathname,setShownCourses}) => {

    const {page} = useParams()
    const pageConverToNumber = Number(page)
    const [pagesCount,setPagesCount] = useState(null)

    useEffect(()=>{
      let endIndex  = itemsCount * page
      let startIndex = endIndex - itemsCount        
      let paginatedItems = items.slice(startIndex,endIndex)
      setShownCourses(paginatedItems)

      let pagesNumber = Math.ceil(items.length / itemsCount)
      setPagesCount(pagesNumber)
    },[page,items])
    return ( 

        <div className="courses-pagination">
        <ul className="courses__pagination-list">
        {Array(pagesCount).fill(0).length <=1 ? '' : (
                    <li className="courses__pagination-item">
                    <Link to={`${pathname}/${(pageConverToNumber)}`} className="courses__pagination-link">
                      <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
                    </Link>
                  </li>
        )}

         
            {Array(pagesCount).fill(0).map((item,index) =>(
              <li className="courses__pagination-item">
              <Link to={`${pathname}/${index+1}`} className={`courses__pagination-link ${ Number(page) === (index+1) ? 'courses__pagination-link--active':''} `}>
                {index + 1}
              </Link>
            </li>
            ))}

           {Array(pagesCount).fill(0).length <=1 ? '' : (
                    <li className="courses__pagination-item">
                    <Link to={`${pathname}/${(pageConverToNumber)}`} className="courses__pagination-link">
                    <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
                    </Link>
                  </li>
        )}
        </ul>
      </div>
     );
}


export default Pagination;