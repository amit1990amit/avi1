import React, { useState, useEffect, useRef } from "react";
import Select , { components, SingleValueProps } from 'react-select';
import { ColourOption, colourOptions } from './data';

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<ColourOption>) => (
  <components.SingleValue {...props}>{children}</components.SingleValue>
);

type SelectProps = {
    data: any
};

const SelectComponent = ({ data }: SelectProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    if( !data || data.length>0 ){
      return
    }

    return (
        <Select
        defaultValue={data[0]}
        isClearable
        styles={{
          singleValue: (base) => ({
            ...base,
            padding: 5,
            borderRadius: 5,
            background: colourOptions[2].color,
            color: 'white',
            display: 'flex',
          }),
        }}
        components={{ SingleValue }}
        isSearchable
        // name="color"
        options={data}
      />
    );
};

export default SelectComponent;
