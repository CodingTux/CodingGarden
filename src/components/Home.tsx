import React from 'react'
import Navbar from './Navbar'
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
import {extMap as map} from "../utils/extension_map.js"


interface HomeProps  {

}

interface HomeState {
  files: Array<any>,
  metadata: Metadata
}

interface Metadata{
  language: string,
  value: any,
  filename: string
}

class Home
  extends React.Component<HomeProps, HomeState> {
  resizeProps: { onStopResize: (e: any) => void; onResize: (e: any) => void }

  constructor(props?: any) {

    super(props)

    this.resizeProps = {
      onStopResize: this.onStopResize.bind(this),
      onResize: this.onResize.bind(this)
    }

    this.state = {
      files: [],
      metadata: {
        language: "",
        value: "",
        filename: "package.json"
      }
    }

    this.setFiles = this.setFiles.bind(this)
    this.setMetadata = this.setMetadata.bind(this)
  }

  setMetadata({language, value, filename}: Metadata){
    this.setState({
      metadata: {
        language,
        value,
        filename
      }
    })
  }

  setFiles(file: Array<any>, isNew: Boolean = false, forDelete: Boolean = false) {
    if(forDelete){
      this.setState({
        files: file
      })
      this.setMetadata({
        language: "javascript",
        value: "// Drag to open file",
        filename: ""
      })
      return
    }
    if(isNew){
      this.setState({
        files: [...this.state.files, {
          filename: file[0].filename,
          language: map[file[0].filename.split(".").pop()][0],
          content: file[0].content
        }]
      })
      this.setMetadata({
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
      this.setState({
        files: [...this.state.files, {
          filename: file[file.length - 1].name,
          language: map[file[file.length - 1].name.split(".").pop()][0],
          content: event.target.result
        }]
      })
      this.setMetadata({
        language: map[file[file.length - 1].name.split(".").pop()][0],
        value: event.target.result,
        filename: file[file.length - 1].name
      })
    }
    reader.onerror = error => console.log(error)
    reader.readAsText(file[file.length - 1])
    // console.log(content)


  }

  onResize(e: any) {

    if (e.domElement) {

      e.domElement.classList.add('resizing')
    }
  }

  onStopResize(e: any) {

    if (e.domElement) {

      e.domElement.classList.remove('resizing')
    }
  }

  render() {

    return (
      <HomeContainer>
        <ReflexContainer orientation="vertical">
          <ReflexElement className="left-pane" flex={0.2}>
            <div className="pane-content">
              <Sidebar files={this.state.files} setFiles={this.setFiles} setMetadata={this.setMetadata} selectedFile={this.state.metadata.filename}/>
            </div>
          </ReflexElement>
          <ReflexSplitter />

          <ReflexElement>

            <ReflexContainer orientation="horizontal">

              <ReflexElement
                propagateDimensionsRate={200}
                propagateDimensions={true}
                flex={0.8}>

                <div className="pane-content">
                  <Editor files={this.state.files} setFiles={this.setFiles} metadata={this.state.metadata} setMetadata={this.setMetadata}/>
                </div>

              </ReflexElement>

              <ReflexSplitter />

              <ReflexElement className="bottom-pane">
                <div className="pane-content">
                  <Terminal />
                </div>
              </ReflexElement>

            </ReflexContainer>

          </ReflexElement>

          <ReflexSplitter />

          <ReflexElement className="right-pane" flex={0.03}>
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

const HomeContainer = styled.div`
  background-color: ${props => props.theme.dark1};
  color: white;
  height: 100vh;
  margin: 0;
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