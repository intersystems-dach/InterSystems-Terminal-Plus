Class TerminalPlus.Utils.Installer
{

/// Setup the webapplication for the InterSystems Terminal Plus API.
/// <EXAMPLE> Do ##class(TerminalPlus.Utils.Installer).SetUp()</EXAMPLE>
ClassMethod SetUp()
{
    #dim tSC as %Status = $$$OK

    Write #!,   "   ************************************************"
    Write !,    "   *** InterSystems Terminal Plus API Installer ***"
    Write !,    "   ************************************************"
    Write !

    Set package = "TerminalPlus"
    Set woopClasses=$LB("API.Key","API.KeyManager","Utils.Executer","Utils.PromptMessage","impl","spec")

    Set installClasses = ""

    Write !,"   * Looking for all necessary classes"
    For i = 1 : 1 : $LL(woopClasses) {
        Write !,"   * Looking for class """_package_"."_$LG(woopClasses, i)_""": "
        Set exist=##class(%Dictionary.CompiledClass).%ExistsId(package_"."_$LG(woopClasses, i))
        If exist{
            Write "found!"
        }Else{
            Write "not found!!!"
            If installClasses = ""{
                Set installClasses = installClasses_package_"."_$LG(woopClasses, i)
            }
            Else{
                Set installClasses = installClasses_", "_package_"."_$LG(woopClasses, i)
            }
        }
    }
    If installClasses = ""{
        Write !,"   * All classes found!"
        Write !
    }
    Else{
        Write !,"   * Please install this classes and then try again: "_installClasses
        Write !
        Quit 0
    }

	Set beforeNS = $NAMESPACE
    ZNspace "%SYS"

    Set props("Description") = "An API to connect to the InterSystems Terminal Plus."
    Set props("AutheEnabled")=96
    Set props("AutoCompile")=1
    Set props("CSPZENEnabled")=1
    Set props("CSRFToken")=0
    Set props("ChangePasswordPage")=""
    Set props("CookiePath")="/TerminalPlus/"
    Set props("DeepSeeEnabled")=0
    Set props("DispatchClass")="TerminalPlus.disp"
    Set props("Enabled")=1
    Set props("ErrorPage")=""
    Set props("EventClass")=""
    Set props("GroupById")=""
    Set props("HyperEvent")=0
    Set props("InbndWebServicesEnabled")=1
    Set props("IsNameSpaceDefault")=0
    Set props("LockCSPName")=1
    Set props("LoginPage")=""
    Set props("MatchRoles")=""
    Set props("Name")="/TerminalPlus"
    Set props("NameSpace")=beforeNS
    Set props("Package")=""
    Set props("Path")=""
    Set props("PermittedClasses")=""
    Set props("Recurse")=1
    Set props("RedirectEmptyPath")=0
    Set props("Resource")=""
    Set props("ServeFiles")=1
    Set props("ServeFilesTimeout")=3600
    Set props("SessionScope")=2
    Set props("SuperClass")=""
    Set props("Timeout")=900
    Set props("TwoFactorEnabled")=0
    Set props("Type")=2
    Set props("UseCookies")=2
    Set props("UserCookieScope")=2
    Set props("iKnowEnabled")=0

    Set tSC = ##class(Security.Applications).Create("/TerminalPlus", .props)
    If tSC = 1{
        Write !,"   * Webapp TerminalPlus created!"
    }
    Else{
        Write !,"   * Webapp TerminalPlus could not be created!"
        Write !,"   * Installation failed!!!"
        Write !
        ZNspace beforeNS
        Quit 0
    }
    ZNspace beforeNS
    Write !
    Write !,"   * API Key:"
    Write !
    Write !,"     "_##class(TerminalPlus.API.KeyManager).GenerateNewAPIKey()
    Write !
    Write !,"   * Copy the API Key and add it to your front end application!"
    

    Write !
    Write !, "  * Successfully installed the InterSystems TerminalPlus API!"
    Write !, "  * You can now connect your front end app with this InterSystems IRIS instance!"
    Write !, "  * Have a nice day :)"
    Write !
}

}
