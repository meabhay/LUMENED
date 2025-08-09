import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="mb-8 md:mb-14">
        <h1 className="text-2xl font-medium text-richblack-5 sm:text-3xl">
          Edit Profile
        </h1>
        <p className="mt-2 text-sm text-richblack-300 sm:text-base">
          Manage your profile settings and account preferences
        </p>
      </div>
      
      {/* Change Profile Picture */}
      <div className="w-full">
        <ChangeProfilePicture />
      </div>
      
      {/* Profile */}
      <div className="w-full">
        <EditProfile />
      </div>
      
      {/* Password */}
      <div className="w-full">
        <UpdatePassword />
      </div>
      
      {/* Delete Account */}
      <div className="w-full">
        <DeleteAccount />
      </div>
    </div>
  )
}
