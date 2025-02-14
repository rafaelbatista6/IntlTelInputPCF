# International Telephone Input Power Apps Component
This PowerApps Component Framework (PCF) component is designed specifically for model-driven apps and compatible with latest UI version (September 2024). It includes a textbox that allows entering and validating international telephone numbers. It adds a flag dropdown to any input, detects the user's country, displays a relevant placeholder and provides formatting/validation methods.



<img src="https://raw.github.com/OGcanviz/IntlTelInputPCF/master/images/vanilla.png" width="424px" height="246px">
<img src="https://raw.github.com/OGcanviz/IntlTelInputPCF/master/images/IntlTelInput.gif">

<img src="https://raw.github.com/OGcanviz/IntlTelInputPCF/master/images/CaptureScreen.PNG" width="424px" height="246px">




Component can be applied on single line of text field attributes (whatever subformat text, phone or fax)

This PCF control has 3 static input elements that you can configure:
defaultCC: String text code that defines the ISO-2 country code corresponding to the default flag displayed for a new or empty number. Example value is 'fr' or 'gb'. Default value is 'us'.
favoriteCC: String text code that defines the list of ISO-2 country codes to appear as preferred countries at the top of the control. The order of codes is transposed to the order on the list. Example value: 'us,gb,fr,es'. Default value is empty.
showValidationRule: Enum with values 'Yes' or 'No'. When set to 'Yes', the control will validate the phone number format when updated by the user. If the value doesn't match the country format, the input is highlighted in red. Default value is 'No'.

In addition to the phone number output, there is a bounded output :
isPhoneNotValid : optional TwoOptions field bounded that will indicate if current number entered is invalid.


## Libraries
This component uses the following library.
https://www.npmjs.com/package/intl-tel-input

## Installation
Follow this [article](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/component-framework-for-canvas-apps) to setup your enviornment and install the component [Solution package](https://github.com/OGcanviz/IntlTelInputPCF/tree/master/releases).
