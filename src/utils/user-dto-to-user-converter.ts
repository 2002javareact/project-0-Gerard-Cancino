import { UserDTO } from "../dtos/UserDTO";
import {User} from "../models/User";
import Role from "../models/Role";

export function userDTOToUserConverter(userDTO:UserDTO):User {
  return new User(userDTO.username,
    userDTO.emailAddress,
    userDTO.firstName,
    userDTO.lastName,
    new Role(userDTO.roleId,userDTO.roleName))
}