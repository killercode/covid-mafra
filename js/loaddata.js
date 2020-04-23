// Parses and prepare the news feed
function processNews(data) {
    $(data).find("item").each(function () {
        el = $(this);
        cats = el.find("category")
        isCovid = false
        for (i = 0; i < cats.length; i++) {
            if (cats[i].textContent == "Covid19") {
                isCovid = true;
            }
        }
        if (isCovid) {
            template = "<a class='dropdown-item d-flex align-items-center' href='" + el.find("link").text() + "'>" +
                "<div class='mr-3'>" +
                "<div class='icon-circle bg-success'>" +
                "<i class='fas fa-rss text-white'></i>" +
                "</div>" +
                "</div>" +
                "<div>" +
                "<div class='small text-gray-500'>" + el.find("pubDate").text() + "</div>" +
                el.find("title").text() +
                "</div>" +
                "</a>";
            document.getElementById("news").innerHTML += template
        }
    });
}

// Main data variables
maindata =
{
    dates: [],
    deaths: [],
    confirmed: [],
    contacts: [],
    recovered: [],
    suspects: [],
    active:[],
}

// Localities data
localdata =
{
    date: [],
    locEnc: [],
    locSantoIsidoro: [],
    locEriceira: [],
    locCarvoeira: [],
    locAzueira: [],
    locMafra: [],
    locCheleiros: [],
    locGradil: [],
    locMilharado: [],
    locMalveira: [],
    locVenda: []
}
growth = "";

var test;
var timeFormat = 'DD/MM/YYYY';

function processLocalData(allText){
    data = convertCSVToJson(allText);
    data.reduce(fillLocalData);
}

// Process Main Data From CSV file
function processMainData(allText) {
    data = convertCSVToJson(allText);
    test = data;
    data.reduce(fillData);

    document.getElementById("lblConfirmed").innerHTML = maindata.confirmed[maindata.confirmed.length - 1];
    document.getElementById("lblSuspects").innerHTML = maindata.suspects[maindata.suspects.length - 1];
    document.getElementById("lblContacts").innerHTML = maindata.contacts[maindata.contacts.length - 1];
    document.getElementById("lblDeaths").innerHTML = maindata.deaths[maindata.deaths.length - 1];
    document.getElementById("lblRecovered").innerHTML = maindata.recovered[maindata.recovered.length - 1];
    document.getElementById("lblGrowth").innerHTML = parseFloat(((maindata.confirmed[maindata.confirmed.length - 1] - maindata.confirmed[maindata.confirmed.length - 2]) / maindata.confirmed[maindata.confirmed.length - 2]) * 100).toFixed(2).toLocaleString() + "%";
    document.getElementById("lblActive").innerHTML = maindata.active[maindata.active.length - 1];

    diffConfirmed = maindata.confirmed[maindata.confirmed.length - 1] - maindata.confirmed[maindata.confirmed.length - 2];
    document.getElementById("lblDiffConfirmed").innerHTML = getSignal(diffConfirmed) + diffConfirmed.toLocaleString();
    getChevron("iconConfirmed", diffConfirmed, false);

    diffDeaths = maindata.deaths[maindata.deaths.length - 1] - maindata.deaths[maindata.deaths.length - 2];
    document.getElementById("lblDiffDeath").innerHTML = getSignal(diffDeaths) + diffDeaths.toLocaleString();
    getChevron("iconDeath", diffDeaths, false);

    diffRecovery = maindata.recovered[maindata.recovered.length - 1] - maindata.recovered[maindata.recovered.length - 2];
    document.getElementById("lblDiffRecovery").innerHTML = getSignal(diffRecovery) + diffRecovery.toLocaleString();
    getChevron("iconRecovery", diffRecovery, true);

    diffSuspect = maindata.suspects[maindata.suspects.length - 1] - maindata.suspects[maindata.suspects.length - 2];
    document.getElementById("lblDiffSuspect").innerHTML = getSignal(diffSuspect) + diffSuspect.toLocaleString();
    getChevron("iconSuspect", diffSuspect, false);

    diffContact = maindata.contacts[maindata.contacts.length - 1] - maindata.contacts[maindata.contacts.length - 2];
    document.getElementById("lblDiffContact").innerHTML = getSignal(diffContact) + diffContact.toLocaleString();
    getChevron("iconContact", diffContact, true);
    
    diffActive = maindata.active[maindata.active.length - 1] - maindata.active[maindata.active.length - 2];
    document.getElementById("lblDiffActive").innerHTML = getSignal(diffActive) + diffActive.toLocaleString();
    getChevron("iconActive", diffActive, false);

    diffGrowth = parseFloat(((maindata.confirmed[maindata.confirmed.length - 1] - maindata.confirmed[maindata.confirmed.length - 2]) / maindata.confirmed[maindata.confirmed.length - 2]) * 100).toFixed(2) - parseFloat(((maindata.confirmed[maindata.confirmed.length - 2] - maindata.confirmed[maindata.confirmed.length - 3]) / maindata.confirmed[maindata.confirmed.length - 3]) * 100).toFixed(2);
    document.getElementById("lblDiffGrowth").innerHTML = getSignal(diffGrowth) + diffGrowth.toLocaleString() + "%";
    getChevron("iconGrowth", diffGrowth, true);
}

function getChevron(element, number, invertColor) {
    if (number > 0) {
        document.getElementById(element).classList.add("fa-chevron-up");
        if (!invertColor) {
            document.getElementById(element).classList.add("text-danger");
        }
        else {
            document.getElementById(element).classList.add("text-success");
        }
    }
    else {
        if (invertColor) {
            document.getElementById(element).classList.add("text-danger");
        }
        else {
            document.getElementById(element).classList.add("text-success");
        }

        if (number == 0) {
            document.getElementById(element).classList.add("fa-equals");
        }
        else if (number < 0) {
            document.getElementById(element).classList.add("fa-chevron-down");
        }
    }
}


function getSignal(number) {
    if (number > 0) {
        return "+";
    }
    else {
        return "";
    }
}

function fillData(val, val2) {
    maindata.dates.push(val2.date);
    maindata.deaths.push(val2.deaths);
    maindata.confirmed.push(val2.confirmed);
    maindata.contacts.push(val2.contact);
    maindata.recovered.push(val2.recovery);
    maindata.suspects.push(val2.suspect);
    maindata.active.push(val2.confirmed-val2.deaths-val2.recovery);
}

function fillLocalData(val, val2)
{
    localdata.date.push(val2.date);
    localdata.locEnc.push(val2.locEnc);
    localdata.locSantoIsidoro.push(val2.locSantoIsidoro);
    localdata.locEriceira.push(val2.locEriceira);
    localdata.locCarvoeira.push(val2.locCarvoeira);
    localdata.locAzueira.push(val2.locAzueira);
    localdata.locMafra.push(val2.locMafra);
    localdata.locCheleiros.push(val2.locCheleiros);
    localdata.locGradil.push(val2.locGradil);
    localdata.locMilharado.push(val2.locMilharado);
    localdata.locMalveira.push(val2.locMalveira);
    localdata.locVenda.push(val2.locVenda);
}

function convertCSVToJson(allText) {
    //var csv is the CSV file with headers
    var lines = allText.split("\n");
    var result = [];
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result; //JSON
}