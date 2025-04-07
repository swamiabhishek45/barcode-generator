import BarcodeForm from "@/components/BarcodeForm";

export default function HomePage() {
    return (
        <main className="min-h-screen  p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Barcode Generator
            </h1>
            <BarcodeForm />
        </main>
    );
}
