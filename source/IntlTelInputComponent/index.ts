import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as IntlTelInput from 'intl-tel-input';

export class IntlTelInputComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	// PCF framework delegate which will be assigned to this object which would be called whenever any update happens. 
	private _notifyOutputChanged: () => void;

	private _phoneInput: HTMLInputElement;
	private _intlTelInputPlugin: IntlTelInput.Plugin;

	private _defaultCC: string;
	private _favoriteCC: string[]
	private _numbershowValidationRuleValue = "";
	private _isPhoneNotValid : boolean;
	private _context : ComponentFramework.Context<IInputs>;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._notifyOutputChanged = notifyOutputChanged;
		this._defaultCC = "";
		this._favoriteCC = [];
		this._numbershowValidationRuleValue = "";
		this._isPhoneNotValid = false;

		this._phoneInput = document.createElement('input');
		this._phoneInput.setAttribute('type', 'text'); 
		this._phoneInput.className="inputText";
		this._phoneInput.readOnly=context.mode.isControlDisabled;
		this._phoneInput.setAttribute(context.mode.isControlDisabled?"disabled":"enabled","true");
		this._phoneInput.addEventListener('change', this.onPhoneChange.bind(this));
		container.appendChild(this._phoneInput);
		
		if(context.parameters.defaultCC?.raw && context.parameters.defaultCC.raw !== null && context.parameters.defaultCC.raw !== "" && context.parameters.defaultCC.raw.indexOf(',') === -1){
			this._defaultCC = context.parameters.defaultCC.raw.trim().toLowerCase();
		}

		if(context.parameters.favoriteCC?.raw && context.parameters.favoriteCC.raw !== null && context.parameters.favoriteCC.raw !== ""){
			this._favoriteCC = context.parameters.favoriteCC.raw.split(',');
			this._favoriteCC = this._favoriteCC.map(el => el.trim().toLowerCase());
		}

		this._numbershowValidationRuleValue = context.parameters.showValidationRule?.raw;

		this._intlTelInputPlugin = IntlTelInput(this._phoneInput, {
			preferredCountries: this._favoriteCC,
			initialCountry: this._defaultCC,
			
		});
		window.intlTelInputGlobals.loadUtils('https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.1.0/js/utils.js');
		
	}

	private onPhoneChange(event: Event): void {
		if(this._intlTelInputPlugin.getNumber() !== "")
		{
			if(!this._intlTelInputPlugin.isValidNumber())
				{
					this._isPhoneNotValid = true;
				}
				else
				{
					this._isPhoneNotValid = false;
				}
		}
		else
			this._isPhoneNotValid = false;

		if(this._numbershowValidationRuleValue == "Yes")
		{
			if(!this._intlTelInputPlugin.isValidNumber())
			{
				this._phoneInput.style.color = "red";
			}
			else
			{
				this._phoneInput.style.color = "black";
			}
		}
		this._notifyOutputChanged();
	}

	private onCountryChange(event: Event): void {
		this._notifyOutputChanged();
	}


	
	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this._intlTelInputPlugin.setNumber(context.parameters.Phone.raw!);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			Phone: this._intlTelInputPlugin.getNumber(),
			isPhoneNotValid : this._isPhoneNotValid
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}