import React from 'react';
import { Tabs, Tab } from '@mui/material';

const TabNavigation = ({ value, onChange, tabs }) => {
  return (
    <Tabs value={value} onChange={onChange} aria-label="Details Tabs" centered>
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab.label} />
      ))}
    </Tabs>
  );
};

export default TabNavigation;
