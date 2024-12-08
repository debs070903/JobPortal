import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies = [], searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);
  return (
    <div className="w-full my-6 mx-auto">
      <Table>
        <TableCaption>List of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Logo</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="text-right font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length <= 0 ? (
            <span>Yet to register any company</span>
          ) : (
            <>
              {filterCompany?.map((company) => {
                return (
                  <TableRow key={company._id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={company?.logo} />
                      </Avatar>
                    </TableCell>
                    <TableCell>{company?.name}</TableCell>
                    <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger className="cursor-pointer">
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="flex items-center gap-4">
                          <Edit2
                            className="w-4 cursor-pointer"
                            onClick={() =>
                              navigate(`/admin/companies/${company._id}`)
                            }
                          />
                          <span>Edit</span>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
