import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
const Profile = () => {
  const { userInfo } = useAppStore();
  const [firstname, setFirstname] = useState("");
  return (
    <div>
      Profile <div>Email:{userInfo.email}</div>
    </div>
  );
};

export default Profile;
