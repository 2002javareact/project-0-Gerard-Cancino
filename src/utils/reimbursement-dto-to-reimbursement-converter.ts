import { ReimbursementDTO } from "../dtos/ReimbursementDTO";
import Reimbursement from "../models/Reimbursement";

export function reimbursementDTOToReimbursementConverter(reimbursementDTO:ReimbursementDTO){
  return new Reimbursement(
    reimbursementDTO.reimbursementId,
    reimbursementDTO.author,
    reimbursementDTO.amount,
    reimbursementDTO.dateSubmitted,
    reimbursementDTO.dateResolved,
    reimbursementDTO.description,
    reimbursementDTO.status,
    reimbursementDTO.resolver,
    reimbursementDTO.type
  )
}

