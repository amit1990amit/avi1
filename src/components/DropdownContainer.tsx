import React from "react";
import NewSelectComponent from './NewSelectComponent'


const DropdownContainer = ({ data }: any) => {
  console.log('ccc', data)
  const { variants, attributes } = data
  const currLabel = variants[0].labels

  const mapAttribute = attributes.reduce((acc: any, el: any) => {
    return {...acc, [el.id]: el}
  }, {})
  console.log('currLabel', currLabel, mapAttribute)


  return (
    <div>
      {currLabel.map((el: any) => {
        return <NewSelectComponent data={mapAttribute[el.attribute_id]}/>
      })}
    </div>
  );
};

export default DropdownContainer;
