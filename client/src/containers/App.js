import React, { useState } from 'react';
import uploadFile from '../util/uploadFile';

import './App.css';

const RenderRows = ({ row, delimiter, lineNumber }) => (
  <tr key={lineNumber}>
    {row.split(delimiter).map((column, index) => <td key={index}>{column}</td>)}
  </tr>
);

const App = (props) => {
  const initialFileData = props.fileData || '';
  const [fileData, setFileData] = useState(initialFileData);
  const [delimiter, setDelimiter] = useState('|');
  const [lines, setLines] = useState('2');

  const fileRows = fileData.split('\n');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    const fileField = document.querySelector('input[type="file"]');
    formData.append('file', fileField.files[0]);

    uploadFile(formData).then(setFileData);
  }

  const handleDrop = event => {
    event.stopPropagation();
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', event.dataTransfer.files[0]);

    uploadFile(formData).then(setFileData);
  }

  const preventDefaultAction = e => {
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <div className="App" onDragEnter={preventDefaultAction}
      onDragOver={preventDefaultAction} onDrop={handleDrop}>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Choose file to upload: </label>
          <input type="file" id="file" name="file" accept=".txt" />
        </div>
        <div>
          <button id="submit">Submit</button>
        </div>
      </form>
      <div className="filter">
        <label htmlFor="delimiter">Delimiter:</label>
        <input type="text" id="delimiter" name="delimiter" defaultValue={delimiter}
          onChange={(event) => setDelimiter(event.target.value)} />
        <label htmlFor="lines">Lines:</label>
        <input type="text" id="lines" name="lines" defaultValue={lines}
          onChange={(event) => setLines(event.target.value)} />
      </div>
      <table>
        <tbody>
          {fileRows.map((row, lineNumber) => lineNumber < lines
            && <RenderRows key={lineNumber} row={row} delimiter={delimiter} lineNumber={lineNumber} />
          )}
        </tbody>
      </table>
    </div >
  );
}

export default App;
