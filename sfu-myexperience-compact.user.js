// ==UserScript==
// @name          SFU MyExperience Compact
// @description   A compact version of the "Job Postings" board on MyExperience. Uses Gleb Pirogov's SFU MyExperience Revamp (https://userstyles.org/styles/180535/sfu-myexperience-revamp) (under CC-BY of unspecified version) as a base.
// @author        KaranveerB
// @include       https://myexperience.sfu.ca/myAccount/co-op/postings.htm
// @downloadURL   https://github.com/KaranveerB/SFU-MyExperience-Compact/raw/master/sfu-myexperience-compact.user.js
// @version       0.1
// ==/UserScript==
function insertTagLabel(tagsStatus, appStatus) {
    let text = appStatus.textContent.trim();

    let new_label = document.createElement('span');
    new_label.classList.add('label', 'label-app-status');
    new_label.textContent = text;

    let tag_container = tagsStatus.querySelector('.posting-tags-container')

    tag_container.appendChild(new_label)
}

function mergeTagsAndAppStatusHeader(tagsHeaderCell, appStatusHeaderCell) {
    tagsHeaderCell.textContent += '/ ' + appStatusHeaderCell.textContent;
    appStatusHeaderCell.textContent = ''
}

function mergeTagsAndAppStatusCell(tagsCell, appStatusCell) {
    if (appStatusCell.textContent && appStatusCell.textContent.trim()) {
      insertTagLabel(tagsCell, appStatusCell);
      appStatusCell.textContent = '';
    }
}

function mergeOrganizationAndDivisionHeader(orgHeader, divisHeader) {
    orgHeader.children[0].textContent += '/ ' + divisHeader.textContent;
    divisHeader.textContent = '';
}

function mergeOrganizationAndDivisionCell(orgCell, divisCell) {
    const orgCellText = orgCell.textContent;
    const divisCellText = divisCell.textContent;

    if (orgCellText !== divisCellText && !orgCellText.includes(divisCellText)) {
        orgCell.textContent += ' [' + divisCellText + ']';
    }

    divisCell.textContent = '';
}

function shortenOpeningsHeader(openingHeader) {
    openingHeader.children[0].textContent = 'Spots';
}

function shortenPositionTypeHeader(posTypeHeader) {
    posTypeHeader.children[0].textContent = 'Type';
}

function shortenLongPositionTypeCell(posTypeCell) {
    // Contemporary Arts Intership Only single handedly makes the width way to big
    if (posTypeCell.textContent === 'Contemporary Arts Internships Only') {
        posTypeCell.textContent = 'C. Art Intrn';
    }
}

function reformatTable() {
    let table = document.querySelector('#postingsTable');
    let rows = table.querySelectorAll('tr');

    // handle headers
    let [
        , // optionCell
        appStatusCell,
        tagsCell,
        , // termCell
        , // idCell
        , // jobTitleCell
        orgCell,
        divisCell,
        posTypeCell,
        openingsCell,
        , // internalStatusCell
        , // locationCell
        , // applicationDeadlineCell
        , // removeCell
    ] = rows[0].cells;


    mergeTagsAndAppStatusHeader(tagsCell, appStatusCell);
    mergeOrganizationAndDivisionHeader(orgCell, divisCell);
    shortenOpeningsHeader(openingsCell);
    shortenPositionTypeHeader(posTypeCell);

    // handle invididual cells
    for (let i = 1; i < rows.length; i++) {
        [
            , // optionCell
            appStatusCell,
            tagsCell,
            , // termCell
            , // idCell
            , // jobTitleCell
            orgCell,
            divisCell,
            posTypeCell,
            , // openingsCell
            , // internalStatusCell
            , // locationCell
            , // applicationDeadlineCell
            , // removeCell
        ] = rows[i].cells;

        mergeTagsAndAppStatusCell(tagsCell, appStatusCell);
        mergeOrganizationAndDivisionCell(orgCell, divisCell);
        shortenLongPositionTypeCell(posTypeCell);
    }
}

onload = function() {
    let css = `
        .label-app-status {
            background-color: green;
        }

        /* makes the "Job Title" column bigger */
        th.orbisTableSorter_both:nth-child(6) {
            padding-right: 225px !important;
        }

        .orgDivTitleMaxWidth {
            /* removes text overflow */
            white-space: normal !important;
        }

        /* makes "Position Type" Column smaller */
        th.orbisTableSorter_both:nth-child(9) {
            padding-right: 0px !important;
        }

        td:nth-child(9) {
            text-overflow: clip !important;
            white-space: normal !important;
        }

        /* makes "Openings" Column smaller */
        th.orbisTableSorter_both:nth-child(10) {
            padding-right: 0px !important;
        }

        /* makes "Internal Status" Column smaller */
        th.orbisTableSorter_both:nth-child(11) {
            padding-right: 0px !important;
        }

        td:nth-child(11) {
            text-overflow: clip !important;
            white-space: normal !important;
        }

        /* makes "Location" Column smaller */
        th.orbisTableSorter_both:nth-child(12) {
            padding-right: 0px !important;
        }

        td:nth-child(12) {
            text-overflow: clip !important;
            white-space: normal !important;
        }
    `;

    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
        console.log('a')
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
        console.log('b')
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
        console.log('c')
    } else {
        let node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        let heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }

    reformatTable();

}();
