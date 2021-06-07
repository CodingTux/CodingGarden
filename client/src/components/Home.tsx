import React from 'react'
import Browser from './Browser'
import Terminal from './Terminal'
import Sidebar from './Sidebar'
import Editor from './Editor'
import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'
import styled from "styled-components"
import 'react-reflex/styles.css'
import {extMap as map} from "../utils/extension_map"
import Popup from 'reactjs-popup';
import {RegisterUser, FetchFiles, UploadFiles} from "../utils/api"


interface HomeState {
  files: Array<any>,
  metadata: Metadata,
  userID: any,
  isSetted: boolean,
  loading: boolean
}

interface Metadata{
  id: any,
  language: string,
  value: any,
  filename: string
}

type FetchFileResponse = {
  Files?: Array<any>
}

class Home
  extends React.Component<{}, HomeState> {
  constructor(props?: any) {
    super(props)
    this.state = {
      files: [],
      metadata: {
        id: "",
        language: "",
        value: "",
        filename: "package.json"
      },
      userID: "",
      isSetted: false,
      loading: false
    }

    this.setFiles = this.setFiles.bind(this)
    this.setMetadata = this.setMetadata.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount(){
    this.fetchFiles()
  }

  async fetchFiles() {
    
    if(localStorage.getItem("userId")){
      try{
        const userFiles: FetchFileResponse = await FetchFiles(localStorage.getItem("userId") as String) as any as FetchFileResponse
        console.log(userFiles)
  
        this.setState({
          userID: localStorage.getItem("userId"),
          isSetted: true,
          files: userFiles.Files as any,
          loading: false
        })
      }catch(err){
        console.log(err)
        this.setState({loading: false})
      }
    }
  }

  setMetadata({language, value, filename, id}: Metadata){
    this.setState({
      metadata: {
        id,
        language,
        value,
        filename
      }
    })
  }

  setFiles(file: Array<any>, isNew: Boolean = false, forDelete: Boolean = false) {
    try{

    if(forDelete){
      this.setState({
        files: file
      }, () => this.onSave(() => console.log("state updated"), false, false))
      this.setMetadata({
        id: "",
        language: "javascript",
        value: "// Drag to open file",
        filename: ""
      })
      return
    }
    if(isNew){
      const id = Math.random().toString().split(".").pop()
      this.setState({
        files: [...this.state.files, {
          id: id,
          filename: file[0].filename,
          language:  map[file[0].filename.split(".").pop()][0],
          content: file[0].content
        }]
      },() => this.onSave(() => console.log("state updated"), false, false))
      this.setMetadata({
        id: id,
        language: map[file[0].filename.split(".").pop()][0],
        value: file[0].content,
        filename: file[0].filename
      })


      return
    }
    console.log(file)
      const reader = new FileReader()
      reader.onload = event =>  {
        console.log(event)
        console.log( map[file[file.length - 1].name.split(".").pop()][0])
        const id = Math.random().toString().split(".").pop()
        this.setState({
          files: [...this.state.files, {
            id,
            filename: file[file.length - 1].name,
            language: map[file[file.length - 1].name.split(".").pop()][0],
            content: event.target.result
          }]
        }, () => this.onSave(() => console.log("state updated"), false, false))
        this.setMetadata({
          id,
          language: map[file[file.length - 1].name.split(".").pop()][0],
          value: event.target.result,
          filename: file[file.length - 1].name
        })
      }
      reader.onerror = error => console.log(error)
      reader.readAsText(file[file.length - 1])
      // console.log(content)
    }catch(err){
      console.log(err)
      alert("Error occured. This may be due to wrong file.")
    }
  }

  async registerOrLogin() {
    this.setState({loading: true})
    await RegisterUser(this.state.userID)
    localStorage.setItem("userId", this.state.userID)
    this.fetchFiles()
  }

  async onSave(setSaving, fromDelete: false, showAlert=true) {
      setSaving(true)
      try{
          const isSaved = await UploadFiles(this.state.userID, this.state.files)
          console.log(isSaved)
          if(showAlert){
            if(fromDelete){
              alert("File deleted successfully...")
            }else{
              alert("Files saved successfully...")
            }
          }
          setSaving(false)
      }catch(err){
        console.log(err)
        if(showAlert){
          if(fromDelete){
            alert("Error while deleting...")
          }else{
            alert("Error while saving...")
          }
        }
        setSaving(false)
      }
  }

  render() {

    return (
      <HomeContainer>
        <Popup open={!this.state.isSetted} modal closeOnDocumentClick = {false} closeOnEscape={false}>
            <UserInfoContainer>
                <h2>Please enter userid</h2>
                <input placeholder="Enter your user id" onChange={(e) => this.setState({
                  userID: e.target.value
                })}/>
                <button disabled={this.state.userID.trim() === ""} onClick={() => {
                  this.setState({isSetted: true})
                  this.registerOrLogin()
                }}> {this.state.loading ? "Fetching..." : "Enter"}</button>
            </UserInfoContainer>
        </Popup>
        <ReflexContainer orientation="vertical">
          <ReflexElement className="left-pane" flex={0.2}>
            <div className="pane-content">
              <Sidebar filesLoading={this.state.loading} files={this.state.files} setFiles={this.setFiles} setMetadata={this.setMetadata} selectedId={this.state.metadata.id}/>
            </div>
          </ReflexElement>
          <ReflexSplitter className="splitter"/>

          <ReflexElement>

            <ReflexContainer orientation="horizontal">

              <ReflexElement
                propagateDimensionsRate={200}
                propagateDimensions={true}
                flex={0.8}>

                <div className="pane-content">
                  <Editor files={this.state.files} setFiles={this.setFiles} metadata={this.state.metadata} setMetadata={this.setMetadata} onSave={this.onSave}/>
                </div>

              </ReflexElement>

              <ReflexSplitter/>

              <ReflexElement className="bottom-pane">
                <div className="pane-content">
                  <Terminal userID={this.state.userID} isSetted={this.state.isSetted}/>
                </div>
              </ReflexElement>

            </ReflexContainer>

          </ReflexElement>

          <ReflexSplitter className="splitter"/>

          <ReflexElement className="right-pane" flex={0.2}>
            <div className="pane-content">
              <Browser />
            </div>
          </ReflexElement>

        </ReflexContainer>
      </HomeContainer>
    )
  }
}


export default Home

const UserInfoContainer = styled.div`
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

const HomeContainer = styled.div`
  background-color: ${props => props.theme.dark1};
  color: white;
  height: 100vh;
  margin: 0;
  .splitter{
    background-color: ${props => props.theme.dark1};
    border-color: ${props => props.theme.dark1};
  }
  .middle-section{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pane-content{
    height: 100%;
  }
  .terminal{
    height: 100vh;
  }
  .editor-content{
    font-size: 25px;
    background-color: ${props => props.theme.darkslate};
  }
  .selected{
        /* background-color: ${props => props.theme.dark3}; */
        background-color: ${props => props.theme.dark3};
    }


`
