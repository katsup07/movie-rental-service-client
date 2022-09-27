/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

// columns: array, sortColumn: object, onSort: function
class TableHeader extends Component {
  raiseSort = (path) => {
    console.log(`sorting by ${path}...`);
    const newSortColumn = { ...this.props.sortColumn };
    if (newSortColumn.path === path) {
      newSortColumn.order = newSortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      newSortColumn.order = 'asc';
      newSortColumn.path = path;
    }
    this.props.onSort(newSortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
