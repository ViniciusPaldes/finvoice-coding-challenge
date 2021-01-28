import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';

import './App.css';
import Header from './components/header';
import JsonInput from './components/jsonInput/jsonInput';
import Result from './components/result';
import { compareJSON } from './utils/comparison';

const App = () => {

  const FIRST = 'FIRST';
  const SECOND = 'SECOND';

  const [firstFile, setFirstFile] = useState();
  const [secondFile, setSecondFile] = useState();
  const [similarity, setSimilarity] = useState();
  const inputRef1 = useRef();
  const inputRef2 = useRef();

  const compareObjects = () => {
    console.log("File to compare", firstFile);
    console.log("With", secondFile);
    setSimilarity(compareJSON(firstFile, secondFile));
  }

  const handleReset = () => {
    setFirstFile(undefined);
    setSecondFile(undefined);
    setSimilarity(undefined);
    inputRef1.current.value = '';
    inputRef2.current.value = '';
  }

  const handleFileSelect = (file, type) => {
    const reader = new FileReader();
    reader.onload = async (e) => { 
      const text = (e.target.result);
      switch (type) {
        case FIRST:
          setFirstFile(JSON.parse(text));
          break;
        case SECOND:
          setSecondFile(JSON.parse(text));
          break;
        default:
          break;
      }
    };
    file && reader.readAsText(file.target.files[0])
  }

  return (
    <React.Fragment>
   ,   <Header 
        title="JSON Object Similarity Score"
      />
      <React.Fragment>
        <JsonInput 
          label="Choose first JSON file"
          handleSelect={(file) => handleFileSelect(file, FIRST)}
          inputRef={inputRef1}
        />
        <JsonInput 
          label="Choose second JSON file"
          handleSelect={(file) => handleFileSelect(file, SECOND)}
          inputRef={inputRef2}
        />  
        <Button
         variant="contained" 
         color="primary"
         onClick={compareObjects}
         disabled={!firstFile || !secondFile}
        >  
          Compare objects
        </Button>
        <Result 
          similarity={similarity} 
          handleReset={handleReset}
        />
      </React.Fragment>
    </React.Fragment>
  );
}

export default App;
