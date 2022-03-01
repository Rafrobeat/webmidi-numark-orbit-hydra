/* colores */
const ColorEnum = {
  BLACK: 0,
  BLUE: 2,
  LGREEN: 5,
  LBLUE: 10,
  GREEN: 12,
  BLUEGREEN: 13,
  YELLOW_GREEN: 24,
  VIOLET: 35,
  RED: 48,
  PINK: 49,
  LILA: 50,
  LILA2: 51,
  ORANGE: 52,
  CHERRY: 57,
  YELLOW: 60,
  GREENL: 61,
  BLUE2: 70,
  YELLOW_DARK: 100,
  WHITE_BLUE: 111,
  ROSA: 117,
  WHITE_ORANGE: 121,
  WHITE_LILA: 123,
  WHITE_GREEN: 125,
  WHITE: 127,
}

// needed for the midi
var midi, output
var interval = null;
var delayBlink = 250;

// this is the main keypad
const buttonNumberLayout = [
  [36, 37, 38, 39],
  [40, 41, 42, 43],
  [44, 45, 46, 47],
  [48, 49, 50, 51]
]

// declare colors
const mainLayoutChannel1 = [
  ["YELLOW_GREEN", "BLUE2", "PINK", "ORANGE"],
  ["YELLOW_GREEN", "BLUE2", "PINK", "ORANGE"],
  ["YELLOW_GREEN", "BLUE2", "PINK", "ORANGE"],
  ["YELLOW_GREEN", "BLUE2", "PINK", "ORANGE"],
]

const mainLayoutChannel2 = [
  ["ROSA", "WHITE_ORANGE", "CHERRY", "LILA"],
  ["ROSA", "WHITE_ORANGE", "CHERRY", "LILA"],
  ["ROSA", "WHITE_ORANGE", "CHERRY", "LILA"],
  ["ROSA", "WHITE_ORANGE", "CHERRY", "LILA"],
]

const mainLayoutChannel3 = [
  ["VIOLET", "YELLOW", "RED", "GREEN"],
  ["VIOLET", "YELLOW", "RED", "GREEN"],
  ["VIOLET", "YELLOW", "RED", "GREEN"],
  ["VIOLET", "YELLOW", "RED", "GREEN"],
]

const mainLayoutChannel4 = [
  ["BLUE", "WHITE_LILA", "LGREEN", "LILA2"],
  ["BLUE", "WHITE_LILA", "LGREEN", "LILA2"],
  ["BLUE", "WHITE_LILA", "LGREEN", "LILA2"],
  ["BLUE", "WHITE_LILA", "LGREEN", "LILA2"],
]

// set the blinking period (in ms), 0 means no blinking
const blinkingPeriodLayout1 = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

const blinkingPeriodLayout2 = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

const blinkingPeriodLayout3 = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

const blinkingPeriodLayout4 = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

// keep track of whether it is currently on or off
const blinkingState = [
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
]

function getButtonNumber(x, y, pad) {
  switch (pad) {
    case 1:
      if (y < mainLayoutChannel1.length && x < mainLayoutChannel1[0].length) {
        return buttonNumberLayout[y][x];
      }
      break;
    case 2:
      if (y < mainLayoutChannel2.length && x < mainLayoutChannel2[0].length) {
        return buttonNumberLayout[y][x];
      }
      break;
    case 3:
      if (y < mainLayoutChannel3.length && x < mainLayoutChannel3[0].length) {
        return buttonNumberLayout[y][x];
      }
      break;
    case 4:
      if (y < mainLayoutChannel4.length && x < mainLayoutChannel4[0].length) {
        return buttonNumberLayout[y][x];
      }
      break;
  }
}

function getButtonColor(x, y, pad) {
  switch (pad) {
    case 1:
      if (y < mainLayoutChannel1.length && x < mainLayoutChannel1[0].length) {
        return ColorEnum[mainLayoutChannel1[y][x]];
      }
      break;
    case 2:
      if (y < mainLayoutChannel2.length && x < mainLayoutChannel2[0].length) {
        return ColorEnum[mainLayoutChannel2[y][x]];
      }
      break;
    case 3:
      if (y < mainLayoutChannel3.length && x < mainLayoutChannel3[0].length) {
        return ColorEnum[mainLayoutChannel3[y][x]];
      }
      break;
    case 4:
      if (y < mainLayoutChannel4.length && x < mainLayoutChannel4[0].length) {
        return ColorEnum[mainLayoutChannel4[y][x]];
      }
      break;
  }
}

