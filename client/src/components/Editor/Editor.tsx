
import React, { useCallback, useState, useRef, useEffect } from 'react'
import MonacoEditor, { useMonaco } from '@monaco-editor/react'
import Popup from 'reactjs-popup';

import styled from "styled-components"
import { useDropzone } from 'react-dropzone'

interface Metadata {
    id: string,
    language: string,
    value: any,
    filename: string
}

interface EditorProps {
    files: any,
    setFiles: Function,
    metadata: Metadata,
    setMetadata: Function,
    onSave: Function
}

interface Files {
    id: string,
    filename: string,
    language: string,
    content: string
}

function Editor({ files, setFiles, metadata, setMetadata, onSave }: EditorProps) {

    const monaco = useMonaco()
    const [customFile, setCustomFile] = useState({
        filename: "",
        language: "",
        content: `// file created`
    })
    const [isSetted, setIsSetted] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    useEffect(() => {
        // do conditional chaining

        // or make sure that it exists by other ways
        if (monaco) {
            monaco.editor.defineTheme('my-theme', {
                base: 'vs-dark',
                inherit: true,
                rules: [{ background: "#161b20", token: "" }],
                colors: {
                    'editor.background': '#090c10',
                }
            });

            monaco.editor.setTheme("my-theme")
        }
    }, [monaco]);

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles)
        if (acceptedFiles.length > 0) {
            if (typeof (setFiles) === "function") {
                acceptedFiles.map((file: File) => (
                    setFiles([file])
                ))
            }
        }
    }, [])
    const customInputRef = useRef(null)
    const { getRootProps } = useDropzone({ onDrop })

    const switchContent = (fi: Files) => {
        console.log(fi)
        setMetadata({
            id: fi.id,
            language: fi.language,
            value: fi.content,
            filename: fi.filename
        })
    }

    const getInput = () => {
        // @ts-ignore: Object is possibly 'null'.
        customInputRef.current.click()
    }

    const createFile = () => {
        if (typeof (setFiles) === "function") {
            setFiles([customFile], true)
        }
    }

    const customSet = (e: any) => {
        console.log(e.target.files)
        const files = [...e.target.files]
        if (typeof (setFiles) === "function") {
            files.map((file: File) => {
                setFiles([file])
            })
        }
    }

    return (
        <>
        <Popup open={isSetted} modal onClose={() => setIsSetted(false)}>
            <AddFileContainer>
                <input placeholder="Type filename with extension" onChange={(e) => setCustomFile({ ...customFile,
                  filename: e.target.value
                })}/>
                <button disabled={customFile.filename === ""} onClick={() => {
                  createFile()
                  setIsSetted(false)
                }}>Create</button>
            </AddFileContainer>
        </Popup>
        <div {...getRootProps()}>
            <div>
                <Tabs>
                    {
                        files.map((fi: Files, i: any) => (
                            <Tab key={i} onClick={() => switchContent(fi)} className={fi.id === metadata.id ? "selected": ""}>{fi.filename}</Tab>
                        ))
                    }
                    <Tab style={{ backgroundColor: "#373a47" }} onClick={getInput}><input onChange={customSet} type="file" ref={customInputRef} style={{ display: "none" }} />Upload File</Tab>
                    <Tab onClick={() => setIsSetted(true)} style={{ backgroundColor: "#373a47" }}>+</Tab>
                    <Tab onClick={() => onSave(setIsSaving)} className="save-btn"> {isSaving ? "saving..." : "Save" }</Tab>
                </Tabs>
                <MonacoEditor
                    theme="my-theme"
                    height="100vh"
                    className="editor-content"
                    language={metadata.language}
                    value={metadata.value}
                    options={
                        { fontSize: 20, }
                    }
                    defaultLanguage="python"
                    defaultValue="# Drop file from you system here. Or click upload file / + above"
                />
            </div>
        </div>
        </>
    )
}

export default Editor

const Tabs = styled.div`
    display: flex;
    padding: 0.5rem;
    background-color: ${props => props.theme.darkslate};
    .save-btn{
        position: absolute;
        right: 0;
        margin-right: 1rem;
        background-color: green;
    }
    max-width: 90%;
    overflow-x: scroll;
    ::-webkit-scrollbar {display:block; height: 10px;              /* height of horizontal scrollbar ← You're missing this */
            width: 10px;               /* width of vertical scrollbar */
            border: 1px solid #d5d5d5;}
            ::-webkit-scrollbar-thumb{
                background-color: white;
            }

`

const Tab = styled.div`
    cursor: pointer;
    background-color: ${props => props.theme.dark2};
    border-radius: 10px;
    color: white;
    font-size: 20px;
    margin: 5px;
    padding: 1rem;
    padding-top: 5px;
    padding-bottom: 5px;
`

const AddFileContainer = styled.div`
text-align: center;
display: flex;
flex-direction: column;
  background-color: ${props => props.theme.dark1};
  input {
    width: 30%;
    align-self: center;
    height: 60px;
    margin: 1rem;
    background-color: ${props => props.theme.dark1};
    border-color: ${props => props.theme.darkslate};  
    color: white;
  }
  button{
    width: 30%;
    align-self: center;
    height: 60px;
    margin: 1rem;
    background-color: #25b386;
    border: 0px;
    color: white;
  }
  color: white;
`
