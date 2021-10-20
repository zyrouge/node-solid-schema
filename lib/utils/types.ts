export const stringifyValue = (value: unknown) => {
    switch (typeof value) {
        case "number":
            return `${value}`;

        default:
            return `"${value}""`;
    }
};

export const stringifyValues = (values: unknown[]) =>
    values.map((x) => stringifyValue(x));

export const joinValues = (values: string[]) => values.join(" | ");
