Class TerminalPlus.Utils.PromptMessage Extends (%JSON.Adaptor, %Persistent)
{

Property Prompt As %String(MAXLEN = "");

/// Description
Property IsError As %Boolean [ InitialExpression = 0 ];

Property ErrorText As %String(MAXLEN = "");

/// Description
ClassMethod CreateNewPrompt(pPrompt As %String) As TerminalPlus.Utils.PromptMessage
{
    Set msg = ##class(TerminalPlus.Utils.PromptMessage).%New()
    Set msg.Prompt = pPrompt
    Set msg.ErrorText = " "
    Return msg
}

ClassMethod CreateNewErrorPrompt(
	errName As %String,
	errCode As %String,
	errLocation As %String,
	errData As %String) As TerminalPlus.Utils.PromptMessage
{
    Set msg = ##class(TerminalPlus.Utils.PromptMessage).%New()
    Set msg.IsError = 1
    Set msg.ErrorText = "Error name: "_errName_$C(13)_"Error code: "_errCode_$C(13)_"Error location: "_errLocation_$C(13)
    If errData '= ""{
        Set msg.ErrorText = msg.ErrorText_"Additional data: "_errData_$C(13)  
    }
    Set msg.Prompt = " "
    Return msg
}

}
