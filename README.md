# UI Components 
Simple React UI Components (ebrap-ui) --WIP

# Description
React UI Components used in the EBRAP project. These components are designed to be simple and re-usable. The main package codebase is written with typescript for ease of use. Compatible with the latest version of React.

# Demo
An online demo is available here: https://nsiebenaller.github.io/ui-components-demo/index.html

## Installation

UI-Components (ebrap-ui) is available as an [npm package](https://www.npmjs.com/package/ebrap-ui).

```sh
npm install ebrap-ui
```

## Current Components
- Autocomplete
- Button
- Datepicker
- Dropdown
- Multiselect
- Option (used by Dropdown & Multiselect)
- Select (used by Dropdown & Multiselect)
- TextArea
- TextField
- Icon (used to render different icons by name)

## Current Icons
From: https://material.io/resources/icons/?style=baseline
- ArrowDropDown
- CalendarToday
- CheckBox
- CheckBoxOutlineBlank

## Usage

Here is a quick example to get you started,

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'ebrap-ui';

function App() {
  return (
    <Button>
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Questions

For _how-to_ questions and issues, open an issue with the repo or contact Nicholas Siebenaller

## Roadmap

- Radio Buttons
- Checkboxes
- Table & Table Variants
- Tooltips
- Dropdown/Multiselect group variants
- Modals (& simple Confirmation Dialog support)
- Switches
- File Inputs & File-Drop Zones
- Expand icon support




