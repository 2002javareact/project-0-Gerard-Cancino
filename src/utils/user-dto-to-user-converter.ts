import { UserDTO } from "../dtos/UserDTO";
import {User} from "../models/User";

export function userDTOToUserConverter(userDTO:UserDTO):User {
  return new User(userDTO.username,
    userDTO.emailAddress,
    userDTO.firstName,
    userDTO.lastName,
    userDTO.role)
}