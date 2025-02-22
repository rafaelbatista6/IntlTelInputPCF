# International Telephone Input Power Apps Component
This PowerApps Component Framework (PCF) component is a fork of the existing project  <a href="https://github.com/OGcanviz/IntlTelInputPCF">IntlTelInputPCF</a>. 

Its key feature is its design specifically for model-driven apps, making it compatible with the latest UI version (September 2024). It includes a textbox that allows users to enter and validate international telephone numbers, adds a flag dropdown to any input, detects the user's country, displays a relevant placeholder, and provides formatting and validation methods.


<img src="https://github.com/rafaelbatista6/IntlTelInputPCF/blob/master/images/IntlTelInput.gif">
<img src="https://raw.github.com/OGcanviz/IntlTelInputPCF/master/images/vanilla.png" width="424px" height="246px">







Component can be applied on single line of text field attributes (whatever subformat text, phone or fax)

**Important:** This component will store numbers in Dataverse columns in the format **+XXXXXXXXXX** without spaces. If you plan to add this control to an existing column containing data, it is important to realign the data to match this format. The behavior when opening a record where the phone number field does not match this format is unpredictable.


This PCF control has 3 static input elements that you can configure:

***defaultCC***: String text code that defines the ISO-2 country code corresponding to the default flag displayed for a new or empty number. Example value is 'fr' or 'gb'. Default value is 'us'.

***favoriteCC***: String text code that defines the list of ISO-2 country codes to appear as preferred countries at the top of the control. The order of codes is transposed to the order on the list. Example value: 'us,gb,fr,es'. Default value is empty.

***showValidationRule***: Enum with values 'Yes' or 'No'. When set to 'Yes', the control will validate the phone number format when updated by the user. If the value doesn't match the country format, the input is highlighted in red. Default value is 'No'.

<img src="https://github.com/rafaelbatista6/IntlTelInputPCF/blob/master/images/CaptureScreen.PNG">

In addition to the phone number output, there is a bounded output :
isPhoneNotValid : optional TwoOptions field bounded that will indicate if current number entered is invalid.


## Libraries
This component uses the following library.
https://www.npmjs.com/package/intl-tel-input

## Installation
Follow this [article](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/code-components-model-driven-apps) to setup your enviornment and install the component.
