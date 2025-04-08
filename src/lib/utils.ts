export const generateBarcodeValues = (
    type: "student" | "staff" | "book",
    start: number,
    end: number
): string[] => {
    const getPrefix = () => {
        if (type === "student") return "PHS";
        if (type === "staff") return "PHT";
        return "PH";
    };

    const getPadding = () => {
        if (type === "staff") return 3; // PHT0001
        return 5; // PHS00001 or PH00001
    };

    const prefix = getPrefix();
    const padLength = getPadding();

    if (type === "book") {
        const repeated: string[] = [];
        for (let i = start; i <= end; i++) {
            const code = `${prefix}${String(i).padStart(padLength, "0")}`;
            repeated.push(code, code, code); // repeat 3 times
        }
        return repeated;
    }

    return Array.from(
        { length: end - start + 1 },
        (_, i) => `${prefix}${String(start + i).padStart(padLength, "0")}`
    );
};
