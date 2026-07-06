import { cn } from "@/lib/utils";

interface MapViewProps {
  className?: string;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  onMapReady?: (map: any) => void;
}

export function MapView({
  className,
  initialCenter = { lat: 22.8046, lng: 86.2015 },
  initialZoom = 15,
}: MapViewProps) {
  const q = `${initialCenter.lat},${initialCenter.lng}`;
  return (
    <iframe
      src={`https://maps.google.com/maps?q=${q}&t=&z=${initialZoom}&ie=UTF8&iwloc=&output=embed`}
      className={cn("w-full h-full border-0", className)}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

