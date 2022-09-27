import _ from 'lodash';

export default function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // _.slice(startIndex); // method slices array starting from the index
  // _.take() // give an array and total number of items to take from it
  // in order to chain lodash methods, first need to convert items array via a lodash wrapper  _()

  return _(items).slice(startIndex).take(pageSize).value(); // value() converts back to regular array
}
