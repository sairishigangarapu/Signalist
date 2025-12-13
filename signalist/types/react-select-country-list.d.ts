declare module 'react-select-country-list' {
    interface CountryData {
        value: string;
        label: string;
    }

    interface CountryList {
        getData(): CountryData[];
        getLabels(): string[];
        getValues(): string[];
        getLabelByValue(value: string): string;
        getValueByLabel(label: string): string;
    }

    function countryList(): CountryList;
    export default countryList;
}
