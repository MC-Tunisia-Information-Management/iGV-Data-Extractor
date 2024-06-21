function dataExtraction_GV(graphql) {
  var graphql = JSON.stringify({ query: graphql });
  var requestOptions = {
    method: "post",
    payload: graphql,
    contentType: "application/json",
    headers: {
      access_token: "",
    },
  };
  var response = UrlFetchApp.fetch(
    `https://gis-api.aiesec.org/graphql?access_token=${requestOptions["headers"]["access_token"]}`,
    requestOptions
  );
  var recievedDate = JSON.parse(response.getContentText());
  return recievedDate.data.allOpportunityApplication.data;
}

function dataManipulation_GV(dataSet, sheet) {
  var newRows = [];
  var newIndex = -1;
  for (var i = 0; i < dataSet.length; i++) {
    let rowIndex = sheet
      .createTextFinder(dataSet[i].person.id + "_" + dataSet[i].opportunity.id)
      .matchEntireCell(false)
      .findAll()
      .map((x) => x.getRow());

    var _org = dataSet[i].opportunity.organisation;
    var org = "";
    if (_org) {
      org = _org.name;
    }
    console.log(org);

    if (rowIndex.length == 0) {
      newRows.push([
        dataSet[i].person.id + "_" + dataSet[i].opportunity.id,
        dataSet[i].person.full_name,
        dataSet[i].opportunity.programme.short_name_display,
        dataSet[i].status,
        dataSet[i].opportunity.remote_opportunity == true ? "Yes" : "No",
        "",

        dataSet[i].person.email,
        dataSet[i].person.contact_detail != null
          ? dataSet[i].person.contact_detail.phone
          : "",
        dataSet[i].person.home_mc.name,
        dataSet[i].person.home_lc.name,
        "",

        dataSet[i].opportunity.home_mc.name,
        dataSet[i].opportunity.host_lc.name,
        "https://aiesec.org/opportunity/" + dataSet[i].opportunity.id,
        dataSet[i].opportunity.programme.short_name_display,
        dataSet[i].opportunity.opportunity_duration_type != null
          ? dataSet[i].opportunity.opportunity_duration_type.duration_type
          : "",
        dataSet[i].opportunity.programme.short_name_display == "GV"
          ? dataSet[i].opportunity.project_fee.fee +
            " " +
            dataSet[i].opportunity.project_fee.currency
          : 0,
        dataSet[i].opportunity.specifics_info.salary == null
          ? 0
          : dataSet[i].opportunity.specifics_info.salary +
            " " +
            dataSet[i].opportunity.specifics_info.salary_currency
              .alphabetic_code,
        "",

        dataSet[i].date_approved != null
          ? dataSet[i].date_approved.toString().substring(0, 10)
          : dataSet[i].status == "approved"
          ? dataSet[i].updated_at.toString().substring(0, 10)
          : "-",
        dataSet[i].slot != null ? dataSet[i].slot.start_date : "-",
        dataSet[i].slot != null ? dataSet[i].slot.end_date : "-",
        dataSet[i].status == "remote_realized"
          ? dataSet[i].updated_at.toString().substring(0, 10)
          : "-",
        "" /*RE date*/,
        "" /*Fi date*/,
        "",
        "",
        "" /*standard 1*/,
        "",
        "" /*standard 2*/,
        "",
        "" /*standard 3*/,
        "",
        "" /*standard 4*/,
        "",
        "" /*standard 5*/,
        "",
        "" /*standard 6*/,
        "",
        "" /*standard 7*/,
        "",
        "" /*standard 8*/,
        "",
        "" /*standard 9*/,
        "",
        "" /*standard 10*/,
        "",
        "" /*standard 11*/,
        "",
        "" /*standard 12*/,
        "",
        "" /*standard 13*/,
        "",
        "" /*standard 14*/,
        "",
        "" /*standard 15*/,
        "",
        "" /*standard 16*/,
        org,
      ]);
      newIndex++;
      if (dataSet[i].status == "realized") {
        if (dataSet[i].date_realized != null) {
          newRows[newIndex][23] = dataSet[i].date_realized
            .toString()
            .substring(0, 10);
        }
        if (dataSet[i].experience_end_date != null) {
          newRows[newIndex][24] = dataSet[i].experience_end_date
            .toString()
            .substring(0, 10);
        }
      } else if (
        dataSet[i].status == "finished" ||
        dataSet[i].status == "completed"
      ) {
        if (dataSet[i].date_realized != null) {
          newRows[newIndex][23] = dataSet[i].date_realized
            .toString()
            .substring(0, 10);
        }
        if (dataSet[i].experience_end_date != null) {
          newRows[newIndex][24] = dataSet[i].experience_end_date
            .toString()
            .substring(0, 10);
        }
      }
      for (var k = 0; k < 16; k++) {
        if (dataSet[i].standards[k].standard_option != null) {
          r = k * 2;
          newRows[newIndex][27 + r] =
            dataSet[i].standards[k].standard_option.meta.option;
        } else {
          r = k * 2;
          newRows[newIndex][27 + r] = "-";
        }
      }
    } else {
      var row = [];
      row.push([
        dataSet[i].person.id + "_" + dataSet[i].opportunity.id,
        dataSet[i].person.full_name,
        dataSet[i].opportunity.programme.short_name_display,
        dataSet[i].status,
        dataSet[i].opportunity.remote_opportunity == true ? "Yes" : "No",
        "",

        dataSet[i].person.email,
        dataSet[i].person.contact_detail != null
          ? dataSet[i].person.contact_detail.phone
          : "",
        dataSet[i].person.home_mc.name,
        dataSet[i].person.home_lc.name,
        "",

        dataSet[i].opportunity.home_mc.name,
        dataSet[i].opportunity.host_lc.name,
        "https://aiesec.org/opportunity/" + dataSet[i].opportunity.id,
        dataSet[i].opportunity.programme.short_name_display,
        dataSet[i].opportunity.opportunity_duration_type != null
          ? dataSet[i].opportunity.opportunity_duration_type.duration_type
          : "",
        dataSet[i].opportunity.programme.short_name_display == "GV"
          ? dataSet[i].opportunity.project_fee.fee +
            " " +
            dataSet[i].opportunity.project_fee.currency
          : 0,
        dataSet[i].opportunity.specifics_info.salary == null
          ? 0
          : dataSet[i].opportunity.specifics_info.salary +
            " " +
            dataSet[i].opportunity.specifics_info.salary_currency
              .alphabetic_code,
        "",

        dataSet[i].date_approved != null
          ? dataSet[i].date_approved.toString().substring(0, 10)
          : dataSet[i].status == "approved"
          ? dataSet[i].updated_at.toString().substring(0, 10)
          : "-",
        dataSet[i].slot != null ? dataSet[i].slot.start_date : "-",
        dataSet[i].slot != null ? dataSet[i].slot.end_date : "-",
        dataSet[i].status == "remote_realized"
          ? dataSet[i].updated_at.toString().substring(0, 10)
          : "-",
        "" /*RE date*/,
        "" /*Fi date*/,
        "",
        "",
        "" /*standard 1*/,
        "",
        "" /*standard 2*/,
        "",
        "" /*standard 3*/,
        "",
        "" /*standard 4*/,
        "",
        "" /*standard 5*/,
        "",
        "" /*standard 6*/,
        "",
        "" /*standard 7*/,
        "",
        "" /*standard 8*/,
        "",
        "" /*standard 9*/,
        "",
        "" /*standard 10*/,
        "",
        "" /*standard 11*/,
        "",
        "" /*standard 12*/,
        "",
        "" /*standard 13*/,
        "",
        "" /*standard 14*/,
        "",
        "" /*standard 15*/,
        "",
        "" /*standard 16*/,
        org,
      ]);

      if (dataSet[i].status == "realized") {
        if (dataSet[i].date_realized != null) {
          row[0][23] = dataSet[i].date_realized.toString().substring(0, 10);
        }
        if (dataSet[i].experience_end_date != null) {
          row[0][24] = dataSet[i].experience_end_date
            .toString()
            .substring(0, 10);
        }
      } else if (
        dataSet[i].status == "finished" ||
        dataSet[i].status == "completed"
      ) {
        if (dataSet[i].date_realized != null) {
          row[0][23] = dataSet[i].date_realized.toString().substring(0, 10);
        }
        if (dataSet[i].experience_end_date != null) {
          row[0][24] = dataSet[i].experience_end_date
            .toString()
            .substring(0, 10);
        }
      }
      for (var k = 0; k < 16; k++) {
        if (dataSet[i].standards[k].standard_option != null) {
          r = k * 2;
          row[0][27 + r] = dataSet[i].standards[k].standard_option.meta.option;
        } else {
          r = k * 2;
          row[0][27 + r] = "-";
        }
      }

      sheet.getRange(rowIndex, 1, 1, row[0].length).setValues(row);
    }
  }
  if (newRows.length > 0) {
    sheet
      .getRange(
        getLastRowOfCol(sheet) + 5,
        1,
        newRows.length,
        newRows[0].length
      )
      .setValues(newRows);
  }
}

