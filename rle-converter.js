const fs = require('fs');
let lines = [];

// see https://gist.github.com/semibran/005a9defcec54ea4060cdadf3dc03d83

const convertRLE2Custom = (size, automata) => {
  const x = size[0].match(/\d+/)[0];
  const y = size[1].match(/\d+/)[0];
  const arr = [];

  console.log(decode(automata[0]));
  for (let i=0; i<x; i++) {
    arr.push([]);
    for (let j=0; j<y; j++) {
      arr[i][j] = 0;
    }
  }
  // console.log(arr);
  return automata;
}

try {
  const data = fs.readFileSync('./conway-species/all/glider.rle', 'utf8');

  // https://stackoverflow.com/a/21895354/5671836
  lines = data.split(/\r?\n/);

  const ruleLine = lines.findIndex(s => s.match(/rule/));
  const size = lines[ruleLine].split(',').slice(0, 2);
  const automataIndex = ruleLine+1;
  const automata = lines.slice(automataIndex, lines.length);
  const convertedAutomata = convertRLE2Custom(size, automata).join("");

  // console.log(convertedAutomata);
} catch (err) {
  console.error(err);
}
