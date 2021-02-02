import React from "react";
import {PDFDocument, StandardFonts} from "pdf-lib";

const pdf2base64 = require('pdf-to-base64');

function saveByteArray(reportName, byte) {
  var blob = new Blob([byte], {type: "application/pdf"});
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  var fileName = reportName;
  link.download = fileName;
  link.click();
}

async function createbase64(row) {

  //take pdf and make base64 encoding of it

  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  var url;

  switch (row) {
    case '0':
       url = "https://firebasestorage.googleapis.com/v0/b/kamconsultantspositivereport.appspot.com/o/PosFinalReportTemplateAcrobat0.pdf?alt=media&token=f58ff07c-1761-4c00-b449-98a39d152a07";
      break;
    case '1':
       url = "https://firebasestorage.googleapis.com/v0/b/kamconsultantspositivereport.appspot.com/o/PosFinalReportTemplateAcrobat1.pdf?alt=media&token=dadbc4e7-03ac-440f-bbcb-525a5c1e49f0";
      break;
    case '2':
       url = "https://firebasestorage.googleapis.com/v0/b/kamconsultantspositivereport.appspot.com/o/PosFinalReportTemplateAcrobat2.pdf?alt=media&token=66dcedc1-5992-48e9-9b40-cddbbae99883";
      break;
    case '3':
       url = "https://firebasestorage.googleapis.com/v0/b/kamconsultantspositivereport.appspot.com/o/PosFinalReportTemplateAcrobat3.pdf?alt=media&token=d2c81868-7b47-451b-9f74-d78fe269d312";
      break;
    case '4':
       url = "https://firebasestorage.googleapis.com/v0/b/kamconsultantspositivereport.appspot.com/o/PosFinalReportTemplateAcrobat4.pdf?alt=media&token=d6cf5d47-c7c9-4b46-bea6-fa9d7884b6ff";
      break;
    case '5':
       url = "https://firebasestorage.googleapis.com/v0/b/kamconsultantspositivereport.appspot.com/o/PosFinalReportTemplateAcrobat5.pdf?alt=media&token=ea23fa6a-cc71-47b3-9cab-8500682c0bf8";
      break;
    case '6':
       url = "https://firebasestorage.googleapis.com/v0/b/kamconsultantspositivereport.appspot.com/o/PosFinalReportTemplateAcrobat6.pdf?alt=media&token=992897be-f615-40e9-a9b8-6f6fcc7e9a34";
      break;
    case '7':
       url = "https://firebasestorage.googleapis.com/v0/b/kamconsultantspositivereport.appspot.com/o/PosFinalReportTemplateAcrobat7.pdf?alt=media&token=2dac622e-a070-4802-9f5f-d645d534c61e";
      break;
    case '8':
       url = "https://firebasestorage.googleapis.com/v0/b/kamconsultantspositivereport.appspot.com/o/PosFinalReportTemplateAcrobat8.pdf?alt=media&token=d8ed627f-7dd8-4c97-8935-e96b15d14be0";
      break;
    case '9':
       url = "https://firebasestorage.googleapis.com/v0/b/kamconsultantspositivereport.appspot.com/o/PosFinalReportTemplateAcrobat9.pdf?alt=media&token=97e5e371-e5ab-4cf4-b586-c728917fcc65";
      break;
    case '10':
       url = "https://firebasestorage.googleapis.com/v0/b/kamconsultantspositivereport.appspot.com/o/PosFinalReportTemplateAcrobat10.pdf?alt=media&token=b37a4bc0-ff06-4c2b-9f91-e8d235ee8d3c";
      break;
    default:
      break;
  }

  const b64 = await pdf2base64(proxyurl + url)
      .then(
          (response) => {
            console.log(response);
            return response;
          }
      )
      .catch(
          (error) => {
            console.log(error); //Exepection error....
          }
      )

  return b64;
}

