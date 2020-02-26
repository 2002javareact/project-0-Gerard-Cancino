import { UserDTO } from "../dtos/UserDTO";
import {User} from "../models/User";
import Role from "../models/Role";

export function userDTOToUserConverter(userDTO:UserDTO):User {
  return new User(
    userDTO.id,
    userDTO.username,
    userDTO.first_name,
    userDTO.last_name,
    userDTO.email,
    new Role(userDTO.role_id,userDTO.name))
}