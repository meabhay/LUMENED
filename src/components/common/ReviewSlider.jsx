import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const truncateWords = 15

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("Starting to fetch reviews...")
        setLoading(true)
        setError(null)
        
        const response = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        
        console.log("Raw API response:", response)
        
        const data = response?.data
        console.log("Extracted data:", data)
        
        if (data?.success && Array.isArray(data?.data)) {
          console.log("Data is valid, filtering reviews...")
          // Filter and validate review data
          const validReviews = data.data.filter(review => {
            const isValid = review &&
                   typeof review === 'object' &&
                   review.user &&
                   review.course &&
                   typeof review.rating === 'number'
            
            if (!isValid) {
              console.log("Invalid review found:", review)
            }
            return isValid
          })
          
          console.log("Valid reviews:", validReviews)
          setReviews(validReviews || [])
        } else {
          console.log("Invalid review data structure:", data)
          setReviews([])
        }
      } catch (error) {
        console.log("Error fetching reviews:", error)
        setError(error.message || "Failed to fetch reviews")
        setReviews([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchReviews()
  }, [])

  // console.log(reviews)

  // Loading skeleton component
  const ReviewSkeleton = () => (
    <div className="flex flex-col gap-4 bg-richblack-800 p-6 rounded-lg h-[200px] border border-richblack-700 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-richblack-600"></div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 bg-richblack-600 rounded w-3/4"></div>
          <div className="h-3 bg-richblack-600 rounded w-1/2"></div>
        </div>
      </div>
      <div className="flex-1">
        <div className="h-3 bg-richblack-600 rounded mb-2"></div>
        <div className="h-3 bg-richblack-600 rounded mb-2 w-5/6"></div>
        <div className="h-3 bg-richblack-600 rounded w-3/4"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-4 bg-richblack-600 rounded w-8"></div>
        <div className="h-4 bg-richblack-600 rounded w-20"></div>
      </div>
    </div>
  )

  return (
    <div className="text-white w-full">
      <div className="my-[50px] w-full max-w-maxContentTab lg:max-w-maxContent mx-auto">
        {loading ? (
          // Loading state
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <div className="bg-richblack-800 p-8 rounded-lg border border-richblack-700">
              <FaStar className="mx-auto mb-4 text-4xl text-richblack-400" />
              <h3 className="text-xl font-semibold text-richblack-5 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-richblack-300">
                Be the first to share your learning experience!
              </p>
            </div>
          </div>
        ) : (
          // Reviews carousel
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            loop={reviews.length > 3}
            freeMode={true}
            autoplay={reviews.length > 1 ? {
              delay: 3000,
              disableOnInteraction: false,
            } : false}
            breakpoints={{
              640: {
                slidesPerView: Math.min(2, reviews.length),
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: Math.min(3, reviews.length),
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: Math.min(4, reviews.length),
                spaceBetween: 24,
              },
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="w-full !pb-6"
          >
            {reviews.filter(review => review && review.user && review.course).map((review, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className="flex flex-col gap-4 bg-richblack-800 p-6 rounded-lg text-[14px] text-richblack-25 h-[200px] border border-richblack-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          review?.user?.image
                            ? review?.user?.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName || 'User'} ${review?.user?.lastName || 'Name'}`
                        }
                        alt={`${review?.user?.firstName || 'User'} ${review?.user?.lastName || 'Name'}`}
                        className="h-12 w-12 rounded-full object-cover border-2 border-richblack-600 flex-shrink-0"
                        onError={(e) => {
                          e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName || 'User'} ${review?.user?.lastName || 'Name'}`
                        }}
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <h1 className="font-semibold text-richblack-5 text-[16px] truncate">
                          {`${review?.user?.firstName || 'Anonymous'} ${review?.user?.lastName || 'User'}`}
                        </h1>
                        <h2 className="text-[12px] font-medium text-richblack-400 truncate">
                          {review?.course?.courseName || 'Course Name'}
                        </h2>
                      </div>
                    </div>
                    <p className="font-medium text-richblack-25 leading-relaxed flex-1 overflow-hidden">
                      {review?.review && review.review.split(" ").length > truncateWords
                        ? `${review?.review
                            .split(" ")
                            .slice(0, truncateWords)
                            .join(" ")} ...`
                        : review?.review || "No review text available"}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <h3 className="font-semibold text-yellow-100 text-[16px]">
                        {(review?.rating || 0).toFixed(1)}
                      </h3>
                      <ReactStars
                        count={5}
                        value={review?.rating || 0}
                        size={18}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<FaStar />}
                        fullIcon={<FaStar />}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default ReviewSlider