async function editPDF(obj) {

  const base64encoded = await createbase64(obj.rows);

  const addressArray = obj.address.split(',');

  const template = await PDFDocument.load(base64encoded);

  const timesRomanFont = await template.embedFont(StandardFonts.TimesRomanBold)

  const timesRomanFontSoft = await template.embedFont(StandardFonts.TimesRoman)

  const form = template.getForm();

  // add loop to take input of paint chips to add Dimensions ${0-10}, Detection Limit ${0-10}, Units ${0-10}

  const pC = obj.paintChips;

  var i;

  if (pC <= 8) {
    for (i = 1; i <= pC; i++) {

      const dimensionsField = form.getTextField(`Dimensions ${i}`);
      const detectionLimitField = form.getTextField(`Detection Limit ${i}`);
      const unitsField = form.getTextField(`Units ${i}`);

      dimensionsField.setText('2x2');
      detectionLimitField.setText('1 mg/cm^2');
      unitsField.setText('mg/cm^2');

      dimensionsField.setAlignment(1);
      detectionLimitField.setAlignment(1);
      unitsField.setAlignment(1);

      dimensionsField.updateAppearances(timesRomanFontSoft);
      detectionLimitField.updateAppearances(timesRomanFontSoft);
      unitsField.updateAppearances(timesRomanFontSoft);
    }
  }

  const addressField = form.getTextField('Address');
  const addressBigField = form.getTextField('Address Big');
  const addressSoftField = form.getTextField('Address Soft');
  const addressBasicField = form.getTextField('Address Basic');
  const borderStreetsField = form.getTextField('Border Streets');
  const buildingField = form.getTextField('Building');
  const inspectionDateField = form.getTextField('Inspection Date');
  const inspectionDateBoldField = form.getTextField('Inspection Date Bold');
  const inspectorField = form.getTextField('Inspector');
  const inspectorSoftField = form.getTextField('Inspector Soft');
  const locationNumberField = form.getTextField('Location Number');
  const locationNumberBigField = form.getTextField('Location Number Big');
  const paintChipsField = form.getTextField('Paint Chips');
  const positiveShotsField = form.getTextField('Positive Shots');
  const preparedbyField = form.getTextField('Prepared by');
  const preparedbyTitleField = form.getTextField('Prepared by Title');
  const reportDateField = form.getTextField('Report Date');
  const reportDateBoldField = form.getTextField('Report Date Bold');
  const stairHallField = form.getTextField('Stair Hall');
  const stairHallSoftField = form.getTextField('Stair Hall Soft');
  const surfaceCoatingsField = form.getTextField('Surface Coatings');
  const totalShotsField = form.getTextField('Total Shots');
  const unitNumberField = form.getTextField('Unit Number');
  const unitNumberSoftField = form.getTextField('Unit Number Soft');
  const workOrderNumberField = form.getTextField('Work Order Number');
  const workOrderNumberBigField = form.getTextField('Work Order Number Big');
  const workOrderNumberCenterField = form.getTextField('Work Order Number Center');
  const XRFInstrumentSerialNumberField = form.getTextField('XRF Instrument Serial Number');

  addressField.setText(addressArray[0] + ", New York, NY 10002");
  addressBigField.setText(addressArray[0] + ", New York, NY 10002");
  addressSoftField.setText(addressArray[0] + ", New York, NY 10002");
  addressBasicField.setText(addressArray[0]);
  borderStreetsField.setText(addressArray[1] + ".");
  buildingField.setText(addressArray[2]);
  inspectionDateField.setText(obj.inspectionDate);
  inspectionDateBoldField.setText(obj.inspectionDate);
  inspectorField.setText(obj.inspector);
  inspectorSoftField.setText(obj.inspector);
  locationNumberField.setText(obj.locationNumber);
  locationNumberBigField.setText(obj.locationNumber);
  paintChipsField.setText(obj.paintChips);
  positiveShotsField.setText(obj.positiveShots);
  preparedbyField.setText(obj.preparedby);
  preparedbyTitleField.setText(obj.preparedbyTitle);
  reportDateField.setText(obj.reportDate);
  reportDateBoldField.setText(obj.reportDate);
  stairHallField.setText(addressArray[3]);
  stairHallSoftField.setText(addressArray[3]);
  surfaceCoatingsField.setText(obj.surfaceCoatings);
  totalShotsField.setText(obj.totalShots);
  unitNumberField.setText(obj.unitNumber);
  unitNumberSoftField.setText(obj.unitNumber);
  workOrderNumberField.setText(obj.workOrderNumber);
  workOrderNumberBigField.setText(obj.workOrderNumber);
  workOrderNumberCenterField.setText(obj.workOrderNumber);
  XRFInstrumentSerialNumberField.setText(obj.xrfInstrumentSerialNumber);

  addressField.setAlignment(1);
  addressBigField.setAlignment(0);
  buildingField.setAlignment(1);
  inspectorField.setAlignment(1);
  inspectionDateBoldField.setAlignment(1);
  inspectionDateField.setAlignment(0);
  locationNumberBigField.setAlignment(0);
  reportDateBoldField.setAlignment(1);
  stairHallField.setAlignment(1);
  paintChipsField.setAlignment(1);
  surfaceCoatingsField.setAlignment(1);
  positiveShotsField.setAlignment(1);
  unitNumberField.setAlignment(1);
  workOrderNumberField.setAlignment(0);
  workOrderNumberBigField.setAlignment(0);
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

  const pdfBytes = await template.save();

  saveByteArray(obj.workOrderNumber, pdfBytes)

  form.flatten();

}

