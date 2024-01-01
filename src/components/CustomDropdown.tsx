import React, { useState, useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import "./CustomDropdown.scss";

interface Option {
  label: string;
  value: string;
}

const CustomDropdown: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    }
  });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newOption: Option = {
        label: inputValue,
        value: inputValue.toLowerCase(),
      };
      setSelectedOptions([...selectedOptions, newOption]);
      setInputValue("");
    }
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions.splice(index, 1);
    setSelectedOptions(updatedOptions);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="list-wrapper">
        <input
          onFocus={toggleDropdown}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyPress}
          placeholder="Type and press Enter to add new item"
        />

        {dropdownOpen && selectedOptions.length > 0 && (
          <div className={`dropdown-content ${dropdownOpen ? "open" : ""}`}>
            <div className="selected-options">
              {selectedOptions.map((option, index) => (
                <div className="option" key={index}>
                  {option.label}
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveOption(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="select-wrapper">
        <label htmlFor="dropdown">Please select from the list</label>
        <select id="dropdown" className="select-dropdown">
          {selectedOptions.map((option) => (
            <option>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomDropdown;