function main_GV() {
  var sheetInterface =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Interface"); // write sheet name
  var updatingSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IGV");
  var startDate = Utilities.formatDate(
    sheetInterface.getRange(12, 2).getValue(),
    "GMT+2",
    "dd/MM/yyyy"
  );
  var interfaceSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Interface");

  try {
    var queryAPDs = `query{allOpportunityApplication(\n\t\tfilters:\n\t\t{\n      opportunity_home_mc:1559\n      date_approved:{from:\"${startDate}\"}\n\t\t\tprogrammes:[7]\n      \n\t\t}\n    \n    page:1\n    per_page:3000\n\t)\n\t{\n    paging\n    {\n      total_items\n    }\n\t\tdata\n    {\n      person\n      {\n        id\n        full_name\n        email\n        home_lc\n        {\n          name\n        }\n        home_mc\n        {\n          name\n        }\n      }\n      opportunity\n      {\n        id\n        programme\n        { short_name_display }\n        host_lc\n        {\n          name\n        }\n        home_mc\n        {\n          name\n        }\n        remote_opportunity\n        project_fee\n        earliest_start_date\n        latest_end_date\n        specifics_info{\n          salary\n          salary_currency{\n            alphabetic_code\n          }\n        }\n        opportunity_duration_type{\n          duration_type\n          salary\n        }\n        \n      }\n      slot{\n        start_date\n        end_date\n      }\n      status\n      updated_at\n      date_approved\n      date_realized\n      experience_end_date\n       standards{\n        \n        standard_option{\n          meta\n        }\n \n      }\n  \n     }\n  }\n}`;

    var dataSet_APDs = dataExtraction_GV(queryAPDs);
    var APDs = dataManipulation_GV(dataSet_APDs, updatingSheet);

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    var queryREs = `query{allOpportunityApplication(\n\t\tfilters:\n\t\t{\n      opportunity_home_mc:1559\n      date_realized:{from:\"${startDate}\"}\n\t\t\tprogrammes:[7]\n      \n\t\t}\n    \n    page:1\n    per_page:3000\n\t)\n\t{\n    paging\n    {\n      total_items\n    }\n\t\tdata\n    {\n      person\n      {\n        id\n        full_name\n        email\n        home_lc\n        {\n          name\n        }\n        home_mc\n        {\n          name\n        }\n      }\n      opportunity\n      {\n    organisation\n{name}\n    id\n        programme\n        { short_name_display }\n        host_lc\n        {\n          name\n        }\n        home_mc\n        {\n          name\n        }\n        remote_opportunity\n        project_fee\n        earliest_start_date\n        latest_end_date\n        specifics_info{\n          salary\n          salary_currency{\n            alphabetic_code\n          }\n        }\n        opportunity_duration_type{\n          duration_type\n          salary\n        }\n        \n      }\n      slot{\n        start_date\n        end_date\n      }\n      status\n      updated_at\n      date_approved\n      date_realized\n      experience_end_date\n       standards{\n        \n        standard_option{\n          meta\n        }\n \n      }\n  \n     }\n  }\n}`;

    var dataSet_REs = dataExtraction_GV(queryREs);
    var REs = dataManipulation_GV(dataSet_REs, updatingSheet);
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    var queryRemote = `query{allOpportunityApplication(\n\t\tfilters:\n\t\t{\n      opportunity_home_mc:1559\n      date_remote_realized:{from:\"${startDate}\"}\n\t\t\tprogrammes:[7]\n     \n\t\t}\n    \n    page:1\n    per_page:3000\n\t)\n\t{\n    paging\n    {\n      total_items\n    }\n\t\tdata\n    {\n      person\n      {\n        id\n        full_name\n        email\n        home_lc\n        {\n          name\n        }\n        home_mc\n        {\n          name\n        }\n      }\n      opportunity\n      {\n    organisation\n{name}\n    id\n        programme\n        { short_name_display }\n        host_lc\n        {\n          name\n        }\n        home_mc\n        {\n          name\n        }\n        remote_opportunity\n        project_fee\n        earliest_start_date\n        latest_end_date\n        specifics_info{\n          salary\n          salary_currency{\n            alphabetic_code\n          }\n        }\n        opportunity_duration_type{\n          duration_type\n          salary\n        }\n        \n      }\n      slot{\n        start_date\n        end_date\n      }\n      status\n      updated_at\n      date_approved\n      date_realized\n      experience_end_date\n       standards{\n        \n        standard_option{\n          meta\n        }\n \n      }\n  \n     }\n  }\n}`;

    var dataSet_Remote_REs = dataExtraction_GV(queryRemote);
    var Remote_REs = dataManipulation_GV(dataSet_Remote_REs, updatingSheet);
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    var queryFIs = `query{allOpportunityApplication(\n\t\tfilters:\n\t\t{\n      opportunity_home_mc:1559\n      experience_end_date:{from:\"${startDate}\"}\n\t\t\tprogrammes:[7]\n  statuses:[\"finished\",\"completed\"]     \n\t\t}\n    \n    page:1\n    per_page:3000\n\t)\n\t{\n    paging\n    {\n      total_items\n    }\n\t\tdata\n    {\n      person\n      {\n        id\n        full_name\n        email\n        home_lc\n        {\n          name\n        }\n        home_mc\n        {\n          name\n        }\n      }\n      opportunity\n      {\n    organisation\n{name}\n    id\n        programme\n        { short_name_display }\n        host_lc\n        {\n          name\n        }\n        home_mc\n        {\n          name\n        }\n        remote_opportunity\n        project_fee\n        earliest_start_date\n        latest_end_date\n        specifics_info{\n          salary\n          salary_currency{\n            alphabetic_code\n          }\n        }\n        opportunity_duration_type{\n          duration_type\n          salary\n        }\n        \n      }\n      slot{\n        start_date\n        end_date\n      }\n      status\n      updated_at\n      date_approved\n      date_realized\n      experience_end_date\n       standards{\n        \n        standard_option{\n          meta\n        }\n \n      }\n  \n     }\n  }\n}`;

    var dataSet_FIs = dataExtraction_GV(queryFIs);
    var FIs = dataManipulation_GV(dataSet_FIs, updatingSheet);
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    var queryBreaks = `query{allOpportunityApplication(\n\t\tfilters:\n\t\t{\n      opportunity_home_mc:1559\n  \n last_interaction:{from:\"${startDate}\"}   \n    statuses:[\"approval_broken\",\"realization_broken\"]\n\t\t\tprogrammes:[7]\n\t\t}\n    \n    page:1\n    per_page:1000\n\t)\n\t{\n    data\n    {\n      person\n      {\n        id\n      }\n      opportunity\n      {\n     organisation\n{name}\n   id\n        }\n      \n      status      \n     }\n  }\n}`;
    var dataSet_Breaks = dataExtraction_GV(queryBreaks);
    updateBreaks_GV(updatingSheet, dataSet_Breaks);

    var now = new Date();
    updateDate = interfaceSheet.getRange(8, 4).setValue(now);
    updateDate = interfaceSheet.getRange(8, 3).setValue("Succeed");
  } catch (e) {
    Logger.log(e.toString());
    var now = new Date();
    updateDate = interfaceSheet.getRange(8, 4).setValue(now);
    updateDate = interfaceSheet.getRange(8, 3).setValue("Failed");
  }
}

