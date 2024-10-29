import React, { ReactNode } from "react";

type FormGroupProps = {
    children: ReactNode,
    label: string,
    labelId: string
}

const FormGroup:React.FC<FormGroupProps> = ({children, label, labelId}) => {
  return (
    <div className="space-y-6 sm:space-y-5">
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
        <label
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          htmlFor={labelId}
        >
          {label} <span className="text-red-500">*</span>
        </label>{" "}
        <div className="mt-1 sm:self-center flex items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormGroup;
