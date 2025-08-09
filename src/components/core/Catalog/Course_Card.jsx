import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const CourseCard = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="group hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full rounded-xl object-cover group-hover:opacity-90 transition-opacity duration-300`}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5 group-hover:text-yellow-25 transition-colors duration-200 font-medium line-clamp-2">
              {course?.courseName}
            </p>
            <p className="text-sm text-richblack-50 font-light">
              By {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-yellow-5 font-semibold">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400 text-sm">
                ({course?.ratingAndReviews?.length} Reviews)
              </span>
            </div>
            <p className="text-xl text-richblack-5 font-bold group-hover:text-yellow-25 transition-colors duration-200">
              ₹ {course?.price?.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default CourseCard
