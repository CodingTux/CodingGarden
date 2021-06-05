import React from 'react'
import styled from "styled-components"
import {LogoCG, Avatar, Remove} from "../../assets"

interface SidebarProps {
    files?: any,
    setFiles?: Function
}

interface Files {
    filename: string,
    language: string,
    content: string
}

function Sidebar({files, setFiles}: SidebarProps) {
    return (
        <SidebarContainer>
            <div className="f1">
                <LogoCG width={70} height="auto"/>
                <Avatar className="avtr-img" width={70} height="auto" style={{borderRadius: 50}}/>
            </div>
            <div className="f2">
                <h3>Files</h3>
                <div className="explorer">
                    {
                        files.map((fi: Files, i: any) => (
                            <div className="fi-item"><span>{fi.filename}</span> <Remove  width={30} height="auto"/></div>
                        ))
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
            .fi-item{
                background-color: ${props => props.theme.darkslate};
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
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

        }
    }
`