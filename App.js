import React from "react";
import {PDFDocument, StandardFonts} from "pdf-lib";


function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], {type: "application/pdf"});
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
};

async function editPDF(obj) {

    const addressArray = obj.address.split(',');

    const template = await PDFDocument.load(base64);

    const timesRomanFont = await template.embedFont(StandardFonts.TimesRomanBold)

    const timesRomanFontSoft = await template.embedFont(StandardFonts.TimesRoman)

    const form = template.getForm();

    const addressField = form.getTextField('Address');
    const addressSoftField = form.getTextField('Address Soft');
    const addressBasicField = form.getTextField('Address Basic');
    const blockField = form.getTextField('Block');
    const borderStreetsField = form.getTextField('Border Streets');
    const buildingField = form.getTextField('Building');
    const buildingIdentificationNumberField = form.getTextField('Building Identification Number');
    const inspectionDateField = form.getTextField('Inspection Date');
    const inspectionDateBoldField = form.getTextField('Inspection Date Bold');
    const inspectorField = form.getTextField('Inspector');
    const inspectorSoftField = form.getTextField('Inspector Soft');
    const locationNumberField = form.getTextField('Location Number');
    const lotField = form.getTextField('Lot');
    const preparedbyField = form.getTextField('Prepared by');
    const preparedbyTitleField = form.getTextField('Prepared by Title');
    const reportDateField = form.getTextField('Report Date');
    const reportDateBoldField = form.getTextField('Report Date Bold');
    const stairHallField = form.getTextField('Stair Hall');
    const stairHallSoftField = form.getTextField('Stair Hall Soft');
    const totalShotsField = form.getTextField('Total Shots');
    const unitNumberField = form.getTextField('Unit Number');
    const unitNumberSoftField = form.getTextField('Unit Number Soft');
    const workOrderNumberField = form.getTextField('Work Order Number');
    const workOrderNumberCenterField = form.getTextField('Work Order Number Center');
    const XRFInstrumentSerialNumberField = form.getTextField('XRF Instrument Serial Number');

    addressField.setText(addressArray[0] + ", New York, NY 10002");
    addressSoftField.setText(addressArray[0] + ", New York, NY 10002");
    addressBasicField.setText(addressArray[0]);
        blockField.setText(addressArray[4]);
        borderStreetsField.setText(addressArray[1] + ".");
        buildingField.setText(addressArray[2]);
        buildingIdentificationNumberField.setText(addressArray[3]);
    inspectionDateField.setText(obj.inspectionDate);
    inspectionDateBoldField.setText(obj.inspectionDate);
    inspectorField.setText(obj.inspector);
    inspectorSoftField.setText(obj.inspector);
    locationNumberField.setText(obj.locationNumber);
        lotField.setText(addressArray[6]);
    preparedbyField.setText(obj.preparedby);
    preparedbyTitleField.setText(obj.preparedbyTitle);
    reportDateField.setText(obj.reportDate);
    reportDateBoldField.setText(obj.reportDate);
        stairHallField.setText(addressArray[5]);
        stairHallSoftField.setText(addressArray[5]);
    totalShotsField.setText(obj.totalShots);
    unitNumberField.setText(obj.unitNumber);
    unitNumberSoftField.setText(obj.unitNumber);
    workOrderNumberField.setText(obj.workOrderNumber);
    workOrderNumberCenterField.setText(obj.workOrderNumber);
    XRFInstrumentSerialNumberField.setText(obj.xrfInstrumentSerialNumber);

    addressField.setAlignment(1);
    buildingField.setAlignment(1);
    inspectorField.setAlignment(1);
    inspectionDateBoldField.setAlignment(1);
    inspectionDateField.setAlignment(0);
    reportDateBoldField.setAlignment(1);
    stairHallField.setAlignment(1);
    unitNumberField.setAlignment(1);
    workOrderNumberField.setAlignment(0);
    workOrderNumberCenterField.setAlignment(1);

    form.updateFieldAppearances(timesRomanFont);

    addressSoftField.updateAppearances(timesRomanFontSoft);
    buildingField.updateAppearances(timesRomanFontSoft);
    inspectorSoftField.updateAppearances(timesRomanFontSoft);
    stairHallSoftField.updateAppearances(timesRomanFontSoft);
    unitNumberSoftField.updateAppearances(timesRomanFontSoft);
    reportDateField.updateAppearances(timesRomanFontSoft);
    preparedbyField.updateAppearances(timesRomanFontSoft);
    preparedbyTitleField.updateAppearances(timesRomanFontSoft);
    workOrderNumberField.updateAppearances(timesRomanFontSoft);
    workOrderNumberCenterField.updateAppearances(timesRomanFontSoft);
    inspectionDateField.updateAppearances(timesRomanFontSoft);
    locationNumberField.updateAppearances(timesRomanFontSoft);
    lotField.updateAppearances(timesRomanFontSoft);
    buildingIdentificationNumberField.updateAppearances(timesRomanFontSoft);
    blockField.updateAppearances(timesRomanFontSoft);

    const pdfBytes = await template.save();

    saveByteArray(obj.workOrderNumber, pdfBytes)

    form.flatten();

}

class App extends React.Component {

    state = {
        posOrNeg: 0,
        address: '',
        block: '',
        borderStreets: '',
        building: '',
        buildingIdentificationNumber: '',
        inspectionDate: '',
        inspector: '',
        locationNumber: '',
        lot: '',
        preparedby: '',
        preparedbyTitle: '',
        reportDate: '',
        stairHall: '',
        totalShots: '',
        unitNumber: '',
        workOrderNumber: '',
        xrfInstrumentSerialNumber: '',
        zipcode: '10002',
    };

    handleOnChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit= (e) => {
        editPDF(this.state);
        e.preventDefault();
    };


    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <p> Address
                    <select style={{width: "25%"}} type="text" name="address" value={this.state.address} onChange={this.handleOnChange}>
                        <option value=""></option>
                        <option value="220 Madison Street,Madison Street and Clinton Street,05,1077518,256,5,1">220 Madison Street</option>
                        <option value="240 Madison Street,Madison Street and Clinton Street,05,1077518,256,5,1">240 Madison Street</option>
                        <option value="250 Madison Street,Madison Street and Clinton Street,05,1077518,256,5,1">250 Madison Street</option>
                        <option value="280 Madison Street,Madison Street and Montgomery Street,09,1083385,258,9,1">280 Madison Street</option>
                        <option value="290 Madison Street,Madison Street and Montgomery Street,09,1083385,258,9,1">290 Madison Street</option>
                        <option value="45 Rutgers Street,Madison Street and Rutgers Street,01,1077514,256,1,1">45 Rutgers Street</option>
                        <option value="55 Rutgers Street,Rutgers Street and Cherry Street,02,1077515,256,2,1">55 Rutgers Street</option>
                        <option value="65 Jefferson St.,Clinton Street and Cherry Street,03,1077516,256,3,1">65 Jefferson Street</option>
                        <option value="40 Montgomery St.,Madison Street and Montgomery Street,09,1083385,258,9,1">40 Montgomery Street</option>
                        <option value="278 Cherry Street,Rutgers Street and Cherry Street,010,1003211,256,10,14">278 Cherry Street</option>
                        <option value="280 Cherry Street,Rutgers Street and Cherry Street,010,1003211,256,10,14">280 Cherry Street</option>
                        <option value="282 Cherry Street,Rutgers Street and Cherry Street,010,1003211,256,10,14">282 Cherry Street</option>
                        <option value="300 Cherry Street,Clinton Street and Cherry Street,04,1077517,256,4,1">300 Cherry Street</option>
                        <option value="310 Cherry Street,Clinton Street and Cherry Street,04,1077517,256,4,1">310 Cherry Street</option>
                        <option value="340 Cherry Street,Clinton Street and Cherry Street,04,1077517,256,4,1">340 Cherry Street</option>
                        <option value="225 Clinton Street,Madison Street and Clinton Street,05,1077518,256,5,1">225 Clinton Street</option>
                        <option value="230 Clinton Street,Madison Street and Clinton Street,07,1083384,258,7,1">230 Clinton Street</option>
                        <option value="250 Clinton Street,Clinton Street and Cherry Street,06,1083387,258,6,1">250 Clinton Street</option>
                        <option value="340 Clinton Street,Cherry Street and Montgomery Street,08,1083386,258,8,1">340 Clinton Street</option>
                        <option value="286 South Street,South Street and Clinton Street,011,1003142,245,11,1">286 South Street</option>
                        <option value="291 South Street,South Street and Clinton Street,011,1003142,245,11,1">291 South Street</option>
                    </select></p>
                    <p> Inspection Date <input style={{width: "25%"}} type="text" name="inspectionDate" value={this.state.inspectionDate}
                                                   onChange={this.handleOnChange}/></p>
                    <p> Inspector
                        <select style={{width: "25%"}} type="text" name="inspector" value={this.state.inspector} onChange={this.handleOnChange}>
                            <option value=""></option>
                            <option value="Debra Lamazon">Debra Lamazon</option>
                            <option value="Stylianos Theofilopoulos">Stylianos Theofilopoulos</option>
                            <option value="Jesse Parra">Jesse Parra</option>
                        </select></p>
                    <p> Location Number <input style={{width: "25%"}} type="text" name="locationNumber"
                                                   value={this.state.locationNumber}
                                                   onChange={this.handleOnChange}/></p>
                    <p> Prepared by <input style={{width: "25%"}} type="text" name="preparedby"
                                               value={this.state.preparedby}
                                               onChange={this.handleOnChange}/></p>
                    <p> Prepared by Title <input style={{width: "25%"}} type="text" name="preparedbyTitle"
                                                     value={this.state.preparedbyTitle}
                                                     onChange={this.handleOnChange}/></p>
                    <p> Report Date <input style={{width: "25%"}} type="text" name="reportDate" value={this.state.reportDate}
                                               onChange={this.handleOnChange}/></p>
                    <p> Total Shots <input style={{width: "25%"}} type="text" name="totalShots" value={this.state.totalShots}
                                               onChange={this.handleOnChange}/></p>
                    <p> Unit Number <input style={{width: "25%"}} type="text" name="unitNumber" value={this.state.unitNumber}
                                               onChange={this.handleOnChange}/></p>
                    <p> Work Order Number <input style={{width: "25%"}} type="text" name="workOrderNumber"
                                                     value={this.state.workOrderNumber}
                                                     onChange={this.handleOnChange}/></p>
                    <p> XRF Instrument Serial Number <input style={{width: "25%"}} type="text" name="xrfInstrumentSerialNumber"
                                                                value={this.state.xrfInstrumentSerialNumber}
                                                                onChange={this.handleOnChange}/></p>
                    <input style={{width: "50%"}} type="submit" value="Submit" />
                </form>
            </>
        );
    }
}

export default App;
