/// An API to connect to the InterSystems Terminal Plus.<br/>
/// Business logic class defined by OpenAPI in TerminalPlus.spec<br/>
/// Updated Jul 20, 2023 12:38:50
Class TerminalPlus.impl Extends %REST.Impl [ ProcedureBlock ]
{

Parameter VERSION = "v1.0";

/// If ExposeServerExceptions is true, then details of internal errors will be exposed.
Parameter ExposeServerExceptions = 0;

/// This request returns a reply message in response to a /ping request.
ClassMethod ping() As %Stream.Object
{
    Do ..%SetStatusCode(200)
    Quit {"status": true}.%ToJSON()
}

/// Execute the given code<br/>
/// The method arguments hold values for:<br/>
///     apikey, The API Key<br/>
ClassMethod execute(apikey As %String) As %Stream.Object
{
    If '##class(TerminalPlus.API.KeyManager).IsKeyValid($SYSTEM.Encryption.Base64Encode(apikey)){
        Do ..%SetStatusCode(401)
        Quit "Unauthorized"
    }
    Set body = ##class(%DynamicObject).%FromJSON(%request.Content)

    Set r = ##class(TerminalPlus.Utils.Executer).Execute(body.%Get("code"), body.%Get("namespace"))

    Do r.%JSONExportToString(.json)
    Do ..%SetStatusCode(200)
    Return json
}

/// Get all namespaces from IRIS
ClassMethod getAllNamespaces() As %Stream.Object
{
    Set tSC = ##class(%SYS.Namespace).ListAll(.result)
    If $$$ISERR(tSC){
        Do ..%SetStatusCode(500)
        Quit "Could not get namespaces"
    }
    Set arr = ##class(%DynamicArray).%New()
    Set key = $O(result(""))
    While (key '= "") {
        Do arr.%Push(key)
        Set key = $O(result(key))
    }
    Set obj = ##class(%DynamicObject).%New()
    Do obj.%Set("Namespaces",arr)
    Do ..%SetStatusCode(200)
    Quit obj.%ToJSON()
}

/// Get the current version of the API
ClassMethod getVersion() As %Stream.Object
{
    Set obj = ##class(%DynamicObject).%New()
    Do obj.%Set("version", ..#VERSION)
    Do ..%SetStatusCode(200)
    Quit obj.%ToJSON()
}

}