function initLaunchpadColors(pad) {
  switch (pad) {
    case 1:
      // apply colors to Pad Bank 1
      for (let y = 0; y < mainLayoutChannel1.length; y++) {
        for (let x = 0; x < mainLayoutChannel1[0].length; x++) {
          const buttonNumber = getButtonNumber(x, y, pad);
          const buttonColor = getButtonColor(x, y, pad);
          output.send([144, buttonNumber, buttonColor]);
        }
      }
      break;
    case 2:
      // apply colors to Pad Bank 2
      for (let y = 0; y < mainLayoutChannel2.length; y++) {
        for (let x = 0; x < mainLayoutChannel2[0].length; x++) {
          const buttonNumber = getButtonNumber(x, y, pad);
          const buttonColor = getButtonColor(x, y, pad);
          output.send([145, buttonNumber, buttonColor]);
        }
      }
      break;
    case 3:
      // apply colors to Pad Bank 3
      for (let y = 0; y < mainLayoutChannel3.length; y++) {
        for (let x = 0; x < mainLayoutChannel3[0].length; x++) {
          const buttonNumber = getButtonNumber(x, y, pad);
          const buttonColor = getButtonColor(x, y, pad);
          output.send([146, buttonNumber, buttonColor]);
        }
      }
      break;
    case 4:
      // apply colors to Pad Bank 4
      for (let y = 0; y < mainLayoutChannel4.length; y++) {
        for (let x = 0; x < mainLayoutChannel4[0].length; x++) {
          const buttonNumber = getButtonNumber(x, y, pad);
          const buttonColor = getButtonColor(x, y, pad);
          output.send([147, buttonNumber, buttonColor]);
        }
      }
      break;
  }
}

function initLaunchpadBlinking(pad) {
  switch (pad) {
    case 1:
      for (let y = 0; y < blinkingPeriodLayout1.length; y++) {
        for (let x = 0; x < blinkingPeriodLayout1[0].length; x++) {
          var buttonBlinkingPeriod = blinkingPeriodLayout1[y][x];
          // console.log(buttonBlinkingPeriod);
          if (buttonBlinkingPeriod != 0)
            setInterval(() => blinkingHelper(output, x, y, pad), buttonBlinkingPeriod);
        }
      }
      break;
    case 2:
      for (let y = 0; y < blinkingPeriodLayout2.length; y++) {
        for (let x = 0; x < blinkingPeriodLayout2[0].length; x++) {
          var buttonBlinkingPeriod = blinkingPeriodLayout2[y][x];
          // console.log(buttonBlinkingPeriod);
          if (buttonBlinkingPeriod != 0)
            setInterval(() => blinkingHelper(output, x, y, pad), buttonBlinkingPeriod);
        }
      }
      break;
    case 3:
      for (let y = 0; y < blinkingPeriodLayout3.length; y++) {
        for (let x = 0; x < blinkingPeriodLayout3[0].length; x++) {
          var buttonBlinkingPeriod = blinkingPeriodLayout3[y][x];
          // console.log(buttonBlinkingPeriod);
          if (buttonBlinkingPeriod != 0)
            setInterval(() => blinkingHelper(output, x, y, pad), buttonBlinkingPeriod);
        }
      }
      break;
    case 4:
      for (let y = 0; y < blinkingPeriodLayout4.length; y++) {
        for (let x = 0; x < blinkingPeriodLayout4[0].length; x++) {
          var buttonBlinkingPeriod = blinkingPeriodLayout4[y][x];
          // console.log(buttonBlinkingPeriod);
          if (buttonBlinkingPeriod != 0)
            setInterval(() => blinkingHelper(output, x, y, pad), buttonBlinkingPeriod);
        }
      }
      break;
  }
}

function blinkingHelper(output, x, y, pad) {
  switch (pad) {
    case 1:
      var buttonNumber = getButtonNumber(x, y, pad);
      var buttonColor = getButtonColor(x, y, pad);
      if (blinkingState[y][x] == 0) {
        blinkingState[y][x] = 1;
        output.send([144, buttonNumber, buttonColor])
      } else {
        blinkingState[y][x] = 0;
        output.send([144, buttonNumber, ColorEnum.BLACK])
      }
      break;
    case 2:
      var buttonNumber = getButtonNumber(x, y, pad);
      var buttonColor = getButtonColor(x, y, pad);
      if (blinkingState[y][x] == 0) {
        blinkingState[y][x] = 1;
        output.send([145, buttonNumber, buttonColor])
      } else {
        blinkingState[y][x] = 0;
        output.send([145, buttonNumber, ColorEnum.BLACK])
      }
      break;
    case 3:
      var buttonNumber = getButtonNumber(x, y, pad);
      var buttonColor = getButtonColor(x, y, pad);
      if (blinkingState[y][x] == 0) {
        blinkingState[y][x] = 1;
        output.send([146, buttonNumber, buttonColor])
      } else {
        blinkingState[y][x] = 0;
        output.send([146, buttonNumber, ColorEnum.BLACK])
      }
      break;
    case 4:
      var buttonNumber = getButtonNumber(x, y, pad);
      var buttonColor = getButtonColor(x, y, pad);
      if (blinkingState[y][x] == 0) {
        blinkingState[y][x] = 1;
        output.send([147, buttonNumber, buttonColor])
      } else {
        blinkingState[y][x] = 0;
        output.send([147, buttonNumber, ColorEnum.BLACK])
      }
      break;
  }
}

