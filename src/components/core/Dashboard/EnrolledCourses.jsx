import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const [localLoading, setLocalLoading] = useState(true)
  
  const getEnrolledCourses = async () => {
    try {
      setLocalLoading(true)
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    } finally {
      setLocalLoading(false)
    }
  };
  
  useEffect(() => {
    getEnrolledCourses();
  }, [])

  // Show loading only when we're actually fetching courses
  if (localLoading && !enrolledCourses) {
    return (
      <div className="flex flex-col">
        <div className="text-3xl text-richblack-50">Enrolled Courses</div>
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses?.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Desktop view */}
          <div className="hidden md:block">
            {/* Headings */}
            <div className="flex rounded-t-lg bg-richblack-500">
              <p className="w-[45%] px-5 py-3">Course Name</p>
              <p className="w-1/4 px-2 py-3">Duration</p>
              <p className="flex-1 px-2 py-3">Progress</p>
            </div>
            {/* Course Names */}
            {enrolledCourses.map((course, i, arr) => (
              <div
                className={`flex items-center border border-richblack-700 ${
                  i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
                key={i}
              >
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold">{course.courseName}</p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>
                <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {enrolledCourses.map((course, i) => (
              <div
                key={i}
                className="rounded-lg border border-richblack-700 bg-richblack-800 p-4"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={course.thumbnail}
                      alt="course_img"
                      className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2">{course.courseName}</h3>
                      <p className="text-sm text-richblack-300 line-clamp-2">
                        {course.courseDescription}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-richblack-300">Duration:</span>
                  <span className="text-richblack-100">{course?.totalDuration}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-richblack-300">Progress:</span>
                    <span className="text-richblack-100">{course.progressPercentage || 0}%</span>
                  </div>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}