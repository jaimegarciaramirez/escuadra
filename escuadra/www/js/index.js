/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        console.log('device is ready')
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        this.reset()
        console.log('initialized events');
        byId('calculate').onclick = this.calculate;
    },

    reset: function() {
        byId('feet1').value = '';
        byId('inches1').value = '';
        byId('feet2').value = '';
        byId('inches2').value = '';
        byId('feet1').focus();
    },

    calculate: function() {
        console.log('calculating now');
        var side1 = side(1);
        var side2 = side(2);
        console.log('side 1: ' + side1 + ' | side2: ' + side2);
        var result = pythagorem(side1, side2);
        console.log('hypotenouse: ' + result);
        var friendlyResult = toFeetAndInches(result);
        console.log('friendly: ' + friendlyResult);
        byId('outputFeet').innerHTML = friendlyResult.feet;
        byId('outputInches').innerHTML = friendlyResult.inches;
        byId('exact').innerHTML = friendlyResult.exact;
    },
};

app.initialize();

function byId(id) {
    return document.getElementById(id);
}

function side(sideLabel) {
    var rawFeet = "" + byId('feet' + sideLabel).value;
    var rawInches = "" + byId('inches' + sideLabel).value;
    var feet = Number(rawFeet);
    var inches = Number(rawInches);
    if (rawFeet.length == 0) {
        byId('feet' + sideLabel).value = 0
        feet = 0;
    }
    if (rawInches.length == 0) {
        byId('inches' + sideLabel).value = 0
        inches = 0;
    }
    console.log('got ' + feet + ' feet and ' + inches + ' inches');
    inches = inches / 12;
    var result = feet + inches;
    console.log('calculated to: ' + result);
    return result;
}

function pythagorem(side1, side2) {
    return Math.sqrt(side1 * side1 + side2 * side2)
}

function toFeetAndInches(value) {
    var feet = Math.trunc(value);
    var decimalInches = value - feet;
    var inches = toInches(decimalInches);
    if (inches == 12) {
        feet++;
        inches = 0
    }
    return {
        feet: feet,
        inches: inches,
        exact: value.toFixed(4) 
    }
}

function toInches(decimal) {
    // gives me something like 8.73123123123
    var inchesWithDecimals = decimal * 12;

    var inches = Math.trunc(inchesWithDecimals);
    var partialInchesInDecimals = inchesWithDecimals - inches;
    var quarters = Math.round(toQuartersOfAnInch(partialInchesInDecimals));
    var result = inches;
    if (quarters > 0 && quarters < 4) {
        result += ' - ' + quarters +'/4';
    } else if (quarters > 0 && quarters == 4) {
        result = inches + 1;
    }
    return result;
}

function toQuartersOfAnInch(partialInchesInDecimals) {
    return partialInchesInDecimals * 4;
}