function startBlink(x, y, buttonBlinkPeriod, boton, status) {
  if (status == 144) {
    pad = 1;
  } else if (status == 145) {
    pad = 2;
  } else if (status == 146) {
    pad = 3;
  } else if (status == 147) {
    pad = 4;
  }
  contenidos(boton, status);
  if (buttonBlinkPeriod != 0)
    interval = setInterval(() => blinkingHelper(output, x, y, pad), buttonBlinkPeriod);
}

function stopBlink() {
  clearInterval(interval);
}

function initAllPads() {
  // init colors pads and initial blinking states
  for (p = 1; p < 5; p++) {
    initLaunchpadColors(p);
    initLaunchpadBlinking(p);
  }
}

// register WebMIDI
navigator.requestMIDIAccess()
  .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
  console.log(midiAccess);
  var inputs = midiAccess.inputs;
  // var output = midiAccess.outputs;
  var outputs = midiAccess.outputs.values();
  for (var input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
  for (o = outputs.next(); o && !o.done; o = outputs.next()) {
    // assign the device to the output var
    output = o.value;
    initAllPads();
  }
}

function onMIDIFailure() {
  console.log('Could not access your MIDI devices.');
}

//create an array to hold our cc values and init to a normalized value
var ccValue = Array(128).fill(0.5)

getMIDIMessage = function(midiMessage) {
  var arr = midiMessage.data
  var status = arr[0]
  var cc = arr[1]
  var value = arr[2]
  // uncomment to monitor incoming Midi
  // console.log('Midi received - Status: ' + status + ', CC: ' + cc + ', Value: ' + value)
  var val = (arr[2] + 1) / 128.0 // normalize CC values to 0.0 - 1.0
  ccValue[cc] = val

  // select k pads
  if (status == 191 && cc == 2) {
    switch (value) {
      case 1:
        console.log('k1');
        break;
      case 2:
        console.log('k2');
        // en este modo el dial central es un potenciometro
        break;
      case 3:
        console.log('k3');
        // en este modo el dial central es un potenciometro
        break;
      case 4:
        console.log('k4');
        break;
    }
  }

  // select channels
  if (status == 191 && cc == 1) {
    switch (value) {
      case 1:
        console.log('channel 1');
        break;
      case 2:
        console.log('channel 2');
        break;
      case 3:
        console.log('channel 3');
        break;
      case 4:
        console.log('channel 4');
        break;
    }
  }

  // select button and blink
  switch (cc) {
    case 36:
      initAllPads();
      stopBlink();
      startBlink(0, 0, delayBlink, cc, status);
      break;
    case 37:
      initAllPads();
      stopBlink();
      startBlink(1, 0, delayBlink, cc, status);
      break;
    case 38:
      initAllPads();
      stopBlink();
      startBlink(2, 0, delayBlink, cc, status);
      break;
    case 39:
      initAllPads();
      stopBlink();
      startBlink(3, 0, delayBlink, cc, status);
      break;
    case 40:
      initAllPads();
      stopBlink();
      startBlink(0, 1, delayBlink, cc, status);
      break;
    case 41:
      initAllPads();
      stopBlink();
      startBlink(1, 1, delayBlink, cc, status);
      break;
    case 42:
      initAllPads();
      stopBlink();
      startBlink(2, 1, delayBlink, cc, status);
      break;
    case 43:
      initAllPads();
      stopBlink();
      startBlink(3, 1, delayBlink, cc, status);
      break;
    case 44:
      initAllPads();
      stopBlink();
      startBlink(0, 2, delayBlink, cc, status);
      break;
    case 45:
      initAllPads();
      stopBlink();
      startBlink(1, 2, delayBlink, cc, status);
      break;
    case 46:
      initAllPads();
      stopBlink();
      startBlink(2, 2, delayBlink, cc, status);
      break;
    case 47:
      initAllPads();
      stopBlink();
      startBlink(3, 2, delayBlink, cc, status);
      break;
    case 48:
      initAllPads();
      stopBlink();
      startBlink(0, 3, delayBlink, cc, status);
      break;
    case 49:
      initAllPads();
      stopBlink();
      startBlink(1, 3, delayBlink, cc, status);
      break;
    case 50:
      initAllPads();
      stopBlink();
      startBlink(2, 3, delayBlink, cc, status);
      break;
    case 51:
      initAllPads();
      stopBlink();
      startBlink(3, 3, delayBlink, cc, status);
      break;
  }
}

// contenidos y funciones en los botones
function contenidos(boton, status) {
  switch (boton) {
    case 36:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 37:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 38:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 39:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 40:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 41:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 42:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 43:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 44:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 45:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 46:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 47:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 48:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 49:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 50:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 51:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 52:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 53:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 54:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 55:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 56:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 57:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 58:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 59:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 60:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 61:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 62:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 63:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
    case 64:
      if (status == 144) {
        // some of hydra code
      } else if (status == 145) {
        // some of hydra code
      } else if (status == 146) {
        // some of hydra code
      } else if (status == 147) {
        // some of hydra code
      }
      break;
  }
}
