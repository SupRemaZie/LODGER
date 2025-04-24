import { Button } from "@heroui/react";

export default function LodgerButton({
  type,
  label,
  onPress,
}: {
  type?: "default" | "full-success" | "no-border";
  onPress?: () => void;
  label: string;
}) {
  return (
    <>
      {type === "default" ? (
        <Button onPress={onPress} variant="shadow" className="border-2 border-primary-100 text-primary-100 bg-white font-semibold">{label}</Button>
      ) : type === "full-success" ? (
        <Button onPress={onPress} color="success" variant="shadow" className="text-white font-semibold">{label}</Button>
      ) : type === "no-border" ? (
        <Button onPress={onPress} variant="shadow" className="border-1 border-gray-200 font-semibold text-primary-100 bg-white">{label}</Button>
      ) : null}
    </>
  );
}
