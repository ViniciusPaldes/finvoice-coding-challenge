import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';

import './App.css';
import Header from './components/header';
import JsonInput from './components/jsonInput';
import Result from './components/result';
import { compareJSON } from './utils/comparison';
import { makeStyles } from '@material-ui/core';

const App = () => {

  const FIRST = 'FIRST';
  const SECOND = 'SECOND';

  const [firstFile, setFirstFile] = useState();
  const [secondFile, setSecondFile] = useState();
  const [similarity, setSimilarity] = useState();
  const inputRef1 = useRef();
  const inputRef2 = useRef();

  const compareObjects = () => {
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
    if (file && file.target.files[0]) {
      reader.readAsText(file.target.files[0])  
    }
  }

  const useStyles = makeStyles((theme) => ({
    content: {
        marginLeft: 16,
    },
  }));

  const classes = useStyles();
  
  return (
    <React.Fragment>
      <Header 
        title="JSON Object Similarity Score"
      />
      <div className={classes.content}> 
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
      </div>
    </React.Fragment>
  );
}

export default App;
