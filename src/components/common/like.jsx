/* eslint-disable react/prop-types */
import React, { Component } from 'react';

// props args destructured
const Like = ({ liked, onLikeToggle }) => {
  let classes = 'fa fa-heart';

  if (!liked) classes += '-o';
  return (
    <i
      onClick={onLikeToggle}
      style={{ cursor: 'pointer' }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
