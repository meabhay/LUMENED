import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <div className="my-6 flex flex-col gap-4 rounded-md border-[1px] border-pink-700 bg-pink-900 p-6 sm:my-10 sm:flex-row sm:gap-x-5 sm:p-8 sm:px-12">
        <div className="flex aspect-square h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pink-700 self-center sm:h-14 sm:w-14 sm:self-start">
          <FiTrash2 className="text-2xl text-pink-200 sm:text-3xl" />
        </div>
        <div className="flex flex-col space-y-3 text-center sm:space-y-2 sm:text-left">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="text-pink-25">
            <p className="text-sm sm:text-base">Would you like to delete account?</p>
            <p className="mt-2 text-sm sm:text-base">
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
          </div>
          <button
            type="button"
            className="mt-3 w-fit cursor-pointer self-center italic text-pink-300 transition-colors hover:text-pink-200 sm:self-start"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  )
}