import React from 'react'
import styled from "styled-components"
import {LogoCG, LogoutBtn, Remove} from "../../assets"

interface SidebarProps {
    files?: any,
    setFiles?: Function,
    selectedId?: string
    setMetadata?: Function,
    onSave?: Function
}

interface Files {
    id: string,
    filename: string,
    language: string,
    content: string
}

function Sidebar({files, setFiles, setMetadata, selectedId}: SidebarProps) {

    const removeFile = (i) => {
        let allFiles = files
        allFiles.splice(i, 1);
        setFiles(allFiles, false, true)
    }

    const setMetadataObj = (fi) => {
        setMetadata({
            language: fi.language, value: fi.content, filename: fi.filename, id: fi.id
        })
    }

    return (
        <SidebarContainer>
            <div className="f1">
                <LogoCG width={70} height="auto"/>
                <LogoutBtn onClick = {() => {localStorage.removeItem("userId")
                window.location.reload()
            }} className="avtr-img" width={70} height="auto"/>
            </div>
            <div className="f2">
                <h3>Files</h3>
                <div className="explorer">
                    {
                        files.map((fi: Files, i: any) => {
                            console.log(fi)
                            return(
                            <div key={i} className={`fi-item ${fi.id === selectedId && "selected-sidebar"}`} onClick={() => setMetadataObj(fi)}><span>{fi.filename}</span> <Remove onClick={() => removeFile(i)} width={30} height="auto"/></div>
                        )})
                    }
                </div>
            </div>
        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    display: flex;
    .f1{
        flex: 0.2;
        background-color: ${props => props.theme.darkslate};
        height: 100vh;
        padding: 0.5rem;
        .avtr-img{
            position: absolute;
            bottom: 0;
            left: 0;
            margin-bottom: 1rem;
            margin-left: 0.5rem;
        }
    }
    .f2{
        flex: 1;
        padding: 0.5rem;
        height: 100vh;
        .explorer{
            margin-top: 2rem;
   
            .fi-item, .selected-sidebar{
                background-color: ${props => props.theme.darkslate};
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-style: solid;
                border-width: 5px;
                border-color: ${props => props.theme.darkslate};
                span{
                    cursor: pointer;
                }

                &:hover {
                    border-style: solid;
                    border-width: 5px;
                    border-color: ${props => props.theme.darkslate};
                    background-color: ${props => props.theme.dark1};
                }
            }

            .selected-sidebar {
                border-color: #25b386;
                border-width: 5px;
            }

        }
    }
`