class App extends React.Component {

  state = {
    posOrNeg: 0,
    address: '',
    borderStreets: '',
    building: '',
    inspectionDate: '',
    inspector: '',
    locationNumber: '',
    paintChips: '',
    positiveShots: '',
    preparedby: '',
    preparedbyTitle: '',
    reportDate: '',
    rows: '',
    stairHall: '',
    surfaceCoatings: '',
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
                <option value="220 Madison Street,Madison Street and Clinton Street,05,5">220 Madison Street</option>
                <option value="240 Madison Street,Madison Street and Clinton Street,05,5">240 Madison Street</option>
                <option value="250 Madison Street,Madison Street and Clinton Street,05,5">250 Madison Street</option>
                <option value="280 Madison Street,Madison Street and Montgomery Street,09,9">280 Madison Street</option>
                <option value="290 Madison Street,Madison Street and Montgomery Street,09,9">290 Madison Street</option>
                <option value="45 Rutgers Street,Madison Street and Rutgers Street,01,1">45 Rutgers Street</option>
                <option value="55 Rutgers Street,Rutgers Street and Cherry Street,02,2">55 Rutgers Street</option>
                <option value="65 Jefferson St.,Clinton Street and Cherry Street,03,3">65 Jefferson Street</option>
                <option value="40 Montgomery St.,Madison Street and Montgomery Street,09,9">40 Montgomery Street</option>
                <option value="278 Cherry Street,Rutgers Street and Cherry Street,010,10">278 Cherry Street</option>
                <option value="280 Cherry Street,Rutgers Street and Cherry Street,010,10">280 Cherry Street</option>
                <option value="282 Cherry Street,Rutgers Street and Cherry Street,010,10">282 Cherry Street</option>
                <option value="300 Cherry Street,Clinton Street and Cherry Street,04,4">300 Cherry Street</option>
                <option value="310 Cherry Street,Clinton Street and Cherry Street,04,4">310 Cherry Street</option>
                <option value="340 Cherry Street,Clinton Street and Cherry Street,04,4">340 Cherry Street</option>
                <option value="225 Clinton Street,Madison Street and Clinton Street,05,5">225 Clinton Street</option>
                <option value="230 Clinton Street,Madison Street and Clinton Street,07,7">230 Clinton Street</option>
                <option value="250 Clinton Street,Clinton Street and Cherry Street,06,6">250 Clinton Street</option>
                <option value="340 Clinton Street,Cherry Street and Montgomery Street,08,8">340 Clinton Street</option>
                <option value="286 South Street,South Street and Clinton Street,011,11">286 South Street</option>
                <option value="291 South Street,South Street and Clinton Street,011,11">291 South Street</option>
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
            <p> Paint Chips <input style={{width: "25%"}} type="text" name="paintChips"
                                   value={this.state.paintChips}
                                   onChange={this.handleOnChange}/></p>
            <p> Positive Shots <input style={{width: "25%"}} type="text" name="positiveShots"
                                      value={this.state.positiveShots}
                                      onChange={this.handleOnChange}/></p>
            <p> Prepared by <input style={{width: "25%"}} type="text" name="preparedby"
                                   value={this.state.preparedby}
                                   onChange={this.handleOnChange}/></p>
            <p> Prepared by Title <input style={{width: "25%"}} type="text" name="preparedbyTitle"
                                         value={this.state.preparedbyTitle}
                                         onChange={this.handleOnChange}/></p>
            <p> Report Date <input style={{width: "25%"}} type="text" name="reportDate" value={this.state.reportDate}
                                   onChange={this.handleOnChange}/></p>
            <p> Rows
              <select style={{width: "25%"}} type="text" name="rows" value={this.state.rows} onChange={this.handleOnChange}>
                <option value=""></option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select></p>
            <p> Surface Coatings <input style={{width: "25%"}} type="text" name="surfaceCoatings"
                                        value={this.state.surfaceCoatings}
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