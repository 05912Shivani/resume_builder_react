/**
 * TabNavigation Component
 * Provides tab-based navigation using Material-UI's Tabs and Tab components.
 * 
 * Props:
 * - value (Number): The currently selected tab index.
 * - onChange (Function): Callback function triggered when a tab is selected.
 * - tabs (Array): An array of objects containing tab labels.
 */

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
