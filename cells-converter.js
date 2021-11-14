// read .cells files
// Plaintext (.cells): A human-readable, but not very efficient,
// file format that is primarily useful for small patterns.
// Dead cells are stored as "." and live cells are stored as "O".
// See www.conwaylife.com/wiki/Plaintext

const fs = require('fs');
let lines = [];

const convertCells2Custom = (automata) => {
  const lineSize = Math.max(...automata.map(line => line.length));
  const arr = [];

  for (let j=0; j<automata.length; j++) {
    arr.push([]);
    for (let i=0; i<lineSize; i++) {
      arr[j][i] = automata[j][i] === 'O' ? '1' : '0';
    }
  }
  return arr;
}

const normalizeComments = comments => comments.map(comment => comment.replace('!', '').trim());

try {
  const dir = fs.readdirSync('./conway-species/all/cells/');
  for (const file of dir) {
    const tempArr = file.split('.')
    const filename = tempArr[0];
    const extension = tempArr[1];
    if (extension === 'cells') {
      let data = fs.readFileSync(`./conway-species/all/cells/${filename}.${extension}`, 'utf8');

      // https://stackoverflow.com/a/21895354/5671836
      lines = data.split(/\r?\n/);

      const automataStartLine = lines.findIndex(s => !s.match(/!/));
      const comments = lines.slice(0, automataStartLine-1);
      const normalizedComments = normalizeComments(comments);
      const automata = lines.slice(automataStartLine, lines.length);
      const convertedAutomata = convertCells2Custom(automata);
      const output = JSON.stringify({comments: normalizedComments, automata: convertedAutomata});

      fs.writeFileSync(`./conway-species/converted/${filename}.hxf`, output);
    }
  }
} catch (err) {
  console.error(err);
}
