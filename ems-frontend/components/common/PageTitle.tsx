import React from 'react';

const PageTitle: React.FC<{ title: string }> = ({ title }) => (
  <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 28, color: '#262626', marginBottom: 24 }}>
    {title}
  </h1>
);

export default PageTitle;
