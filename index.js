const fs = require('fs');
const path = require('path');

const GRAPHQL_EXTENSION = '.graphql';

const resolveRelativePathFromCaller = (schemaPath) => {
  const originalPrepareStackTrace = Error.prepareStackTrace;

  // Overwritten the prepateStackTrace to be able to capture the stack
  Error.prepareStackTrace = (_, stack) => {
    return stack;
  };
  const err = new Error();
  const stack = err.stack;
  Error.prepareStackTrace = originalPrepareStackTrace;

  // remove the inner reference to this module
  stack.shift();
  stack.shift();

  // Find the parent caller
  const caller = stack.find(c =>
    c.getTypeName() !== null);

  // Extract the dirname of the parent caller
  const callerDirname = path.dirname(caller.getFileName());
  return path.resolve(callerDirname, schemaPath);
};

module.exports = (schemaPath) => {
  const isAGraphQLFile = schemaPath.indexOf(GRAPHQL_EXTENSION) !== -1;

  if (!isAGraphQLFile) {
    throw new Error('To load a schema you need to pass the path to a .graphql file');
  }

  const isRelative = schemaPath.indexOf('./') === 0;
  let filePath = schemaPath;

  if (isRelative) {
    filePath = resolveRelativePathFromCaller(schemaPath);
  }

  return fs.readFileSync(filePath, 'utf-8');
};
