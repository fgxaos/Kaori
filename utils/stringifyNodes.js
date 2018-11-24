const stringifyNode = (
  node,
  deleteString = "",
  getIndexAfterSplit = undefined,
  childNb = undefined,
  int = false
) => {
  // let outputString = node.text().replace(/\s+/gi, ' ');
  let output = node;

  if (childNb !== undefined) {
    output = node.contents().eq(childNb);
  }

  output = output.text();

  if (getIndexAfterSplit) {
    output = output.split("\n")[getIndexAfterSplit];
  }

  output = output.replace(/\s+/gi, " ");

  if (deleteString) {
    output = output.replace(deleteString, "");
  }

  output = output.trim();

  if (int) {
    output = parseInt(output, 10);
  }

  return output;
};

module.exports = stringifyNode;
