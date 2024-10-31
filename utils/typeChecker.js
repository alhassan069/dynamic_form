const form = {
    uniqueId: 'uuid',
    title: "string",
    name: "string",
    email: "email",
    phonenumber: "number",
    isGraduate: "Boolean",

}
const typemap = {
    'UUID': "UUID",
    'STRING': "STRING",
    'BOOLEAN': "BOOLEAN",
    'INTEGER': 'INTEGER',
    'NUMBER': 'INTEGER',
    'EMAIL': 'STRING',
}
function transform(form){
    let transformed = {};
    for(const [key,value] of Object.entries(form)){
        transformed[key] = typemap[value.toUpperCase()];
    }
    return transformed;
}

transform(form);