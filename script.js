const objFormula = JSON.parse(formula);

function ValidateLengthConverterForm()
{
    _cmnRemoveAllErrorMessage();
    
    var fromLength = document.getElementById("fromLength").value;
    if(fromLength == "" || isNaN(fromLength)  || (!isNaN(fromLength) && Number(fromLength) <= 0))
    {
        _cmnShowErrorMessageBottomOfTheInputFiled("fromLength", "Enter valid Length.");
        return false;
    }
    
    return true;
}

function RestLengthConverter()
{
    if(confirm("Are you sure want to reset the converter?")){
        document.getElementById("fromLength").value = "";
        document.getElementById("fromUnit").value = "Centimeter";
        document.getElementById("toUnit").value = "Millimeter";
        document.getElementById("outputLength").value = "";

        _cmnRemoveAllErrorMessage();

        _cmnHideElement("OutputResult");
        _cmnShowElement("OutputInfo", "flex");
    }
}

function CalculateLength()
{
    if(ValidateLengthConverterForm())
    {
        var fromUnit = document.getElementById("fromUnit").value;
        var toUnit = document.getElementById("toUnit").value;
        var fromLength = document.getElementById("fromLength").value;
        var outputlength = document.getElementById("outputLength");

        ShowFormula(fromUnit, toUnit);

        var result = ConvertLength(fromLength, fromUnit,  toUnit);
        outputlength.value = Number(result).toFixed(2);      
        document.getElementById("lengthResult").innerHTML = fromLength + ' ' + fromUnit + ' = ' + result.toFixed(2) + ' ' + toUnit; 

        //result div show
        _cmnHideElement("OutputInfo");
        _cmnShowElement("OutputResult", "flex");
    }
}

function ConvertLength(fromLength, fromUnit,  toUnit)
{
    fromLength = Number(fromLength);
    var result = 0;
    var makeThisMillimeter = 0;
    var inMillimeter = 0;

    // first make the given unit to millimeter
    switch (fromUnit)
    {
        case "Millimeter":
            makeThisMillimeter = 1;
            break;
        case "Centimeter":
            makeThisMillimeter = 10;
            break;
        case "Decimeter":
            makeThisMillimeter = 100;
            break;
        case "Meter":
            makeThisMillimeter = 1000;
            break;
        case "Kilometer":
            makeThisMillimeter = 1000000;
            break;
        case "Foot":
            makeThisMillimeter = 304.8;
            break;
        case "Inch":
            makeThisMillimeter = 25.4;
            break;
        case "Mile":
            makeThisMillimeter = 1609344;
            break;
        case "Yard":
            makeThisMillimeter = 914.4;
            break;
    }
    inMillimeter = fromLength * makeThisMillimeter;

    //convert the millimiter value to the targeted unit
    switch (toUnit)
    {
        case "Millimeter":
            result = inMillimeter;
            break;
        case "Centimeter":
            result = inMillimeter / 10;
            break;
        case "Decimeter":
            result = inMillimeter / 100;
            break;
        case "Meter":
            result = inMillimeter / 1000;
            break;
        case "Kilometer":
            result = inMillimeter / 1000000;
            break;
        case "Foot":
            result = inMillimeter / 304.8;
            break;
        case "Inch":
            result = inMillimeter / 25.4;
            break;
        case "Mile":
            result = inMillimeter / 1609344;
            break;
        case "Yard":
            result = inMillimeter / 914.4;
            break;
    }
    return result;
}

function ShowFormula(fromUnit,toUnit)
{
    document.getElementById("lengthFormula").innerHTML = "";

    for(var i = 0; i <objFormula.conversions.length; i++)
    {            
        if(
            objFormula.conversions[i].from.toLowerCase() == fromUnit.toLowerCase() 
            && objFormula.conversions[i].to.toLowerCase() == toUnit.toLowerCase()
            )
        {
            document.getElementById("lengthFormula").innerHTML = objFormula.conversions[i].formula;
        }
    }
}




// script second
function _cmnRemoveAllErrorMessage()
{
    var allErrorBorder = document.getElementsByClassName('tool-error-border');
	var allErrorMessage = document.getElementsByClassName('tool-error-message');
	var i;
    // remove border
    for(i = (allErrorBorder.length) - 1; i>=0; i--)
    {
        allErrorBorder[i].classList.remove("tool-error-border");
    }
    // remove error message
    for(i = (allErrorMessage.length) - 1; i>=0; i--)
    {
        allErrorMessage[i].remove();
    }	  
}

function _cmnShowErrorMessageBottomOfTheInputFiled(fieldID,errorMessage)
{
    var inputField = document.getElementById(fieldID);   
    inputField.classList.add("tool-error-border"); // add border
    inputField.focus(); // focus error feild
    
    var errorMessageElement = document.createElement("p"); // create a p tag for error message
    errorMessageElement.innerHTML = errorMessage; // set the error message in the p tag
    errorMessageElement.classList.add("tool-error-message"); // add the error message stye clsss
    inputField.parentNode.insertBefore(errorMessageElement, inputField.nextSibling); // set the error message uder the error feild
}

function _cmnHideElement(elementId)
{
    var selectedDisplayValue = document.getElementById(elementId).style.display;
    if(selectedDisplayValue != 'none')
    {
        document.getElementById(elementId).style.display = "none";
    }
}

function _cmnShowElement(elementId, displayName)
{
    var selectedDisplayValue = document.getElementById(elementId).style.display;
    if(selectedDisplayValue != displayName)
    {
        document.getElementById(elementId).style.display = displayName;
    }
}