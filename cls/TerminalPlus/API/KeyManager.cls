Class TerminalPlus.API.KeyManager
{

/// IsKeyValidDescription
/// <li>pKey: pKeyDescription</li>
/// <li><b>returns</b>: </li>
/// <EXAMPLE> Do ##class(TerminalPlus.API.KeyManager).IsKeyValid()</EXAMPLE>
ClassMethod IsKeyValid(pKey As %String) As %Boolean
{
    Set sql = "SELECT * FROM TerminalPlus_API.Key"
    Set tStatement = ##class(%SQL.Statement).%New()
    Set qStatus = tStatement.%Prepare(sql)
    If qStatus '= 1{Write "%Prepare failed:" Do $SYSTEM.Status.DisplayError(qStatus) Quit}
    Set resultSet = tStatement.%Execute()
    If resultSet.%SQLCODE < 0{
       Throw resultSet.%Message
    }
    Set isValid = 0
    While resultSet.%Next(){
        Set key = resultSet.%Get("Key")
        If key = pKey{
            Set isValid = 1
            Break
        }
    }
    Do resultSet.%Close()
    Return isValid
}

/// GenerateNewAPIKeyDescription
/// <li>(optional)pKeyLength: pKeyLengthDescription</li>
/// <li><b>returns</b>: </li>
/// <EXAMPLE> Do ##class(TerminalPlus.API.KeyManager).GenerateNewAPIKey()</EXAMPLE>
ClassMethod GenerateNewAPIKey(pKeyLength As %Integer = 50) As %String
{
    Set key = ##class(TerminalPlus.API.Key).%New()

    Set keyString = $SYSTEM.Encryption.Base64Encode(##class(%PopulateUtils).StringMin(pKeyLength,pKeyLength))
    Set key.Key = $SYSTEM.Encryption.Base64Encode(keyString)

    Do ##class(TerminalPlus.API.KeyManager).RemoveAllKeys()

    Do key.%Save()

    Return keyString
}

ClassMethod RemoveAllKeys() [ Private ]
{
   Set sql = "DELETE FROM TerminalPlus_API.Key"
   Set tStatement = ##class(%SQL.Statement).%New()
   Set qStatus = tStatement.%Prepare(sql)
   If qStatus '= 1{Write "%Prepare failed:" Do $SYSTEM.Status.DisplayError(qStatus) Quit}
   Set resultSet = tStatement.%Execute()
}

}
