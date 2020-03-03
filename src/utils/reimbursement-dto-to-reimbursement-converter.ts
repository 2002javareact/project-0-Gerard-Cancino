import { ReimbursementDTO } from "../dtos/ReimbursementDTO";
import Reimbursement from "../models/Reimbursement";

export function reimbursementDTOToReimbursementConverter(reimbursementDTO:ReimbursementDTO){
  return new Reimbursement(
    reimbursementDTO.id,
    reimbursementDTO.author_id,
    reimbursementDTO.amount,
    reimbursementDTO.date_submitted,
    reimbursementDTO.date_resolved,
    reimbursementDTO.description,
    reimbursementDTO.status_id,
    reimbursementDTO.resolver_id,
    reimbursementDTO.type
  )
}

