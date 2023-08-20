import { useState } from "react";
import data from "./data.json";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Thirdpage.module.css";

export const Thirdpage = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);

  // const handleCheckboxChange = (department: string, subDepartment: string) => {
  //   const newSelectedDepartments = selectedDepartments.includes(subDepartment)
  //     ? selectedDepartments.filter((item) => item !== subDepartment)
  //     : [...selectedDepartments, subDepartment];

  //   setSelectedDepartments(newSelectedDepartments);
  // };

  const handleAccordionChange = (department: string) => {
    const newExpandedDepartments = expandedDepartments.includes(department)
      ? expandedDepartments.filter((item) => item !== department)
      : [...expandedDepartments, department];

    setExpandedDepartments(newExpandedDepartments);
  };

  const handleDepartmentCheckboxChange = (department: string) => {
    const allSubDepartments =
      data.find((item) => item.department === department)?.sub_departments ||
      [];
    const newSelectedDepartments = selectedDepartments.includes(department)
      ? selectedDepartments.filter(
          (item) => item !== department && !allSubDepartments.includes(item)
        )
      : [...selectedDepartments, department, ...allSubDepartments];

    setSelectedDepartments(newSelectedDepartments);
  };

  const handleSubDepartmentCheckboxChange = (
    department: string,
    subDepartment: string
  ) => {
    const allSubDepartments =
      data.find((item) => item.department === department)?.sub_departments ||
      [];
    const newSelectedDepartments = selectedDepartments.includes(subDepartment)
      ? selectedDepartments.filter((item) => item !== subDepartment)
      : [...selectedDepartments, subDepartment];

    const isAllSubDepartmentsSelected = allSubDepartments.every((subDep) =>
      newSelectedDepartments.includes(subDep)
    );
    if (isAllSubDepartmentsSelected) {
      newSelectedDepartments.push(department);
    } else {
      const departmentIndex = newSelectedDepartments.indexOf(department);
      if (departmentIndex !== -1) {
        newSelectedDepartments.splice(departmentIndex, 1);
      }
    }

    setSelectedDepartments(newSelectedDepartments);
  };

  return (
    <div>
      <h2 className={styles.heading}>Departments and Sub-Departments</h2>
      {data.map((item, index) => (
        <Accordion
          key={index}
          expanded={expandedDepartments.includes(item.department)}
          onChange={() => handleAccordionChange(item.department)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Checkbox
              checked={selectedDepartments.includes(item.department)}
              onChange={() => handleDepartmentCheckboxChange(item.department)}
            />
            {item.department}
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {item.sub_departments.map((subDepartment, subIndex) => (
                <li key={subIndex}>
                  <Checkbox
                    checked={selectedDepartments.includes(subDepartment)}
                    onChange={() =>
                      handleSubDepartmentCheckboxChange(
                        item.department,
                        subDepartment
                      )
                    }
                  />
                  {subDepartment}
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
