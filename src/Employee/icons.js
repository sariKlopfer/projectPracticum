import React, { useState } from 'react';

export const EditIcon = ({ onClick }) => (
  <span onClick={onClick} role="img" aria-label="Edit">✏️</span>
);

export const DeleteIcon = ({ onClick }) => (
  <span onClick={onClick} role="img" aria-label="Delete">🚮</span>
);