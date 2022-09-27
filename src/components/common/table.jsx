/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

// props args destructured
const Table = ({ columns, sortColumn, onSort, datas }) => (
  <table className="table">
    <TableHeader
      columns={columns} // props defined at the top
      sortColumn={sortColumn}
      onSort={onSort}
    />
    <TableBody columns={columns} datas={datas} />
  </table>
);

export default Table;
