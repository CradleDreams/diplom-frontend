import { Avatar } from "@mui/material";
import { IUser } from "../model/types";

interface UserAvatarProps {
  user: IUser;
  size?: number;
}

export const UserAvatar = ({ user, size = 40 }: UserAvatarProps) => {
  return (
    <Avatar
      alt={user.username}
      src={`https://ui-avatars.com/api/?name=${user.username}&background=random&size=${size}`}
      sx={{ width: size, height: size }}
    />
  );
};
