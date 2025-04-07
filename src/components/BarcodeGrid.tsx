"use client";
import { useEffect } from "react";
import JsBarcode from "jsbarcode";

const BarcodeGrid = ({ barcodes }: { barcodes: string[] }) => {
    useEffect(() => {
        barcodes.forEach((code, index) => {
            const el = document.getElementById(`barcode-${index}`);
            if (el) {
                JsBarcode(el, code, {
                    format: "CODE128",
                    displayValue: true,
                    fontSize: 12,
                });
            }
        });
    }, [barcodes]);

    return (
        <div className="grid grid-cols-3 gap-4">
            {barcodes.map((code, idx) => (
                
                    <svg
                        key={`${code}-${idx}`}
                        id={`barcode-${idx}`}
                        className="w-full h-24  rounded p-1"
                    />
                
            ))}
        </div>
    );
};

export default BarcodeGrid;
