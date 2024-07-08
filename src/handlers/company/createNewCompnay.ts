import { Company, Users } from "../../model";
import { CompanyI } from "../../model/interface";
import { CustomError } from "../../utils/error";

export const createNewCompany = async (company: CompanyI) => {
  const doesExist = await Company.findOne({
    name: company.name,
  }).lean();
  if (doesExist) {
    throw new CustomError("Company Exist");
  }
  const newCompany = await new Company(company).save();
  await Users.findByIdAndUpdate(company.userId, {
    $set: {
      companyId: newCompany._id,
    },
  });
  return newCompany;
};
