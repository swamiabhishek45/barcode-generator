"use client";
import {
    PDFDownloadLink,
    Document,
    Page,
    View,
    Image,
    Text,
    StyleSheet,
} from "@react-pdf/renderer";
import JsBarcode from "jsbarcode";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
    page: {
        padding: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    barcodeContainer: {
        width: "30%", // ~178px of 595px A4 width, after padding/margins
        height: 90, // Each row will be ~90px tall to fit 8 rows in 842px
        marginHorizontal: "1.6%", // Even spacing across 3 columns
        marginVertical: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    barcodeImg: {
        width: 120,
        height: 40,
        resizeMode: "contain",
        fontWeight: "bold",
    },
    label: {
        fontSize: 9,
        marginTop: 4,
        textAlign: "center",
        fontWeight: "bold",
    },
});

const BarcodeDoc = ({ barcodes }: { barcodes: string[] }) => {
    const [images, setImages] = useState<{ code: string; dataUrl: string }[]>(
        []
    );

    useEffect(() => {
        const generateImages = async () => {
            const results: { code: string; dataUrl: string }[] = [];
            for (const code of barcodes) {
                const canvas = document.createElement("canvas");
                JsBarcode(canvas, code, { format: "CODE128" });
                results.push({ code, dataUrl: canvas.toDataURL("image/png") });
            }
            setImages(results);
        };
        generateImages();
    }, [barcodes]);

    if (images.length === 0) return null;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {images.map(({ code, dataUrl }) => (
                    <>
                        {/* <h1>VDF Pharma</h1> */}
                        <View key={code} style={styles.barcodeContainer}>
                            <Text style={styles.label}>VDF PHARMA</Text>
                            <Image src={dataUrl} style={styles.barcodeImg} />
                            {/* <Text style={styles.label}>{code}</Text> */}
                        </View>
                    </>
                ))}
            </Page>
        </Document>
    );
};

const BarcodePDF = ({ barcodes }: { barcodes: string[] }) => (
    <div className="">
        <PDFDownloadLink
            document={<BarcodeDoc barcodes={barcodes} />}
            fileName="barcodes.pdf"
            className="bg-green-600 text-white px-4 py-3 rounded"
        >
            {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
        </PDFDownloadLink>
    </div>
);

export default BarcodePDF;
