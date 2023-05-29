"use client"; // This is a client component 👈🏽

import { useState } from "react";

interface InputProps {
  name?: string;
  id?: string;
  onChange?: any;
  value?: string;
  label?: string;
  type?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  id,
  onChange,
  value,
  label,
  type,
  placeholder,
}) => {
  return (
    <div className="lg:px-4">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        id={id}
        type={type}
        placeholder={placeholder || ""}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
