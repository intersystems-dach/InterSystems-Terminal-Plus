Class TerminalPlus.Utils.Executer
{

ClassMethod Execute(
	pCode As %String,
	pNamespace As %String) As TerminalPlus.Utils.PromptMessage
{
    Set sc = $$$OK
    Set oldNamespace = $NAMESPACE
    Try{
        Set cmd = ##class(TerminalPlus.Utils.Executer).PreprocessCode(pCode, pNamespace, oldNamespace)
        Set rtn = $XECUTE(cmd)
    }
    Catch err{
        ZNspace oldNamespace
        Return ##class(TerminalPlus.Utils.PromptMessage).CreateNewErrorPrompt(err.Name, err.Code, err.Location, err.Data)
    }

    Return ##class(TerminalPlus.Utils.PromptMessage).CreateNewPrompt(rtn)
}

ClassMethod PreprocessCode(
	pCode As %String,
	pNewNamespace As %String,
	pOldnamespace As %String) As %String [ Language = python ]
{
    codeResult = "ZNspace \""+pNewNamespace+"\" Set terminalPlusResultString = \"\" "
    codeArr = pCode.split("\n")
    for i in range(len(codeArr)):
        line = codeArr[i]

        # transform all possible cases for write
        
        if line.strip().startswith("w "):
            line = line.replace("w ", "Write ")
        if line.strip().startswith("W "):
            line = line.replace("W ", "Write ")
        if line.strip().startswith("write "):
            line = line.replace("write ", "Write ")
        if line.strip().startswith("WRITE "):
            line = line.replace("WRITE ", "Write ")

        if line.strip().startswith("Write "):
            line = line.replace("Write ", "Set terminalPlusResultString = terminalPlusResultString_")

            # add line break
            openBrakets = False
            newLine = ""
            for j in range(len(line)):
                c = line[j]
                if c == "\"":
                    openBrakets = not openBrakets
                if c == "!" and not openBrakets:
                    c = "$C(13)"
                if c == "," and not openBrakets:
                    c = "_"
                newLine += c
            line = newLine

        codeResult += line + " "
    
    codeResult += " ZNspace \""+pOldnamespace+"\" Return terminalPlusResultString"
    return codeResult
}

ClassMethod Test()
{
    Set cmd = "write ""Hello"""
    Set cmd = ##class(TerminalPlus.Utils.Executer).PreprocessCode(cmd)
    Write cmd
    Write !
    Do ##class(TerminalPlus.Utils.Executer).Execute(cmd)
}

ClassMethod Test2()
{
}

}
