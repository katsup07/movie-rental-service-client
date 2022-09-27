/* eslint-disable */
import React from 'react';

// props args destructured
/* textProperty and valueProperty allow us to work with any kind of object and not just genres, so this component can be used elsewhere too */    
const ListGroup = ({ items, textProperty, valueProperty, onItemSelect, selectedItem }) => {
  return (
    <ul className="list-group clickable">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          className={
            selectedItem === item
              ? 'list-group-item m-0 active'
              : 'list-group-item m-0'
          }
          key={item[valueProperty]} /* since string, need to use brackets */
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

export default ListGroup;

// ! /* Instead of hard coding textProperty and valueProperty in listGroup with genre.name / genre._id, pass them as generic strings from movies.jsx to make listGroup component more flexible and able to be used elsewhere, or set them as defaultProps in the component, like above. This reduces unnecessary code in movies.jsx */
