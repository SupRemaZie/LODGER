import { Button } from "@heroui/react";

export default function LodgerButton({
  type,
  label,
  onPress,
  className,
  isDisabled,
}: {
  type?: "default" | "full-success" | "no-border";
  onPress?: () => void;
  label: string;
  className?: string;
  isDisabled?: boolean;
}) {
  return (
    <>
      {type === "full-success" ? (
        <Button onPress={onPress} isDisabled={isDisabled} color="success" variant="shadow" className={`text-white font-semibold ${className}`}>{label}</Button>
      ) : type === "no-border" ? (
        <Button onPress={onPress} isDisabled={isDisabled} variant="shadow" className={`border-1 border-gray-200 font-semibold text-primary-100 bg-white ${className}`}>{label}</Button>
      ) : (
        <Button onPress={onPress} isDisabled={isDisabled} variant="shadow" className={`border-2 border-primary-100 text-primary-100 bg-white font-semibold ${className}`}>{label}</Button>
      )}
    </>
  );
}
