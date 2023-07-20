Class TerminalPlus.spec Extends %REST.Spec [ ProcedureBlock ]
{

Parameter HandleCorsRequest = 1;

XData OpenAPI [ MimeType = application/json ]
{
{
  "swagger":"2.0",
  "info":{
    "title":"InterSystems Terminal Plus API",
    "description":"An API to connect to the InterSystems Terminal Plus.",
    "version":"1.0"
  },
  "paths":{
    "/ping":{
      "get":{
        "summary":"Respond to ping",
        "description":"This request returns a reply message in response to a /ping request.",
        "operationId":"ping",
        "responses":{
          "200":{
            "description":"Returns 'Reply from TerminalPlus'.",
            "schema":{
              "type":"string"
            }
          }
        }
      }
    },
    "/execute":{
      "post":{
        "summary":"Execute code",
        "description":"Execute the given code",
        "operationId":"execute",
        "parameters":[
          {
            "name":"apikey",
            "in":"query",
            "description":"The API Key",
            "type":"string"
          }
        ],
        "responses":{
          "200":{
            "description":"The prompted code",
            "schema":{
              "type":"object",
              "properties":{
                "reply":{
                  "type":"string"
                }
              }
            }
          },
          "401":{
            "description":"Unauthorized"
          }
        }
      }
    },
    "/namespaces/get/all":{
      "get":{
        "summary":"Get all namespaces",
        "description":"Get all namespaces from IRIS",
        "operationId":"getAllNamespaces",
        "responses":{
          "200":{
            "description":"The namespaces",
            "schema":{
              "type":"object"
            }
          }
        }
      }
    },
    "/version/get":{
      "get":{
        "summary":"Get the current version of the API",
        "description":"Get the current version of the API",
        "operationId":"getVersion",
        "responses":{
          "200":{
            "description":"The version",
            "schema":{
              "type":"object"
            }
          }
        }
      }
    }
  }
}
}

}
