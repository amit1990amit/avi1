import React, { useState, useEffect, useRef } from "react";
import Select , { components, SingleValueProps } from 'react-select';
import { ColourOption, colourOptions } from './data';

// const SingleValue = ({
//   children,
//   ...props
// }: SingleValueProps<ColourOption>) => (
//   <components.SingleValue {...props}>{children}</components.SingleValue>
// );

// type SelectProps = {
//     data: any
// };

const NewSelectComponent = ({ data }: any) => {

  console.log('data1111', data)
  const selectOptions = data.labels.map((item: any) => ({
    value: item.data,
    label: item.title,
  }));
    return (
        <Select
        // defaultValue={data[0]}
        // isClearable
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
        // components={{ SingleValue }}
        // isSearchable
        // name="color"
        options={selectOptions}
      />
    );
};

export default NewSelectComponent;
