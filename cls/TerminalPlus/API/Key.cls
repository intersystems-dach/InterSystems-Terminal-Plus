Class TerminalPlus.API.Key Extends %Persistent
{

Property Key As %String(MAXLEN = "");

Storage Default
{
<Data name="KeyDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>Key</Value>
</Value>
<Value name="3">
<Value>IsValid</Value>
</Value>
</Data>
<DataLocation>^TerminalPlus.API.KeyD</DataLocation>
<DefaultData>KeyDefaultData</DefaultData>
<ExtentSize>1</ExtentSize>
<IdLocation>^TerminalPlus.API.KeyD</IdLocation>
<IndexLocation>^TerminalPlus.API.KeyI</IndexLocation>
<Property name="%%CLASSNAME">
<AverageFieldSize>2</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<Property name="%%ID">
<AverageFieldSize>3</AverageFieldSize>
<Selectivity>1</Selectivity>
</Property>
<Property name="Key">
<AverageFieldSize>70</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<SQLMap name="IDKEY">
<BlockCount>-4</BlockCount>
</SQLMap>
<StreamLocation>^TerminalPlus.API.KeyS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
