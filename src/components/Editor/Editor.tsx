import React, { useCallback, useState, useRef, useEffect } from 'react'
import MonacoEditor, {useMonaco} from '@monaco-editor/react'

import styled from "styled-components"
import { useDropzone } from 'react-dropzone'

interface Metadata{
    language: string,
    value: any,
    filename: string
  }

interface EditorProps {
    files: any,
    setFiles: Function,
    metadata: Metadata,
    setMetadata: Function
}

interface Files {
    filename: string,
    language: string,
    content: string
}

function Editor({ files, setFiles, metadata , setMetadata}: EditorProps) {

    const monaco = useMonaco()

    useEffect(() => {
        // do conditional chaining

        // or make sure that it exists by other ways
        if (monaco) {
            monaco.editor.defineTheme('my-theme', {
                base: 'vs-dark',
                inherit: true,
                rules: [{background: "#161b20", token: ""}],
                colors: {
                'editor.background': '#090c10',
                }
            });

            monaco.editor.setTheme("my-theme")
        }
      }, [monaco]);

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        if(acceptedFiles.length > 0){
            if (typeof (setFiles) === "function") {
                setFiles(acceptedFiles)
            }
        }
    }, [])
    const customInputRef = useRef(null)
    const { getRootProps } = useDropzone({ onDrop })

    const switchContent = (fi: Files) => {
        console.log(fi)
        setMetadata({
            language: fi.language,
            value: fi.content,
            filename: fi.filename
        })
    }

    const getInput = () => {
        customInputRef.current.click()
    }

    const createFile = () => {
        if (typeof (setFiles) === "function") {
            setFiles([{
                filename: "test_create.js",
                language: "javascript",
                content: `
                const switchContent = (fi: Files) => {
                    console.log(fi)
                    setMetadata({
                        language: fi.language,
                        value: fi.content,
                        filename: fi.filename
                    })
                }
                `
            }], true)
        }
    }

    return (
        <div {...getRootProps()}>
            <div>
                <Tabs>
                    {
                        files.map((fi: Files, i: any) => (
                            <Tab key={i} onClick={() => switchContent(fi)} className={fi.filename === metadata.filename && "selected"}>{fi.filename}</Tab>
                        ))
                    }
                    <Tab style={{ backgroundColor: "#373a47" }} onClick={getInput}><input onChange={(e) => onDrop(e.target.files)} type="file" ref={customInputRef} style={{ display: "none" }} />Upload File</Tab>
                    <Tab onClick={createFile} style={{ backgroundColor: "#373a47" }}>+</Tab>
                    <Tab className="save-btn">Save</Tab>
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