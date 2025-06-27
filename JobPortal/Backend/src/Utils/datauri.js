import DataUriParser from "datauri/parser.js";
// path is not needed here if extName is passed in by the caller

const getDataUri = (fileBuffer, fileExtName) => { // Renamed arguments for clarity
    const parser = new DataUriParser();
    return parser.format(fileExtName, fileBuffer);
};

export default getDataUri;