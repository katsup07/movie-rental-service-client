/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
  renderCell = (data, column) => {
    // See moviesTable's columns properties that were defined to find this content() function
    if (column.content) return column.content(data);

    return _.get(data, column.path);
  };

  createKey = (data, column) => data._id + (column.path || column.key);

  render() {
    const { datas, columns } = this.props;
    return (
      <tbody>
        {/* data = array of movies. 
            column = a column headings(Title, Genre, Stock etc.) */}
        {datas.map((data) => (
          <tr key={data._id}>
            {columns.map((column) => (
              <td key={this.createKey(data, column)}>
                {this.renderCell(data, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;