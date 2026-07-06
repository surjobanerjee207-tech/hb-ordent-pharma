import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const API_URL = "https://YOUR-RENDER-BACKEND-URL.onrender.com"; // update after deploying

export default function PrescriptionUpload() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMsg("Please select a prescription file");
      return;
    }

    setStatus("uploading");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("customer_name", name);
    formData.append("phone", phone);
    formData.append("notes", notes);
    formData.append("file", file);

    try {
      await axios.post(`${API_URL}/api/prescriptions`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("success");
      setName("");
      setPhone("");
      setNotes("");
      setFile(null);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.response?.data?.error || "Upload failed. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 text-center">
        <p className="text-green-600 font-semibold">Prescription uploaded successfully!</p>
        <p className="text-sm text-muted-foreground mt-2">
          We'll contact you shortly to confirm your order.
        </p>
        <Button className="mt-4" onClick={() => setStatus("idle")}>
          Upload Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto">
      <Input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <Textarea
        placeholder="Any notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Input
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
      />
      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
      <Button type="submit" disabled={status === "uploading"} className="w-full">
        {status === "uploading" ? "Uploading..." : "Submit Prescription"}
      </Button>
    </form>
  );
}
