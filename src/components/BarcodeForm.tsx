"use client";
import { useState } from "react";
import { BarcodeType } from "@/types";
import { generateBarcodeValues } from "@/lib/utils";
import BarcodeGrid from "./BarcodeGrid";
import BarcodePDF from "./BarcodePDF";

const BarcodeForm = () => {
    const [type, setType] = useState<BarcodeType>("student");
    const [start, setStart] = useState<number | null>(null);
    const [end, setEnd] = useState<number | null>(null);
    const [barcodes, setBarcodes] = useState<string[]>([]);

    const handleGenerate = () => {
        if (start === null || end === null || start > end) {
            alert("Please enter valid start and end values.");
            return;
        }
        const codes = generateBarcodeValues(type, start, end);
        setBarcodes(codes);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <select
                    className="border p-2 rounded"
                    value={type}
                    onChange={(e) => setType(e.target.value as BarcodeType)}
                >
                    <option value="student" className="text-black">
                        Student
                    </option>
                    <option value="staff" className="text-black">
                        Staff
                    </option>
                    <option value="book" className="text-black">
                        Book
                    </option>
                </select>

                <input
                    type="number"
                    placeholder="Start"
                    className="border p-2 rounded"
                    value={start ?? ""}
                    min={1}
                    onChange={(e) =>
                        setStart(e.target.value ? Number(e.target.value) : null)
                    }
                />

                <input
                    type="number"
                    placeholder="End"
                    className="border p-2 rounded"
                    value={end ?? ""}
                    min={1}
                    onChange={(e) =>
                        setEnd(e.target.value ? Number(e.target.value) : null)
                    }
                />

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleGenerate}
                >
                    Generate
                </button>
                <div className=" ">
                    {barcodes.length > 0 && <BarcodePDF barcodes={barcodes} />}
                </div>
            </div>

            <BarcodeGrid barcodes={barcodes} />
        </div>
    );
};

export default BarcodeForm;