function updateECBChecks_GV() {
  var updatingSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IGV");
  var lr = getLastRowOfCol(updatingSheet);
  var data = updatingSheet
    .getRange(5, 1, lr, updatingSheet.getLastColumn())
    .getValues();
  for (let i = 0; i < lr; i++) {
    var lcSpreadSheet = SpreadsheetApp.openById(ecbSheetsMap[`${data[i][12]}`]);
    Logger.log(lcSpreadSheet.getName());
    var icxSheet = lcSpreadSheet.getSheetByName("ICX Database/Auditing");
    var rowIndex = icxSheet
      .createTextFinder(data[i][0])
      .matchEntireCell(false)
      .findAll()
      .map((x) => x.getRow());
    if (rowIndex.length > 0) {
      for (let j = 0; j < 16; j++) {
        if (icxChecksMap[`${j + 1}`] != undefined) {
          var check = icxSheet
            .getRange(rowIndex, icxChecksMap[`${j + 1}`])
            .getValue();
          updatingSheet.getRange(i + 5, 27 + j * 2).setValue(check);
        }
      }
    }
  }
}

function updateBreaks_GV(sheet, breaks) {
  for (var i = 0; i < breaks.length; i++) {
    var rowIndex = sheet
      .createTextFinder(breaks[i].person.id + "_" + breaks[i].opportunity.id)
      .matchEntireCell(false)
      .findAll()
      .map((x) => x.getRow());
    if (rowIndex.length > 0) {
      sheet.getRange(rowIndex[0], 4).setValue(breaks[i].status);
    }
  }
}

function getLastRowOfCol(sheet) {
  var lr = sheet.getLastRow();
  var range = sheet.getRange(5, 1, lr, 1).getValues();
  var lastRow = 0;
  for (var i = 0; i < lr; i++) {
    if (range[i] != "") {
      lastRow++;
    }
  }
  return lastRow;
}
