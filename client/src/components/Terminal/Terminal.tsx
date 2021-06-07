import React, { useState } from 'react'
import Xterm from './Xterm'

interface TerminalProps{
  userID: string,
  isSetted: boolean
}

function Terminal({userID, isSetted}: TerminalProps) {
  const xtermRef = React.useRef(null)
  const [input, setInput] = useState("")
  React.useEffect(() => {
    if(!isSetted){
      return
    }
    if (xtermRef) {
      // @ts-ignore: Object is possibly 'null'.
      xtermRef.current.terminal.writeln(
        "Welcome " + userID
      );
      // @ts-ignore: Object is possibly 'null'.
      xtermRef.current.terminal.writeln(
        "Terminal Connected"
      );
      // @ts-ignore: Object is possibly 'null'.
      xtermRef.current.terminal.writeln(
        "Welcome to coding garden terminal (Not connected with backend.)"
      );
      // @ts-ignore: Object is possibly 'null'.
      xtermRef.current.terminal.writeln(
        "commands available: echo"
      );
      // @ts-ignore: Object is possibly 'null'.
      xtermRef.current.terminal.write(`(base) ${userID}@codinggarden:~$`);
    }
    return () => {
      console.log("Terminal component removed")
    }
  }, [isSetted, userID])
  return (
    <div>
      <Xterm
        ref={xtermRef}
        className="terminal"
        onData={(data: any) => {
          const code = data.charCodeAt(0);
          // If the user hits empty and there is something typed echo it.
          if (code === 13 && input.length > 0) {
            if(input === "\n"){
            // @ts-ignore: Object is possibly 'null'.
              xtermRef.current.terminal.write("\r\necho> ");
              setInput("")
              return
            }
            if (input === "clear") {
              // @ts-ignore: Object is possibly 'null'.
              xtermRef.current.terminal.clear()
              // @ts-ignore: Object is possibly 'null'.
              xtermRef.current.terminal.write("");
              // @ts-ignore: Object is possibly 'null'.
              xtermRef.current.terminal.write("You cleared this terminal...\n");
              // @ts-ignore: Object is possibly 'null'.
              xtermRef.current.terminal.write("\r\nPress enter to restart\n");
              setInput("\n")
              return
            }

            if (input === "echo") {
            // @ts-ignore: Object is possibly 'null'.
              xtermRef.current.terminal.write("\r\necho> ");
              setInput("")
              return
            }
            // @ts-ignore: Object is possibly 'null'.

            xtermRef.current.terminal.write(
              "\r\nYou typed: '" + input + "'\r\n"
            );
            // @ts-ignore: Object is possibly 'null'.
            xtermRef.current.terminal.write("echo> ");
            setInput("")


          } else if (code < 32 || code === 127) { // Disable control Keys such as arrow keys
            return;
          } else { // Add general key press characters to the terminal
            // @ts-ignore: Object is possibly 'null'.

            xtermRef.current.terminal.write(data);
            setInput(input + data)
          }
        }}
      />
    </div>
  )
}

export default Terminal
