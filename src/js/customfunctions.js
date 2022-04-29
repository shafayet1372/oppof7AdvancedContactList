
import { uuidv4, regexifyString } from '../js/packages'

let capitalizeName = (name) => {
    return name.replace(/^[\w]|(?<=\s)[\w]/g, (s) => s.toUpperCase());
};

let sortByGroup = (data) => {
    return Object.entries(data).sort((a, b) =>
        a[0] < b[0] ? -1 : 1
    );
}

let sortByContactName = (data) => {
    return data.map((x) => {
        let [groupName, contacts] = x;
        return [
            { id: uuidv4(), groupName: groupName },
            contacts.sort((a, b) => (a.name < b.name ? -1 : 1)),
        ];
    });
}
let getValueByGroupName = (data) => {
    let group = data.reduce((acc, val) => {
        let value = val;
        let firstChar = /^[a-z]/i.test(value.name)
            ? value.name.match(/^([a-z])/i)[0].toUpperCase()
            : "#";
        // let specialChar = value.name.match(/^[\W]/)[0];
        value.name = capitalizeName(value.name);
        if (acc[firstChar]) {
            acc[firstChar].push(value);
        } else {
            acc[firstChar] = [];
            acc[firstChar].push(value);
        }
        return acc;
    }, {});

    let modifiedToArray = sortByGroup(group)
    let firstgroup = modifiedToArray.shift();
    modifiedToArray.push(firstgroup);
    return sortByContactName(modifiedToArray)
};

let getDataByRegexiFied = (pattern, input) => {
    return regexifyString({
        pattern: pattern,
        decorator: (match, index) => {
            if (index == 0) {
                return (
                    <span key={uuidv4()} style={{ color: "green" }}>
                        {match}
                    </span>
                );
            }
        },
        input: input,
    });
}


let getDataBySearch = (data, search) => {
    if (search) {
        return data
            .map((x) => {
                let [groupName, details] = x;
                let reg = new RegExp(`${search}`, "i");

                details = details
                    .filter((x) => reg.test(x.name) || reg.test(x.number))
                    .map((x) => {
                        let input = reg.test(x.name) ? x.name : x.number;
                        let name = reg.test(x.name) ? "name" : "number";
                        let result = getDataByRegexiFied(reg, input)

                        return { ...x, [name]: result };
                    });
                return [groupName, details];
            })
            .filter((x) => x[1].length);
    }
    return data;
};


let getRegexifiedValueToString = (data) => {
    let searchedType = typeof data.name == "string" ? "number" : "name";
    // let v = data[searchedType];

    data[searchedType] = data[searchedType]
        .map((x, i) => {
            if (i == 1) {
                let {
                    props: { children },
                } = x;
                return children;
            }
            return x;
        })
        .join("");
    return data;
};
export { getValueByGroupName, getDataBySearch, getRegexifiedValueToString }